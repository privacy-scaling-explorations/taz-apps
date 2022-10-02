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
            const {
                imageUri,
                canvasId,
                fullProof,


            } = req.body

            if (
                !imageUri ||
                !canvasId ||
                !fullProof
            ) {
                res.status(400).json(
                    "Needs to have imageUri, canvasId, fullProof"
                )
            }
            console.log("Before Proof")
            console.log("Full Proof", fullProof)
            console.log("verificationKey",verificationKey)
            const proofRes = await verifyProof(verificationKey, fullProof)
            const response = proofRes.toString();

            console.log("Proof Verified?",response )

            if(response === "true"){
                console.log("Proof Verified!")
                const dbs = await client.query(
                    query.Map(
                        query.Paginate(query.Match(query.Index("all_canvases")), {
                            size: 10000
                        }),
                        query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                    )
                )
    
                const match = dbs.data.filter((canvas) => canvas.data.canvasId === canvasId)[0]
    
                // if (match.data.tiles.includes("")) {
                //     res.status(400).json("Canvas is not full yet")
                // } else {
                console.log("canvas is full")
    
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

            // Save canvas image locally
            const imageId = nanoid()
            fs.writeFileSync(`./public/canvases/${imageId}.png`, b64Data, "base64")

            const web3StorageClient = new Web3Storage({
                token: web3StorageApiToken,
                endpoint: new URL("https://api.web3.storage")
            })

            const dataFileArrayForServingImage = [new File([blobForServingImage], "image.png")]

            let ipfsUrl

            await web3StorageClient.put(dataFileArrayForServingImage, { wrapWithDirectory: false }).then((dataCid) => {
                ipfsUrl = `https://${dataCid}.ipfs.dweb.link`
                console.log("IPFS url created: ", ipfsUrl)
            })

            try {
                const currentIndex = await fetchWalletIndex()
                const signer_array = process.env.PRIVATE_KEY_ARRAY.split(",")
                const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
                const signerAddress = await signer.getAddress()
                const nftContract = new ethers.Contract(contractAddress, abi, signer)
                const tx = await nftContract.safeMint(signerAddress, ipfsUrl, imageId, {
                    gasLimit: 500000
                })
    
                const dataFileArrayForServingImage = [new File([blobForServingImage], "image.png")]
    
                let ipfsUrl
    
                await web3StorageClient.put(dataFileArrayForServingImage, { wrapWithDirectory: false }).then((dataCid) => {
                    ipfsUrl = `https://${dataCid}.ipfs.dweb.link`
                    console.log("IPFS url created: ", ipfsUrl)
                })
    
                try {
                    const currentIndex = await fetchWalletIndex()
                    const signer_array = process.env.PRIVATE_KEY_ARRAY.split(",")
                    const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
                    const signerAddress = await signer.getAddress()
                    const nftContract = new ethers.Contract(contractAddress, abi, signer)
                    const tx = await nftContract.safeMint(signerAddress, ipfsUrl, {
                        gasLimit: 500000
                    })
                    console.log(tx)
    
                    await client.query(
                        query.Update(query.Ref(match.ref), {
                            data: {
                                tiles: ["", "", "", "", "", "", "", "", ""]
                            }
                        })
                    )
    
                    res.status(201).json({ tx, ipfsUrl })
                } catch (e) {
                    console.log(e)
                    res.status(401).json(e)
                    // }
                }

            } else {
                res.status(501).json("Proof is not Valid")
            }


        } catch (error) {
            res.status(500).json("Error in catch 2: ", error)
        }
    }
}
