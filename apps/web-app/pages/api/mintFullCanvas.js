import { ethers } from "ethers"
import dotenv from "dotenv"
import faunadb from "faunadb"
import { Blob } from "@web-std/blob"
import { verifyProof } from "@semaphore-protocol/proof"
import { Web3Storage, File } from "web3.storage"
import * as fs from "fs"
import { nanoid } from "nanoid"
import { TAZARTWORK_CONTRACT } from "../../config/goerli.json"
import { fetchWalletIndex } from "../../helpers/helpers"
import TazArtwork from "../utils/TazArtwork.json"
import verificationKey from "../../static/semaphore.json"

dotenv.config({ path: "../../.env.local" })

export default async function handler(req, res) {
    const secret = process.env.FAUNA_SECRET_KEY
    const client = new faunadb.Client({ secret })
    const { query } = faunadb

    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
    const { abi } = TazArtwork
    const contractAddress = TAZARTWORK_CONTRACT

    if (res.method === "GET") {
        res.status(405).json("GET not allowed")
    } else if (req.method === "POST") {
        try {
            const { imageUri, canvasId, fullProof } = req.body

            if (!imageUri || !canvasId || !fullProof) {
                res.status(400).json("Needs to have imageUri, canvasId, fullProof")
            }
            console.log("Before Proof")
            console.log("Full Proof", fullProof)
            console.log("verificationKey", verificationKey)
            const proofRes = await verifyProof(verificationKey, fullProof)
            const response = proofRes.toString()

            console.log("Proof Verified?", response)

            if (response === "true") {
                console.log("Proof Verified!")

                const web3StorageApiToken = process.env.WEB3_STORAGE_API_TOKEN

                const b64toBlob = async (b64Data, contentType = "", sliceSize = 512) => {
                    const byteCharacters = Buffer.from(b64Data, "base64").toString("binary")
                    const byteArrays = []
                    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                        const slice = byteCharacters.slice(offset, offset + sliceSize)
                        const byteNumbers = new Array(slice.length)
                        for (let i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i)
                        }
                        const byteArray = new Uint8Array(byteNumbers)
                        byteArrays.push(byteArray)
                    }
                    const blob = new Blob(byteArrays, { type: contentType })
                    return blob
                }

                const contentType = "image/png"
                const b64Data = imageUri.replace("data:image/png;base64,", "")
                const blobForServingImage = await b64toBlob(b64Data, contentType)

                // Generate unique id for the image
                const imageId = nanoid()

                const web3StorageClient = new Web3Storage({
                    token: web3StorageApiToken,
                    endpoint: new URL("https://api.web3.storage")
                })

                const dataFileArrayForServingImage = [new File([blobForServingImage], "image.png")]

                let imageUrl

                await web3StorageClient
                    .put(dataFileArrayForServingImage, { wrapWithDirectory: false })
                    .then((dataCid) => {
                        imageUrl = `https://${dataCid}.ipfs.dweb.link`
                        console.log("Image url created: ", imageUrl)
                    })

                const obj = {
                    name: "TAZ Collaborative Artwork NFT",
                    image: imageUrl,
                    description:
                        "Art generated collaboratively and anonymously through the TAZ app at Devcon VI in Bogotá",
                    attributes: [
                        {
                            event: "DEVCON VI"
                        }
                    ]
                }

                const buffer = Buffer.from(JSON.stringify(obj))
                const metadata = [new File([buffer], "metadata.json")]

                let metadataUrl

                await web3StorageClient.put(metadata, { wrapWithDirectory: false }).then((dataCid) => {
                    metadataUrl = `https://${dataCid}.ipfs.dweb.link`
                    console.log("Metadata url created: ", metadataUrl)
                })

                try {
                    const currentIndex = await fetchWalletIndex()
                    const signer_array = process.env.PRIVATE_KEY_ARRAY.split(",")
                    const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
                    const signerAddress = await signer.getAddress()
                    const nftContract = new ethers.Contract(contractAddress, abi, signer)
                    console.log("calling function")
                    const tx = await nftContract.safeMint(signerAddress, metadataUrl, imageId, {
                        gasLimit: 500000
                    })
                    console.log(tx)

                    const dbs = await client.query(
                        query.Map(
                            query.Paginate(query.Match(query.Index("all_active_canvases")), {
                                size: 10000
                            }),
                            query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                        )
                    )

                    const document = dbs.data[0]
                    const canvases = document.data.canvases

                    canvases[canvasId - 1].tiles = ["", "", "", "", "", "", "", "", ""]

                    await client.query(
                        query.Update(query.Ref(document.ref), {
                            data: {
                                canvases: canvases
                            }
                        })
                    )

                    const finishedCanvaCreate = await client.query(
                        query.Create(query.Collection("FinishedCanvases"), {
                            data: {
                                imageId,
                                imageUri
                            }
                        })
                    )

                    res.status(201).json({ tx, metadataUrl, imageId })
                } catch (error) {
                    res.status(501).json("Error:", error)
                }
            }
        } catch (error) {
            res.status(500).json("Error: ", error)
        }
    }
}
