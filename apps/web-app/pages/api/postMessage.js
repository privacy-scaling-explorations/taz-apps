import { ethers } from 'ethers'
import dotenv from 'dotenv'
import TazMessage from '../utils/TazMessage.json'
import { TAZMESSAGE_CONTRACT } from '../../config/goerli.json'
import { fetchWalletIndex } from '../../helpers/helpers'

dotenv.config({ path: '../../.env.local' })

const tazMessageAbi = TazMessage.abi
const tazMessageAddress = TAZMESSAGE_CONTRACT

const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
console.log("provider", provider)

export default async function handler(req, res) {
  console.log('api called')

  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    const {
      parentMessageId,
      messageContent,
      groupId,
      merkleTreeRoot,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    } = req.body

    console.log('LOG | Body: ', req.body)

    let tx = null

    if (parentMessageId !== 0) {
      console.log('BACKEND LOG | Transacting reply')

      try {
        // const currentIndex = await fetchWalletIndex()
        const currentIndex = 2

        const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
        console.log("signer_array" ,signer_array )
        const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
        console.log("signer", signer)
        const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)
        const bytes32Signal = ethers.utils.formatBytes32String(signal)

        tx = await tazMessageContract.replyToMessage(
          parentMessageId,
          messageContent,
          groupId,
          merkleTreeRoot,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { gasLimit: 150000 }
        )
        console.log(tx)

        res.status(201).json(tx)
      } catch (e) {
        console.log(e)
        res.status(401).json(e)
      }
    } else {
      console.log('BACKEND LOG | Add Message')
      try {
      const currentIndex = await fetchWalletIndex()
      const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
      const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
      const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)
      const bytes32Signal = ethers.utils.formatBytes32String(signal)

        tx = await tazMessageContract.addMessage(
          messageContent,
          groupId,
          merkleTreeRoot,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { gasLimit: 150000 }
        )

        console.log(tx)
        res.status(201).json(tx)
      } catch (e) {
        console.log(e)
        res.status(401).json(e)
      }
    }
  }
}
