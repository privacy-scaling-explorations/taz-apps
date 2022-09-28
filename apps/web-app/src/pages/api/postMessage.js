import { ethers } from 'ethers'
import dotenv from 'dotenv'
// import Semaphore from '../utils/Semaphore.json'
import TazMessage from '../utils/TazMessage.json'
import { TAZMESSAGE_CONTRACT, MAX_TRANSACTION_ATTEMPTS } from '../../config/goerli.json'
import { fetchWalletIndex, fetchNonce, retry} from '../../helpers/helpers'

dotenv.config({ path: '../../.env.local' })

const tazMessageAbi = TazMessage.abi
const tazMessageAddress = TAZMESSAGE_CONTRACT

export default async function handler(req, res) {
  console.log('api called')

  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    console.log('Post APi called')

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
    // Connect to Wallet
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
    const currentIndex = await fetchWalletIndex()
    console.log('currentIndex', currentIndex)
    const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
    console.log('signer_array', signer_array)
    console.log('signer_array[currentIndex]', signer_array[currentIndex])
    const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
    console.log('signer', signer)
    const signerAddress = await signer.getAddress();
    const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)
    const bytes32Signal = ethers.utils.formatBytes32String(signal)

    let tx = null

    if (parentMessageId !== 0) {
      console.log('BACKEND LOG | Transacting reply')

      // const sendTransaction = async () => {
        try {
        const nonce = await fetchNonce(signerAddress)
        tx = await tazMessageContract.replyToMessage(
          parentMessageId,
          messageContent,
          groupId,
          merkleTreeRoot,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { nonce,gasLimit: 15000000 }
        )
        console.log('Transaction Finished!')
        // const response = await tx.wait(1)
        console.log(tx)
        console.log('Reply Message Success!')

        res.status(201).json(tx)
      } catch (e) {
        console.log(e)
        res.status(500).json(e)
      }

      // await retry(sendTransaction, MAX_TRANSACTION_ATTEMPTS)

    } else {
      console.log('BACKEND LOG | Add Message')

      // function addMessage(
      //   string memory messageContent,
      //   uint256 groupId,
      //   uint256 merkleTreeRoot,
      //   bytes32 signal,
      //   uint256 nullifierHash,
      //   uint256 externalNullifier,
      //   uint256[8] calldata proof) external {

      // const sendTransaction = async () => {
        try {
        const nonce = fetchNonce(signerAddress)
        tx = await tazMessageContract.addMessage(
          messageContent,
          groupId,
          merkleTreeRoot,
          bytes32Signal,
          nullifierHash,
          externalNullifier,
          solidityProof,
          { nonce, gasLimit: 1500000 }
        )
        // console.log(tx)

        // const response = await tx.wait(1)
        console.log(tx)
        res.status(201).json(tx)
      } catch (e) {
        console.log(e)
        res.status(500).json(e)
      }

      // await retry(sendTransaction, MAX_TRANSACTION_ATTEMPTS)
    }
  }
}
