import { ethers } from "ethers"
import dotenv from "dotenv"
import { TAZARTWORK_CONTRACT } from "../../config/goerli.json"
import { fetchWalletIndex } from "../../helpers/helpers"
import TazArtwork from "../utils/TazArtwork.json"

dotenv.config({ path: "../../.env.local" })

export default async function handler(req, res) {
    const { tokenId, groupId, merkleTreeRoot, signal, nullifierHash, solidityProof } = req.body

    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)

    const { abi } = TazArtwork
    const contractAddress = TAZARTWORK_CONTRACT

    if (req.method === "POST") {
        try {
            const currentIndex = await fetchWalletIndex()
            const signer_array = process.env.PRIVATE_KEY_ARRAY.split(",")
            const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
            const nftContract = new ethers.Contract(contractAddress, abi, signer)
            const signalBytes32 = ethers.utils.formatBytes32String(signal)
            const tx = await nftContract.vote(
                tokenId,
                groupId,
                merkleTreeRoot,
                signalBytes32,
                nullifierHash,
                solidityProof,
                {
                    gasLimit: 500000
                }
            )

            const txResult = await tx.wait()
            // const txReceipt = await provider.getTransactionReceipt(txResult.hash);

            console.log(txResult)
            // console.log(txReceipt)

            const newLocal = "Vote sucessfully registered!"
            res.status(201).json(newLocal)
        } catch (e) {
            console.log(e)
            res.status(401).json(e)
        }
    } else {
        res.status(400).json({ error: "please send POST request" })
    }
}
