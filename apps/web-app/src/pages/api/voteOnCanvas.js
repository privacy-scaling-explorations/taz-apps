import { TAZTOKEN_CONTRACT } from '../../config/goerli.json'
import { fetchWalletIndex } from '../../helpers/helpers'
import TazToken from '../utils/TazToken.json'
import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env.local' })

export default async function handler(req, res) {
  const { tokenId, groupId, merkleTreeRoot, signal, nullifierHash, solidityProof } = req.body

  console.log(req.body)

  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
  const currentIndex = await fetchWalletIndex()
  const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
  const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)

  const { abi } = TazToken
  const contractAddress = TAZTOKEN_CONTRACT
  const nftContract = new ethers.Contract(contractAddress, abi, signer)

  if (req.method === 'POST') {
    console.log("post triggered");
    try {
      const signalBytes32 = ethers.utils.formatBytes32String(signal)
      const tx = await nftContract.vote(tokenId, groupId, merkleTreeRoot, signalBytes32, nullifierHash, solidityProof, {
        gasLimit: 15000000
      })
      console.log(tx)

      const newLocal = 'Vote sucessfully registered!'
      res.status(201).json(newLocal)
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  } else {
    res.status(400).json({ error: 'please send POST request' })
  }
}
