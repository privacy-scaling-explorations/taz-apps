import { ethers } from 'ethers'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import TazMessage from '../utils/TazMessage.json'
import { GROUP_ID, TAZMESSAGE_CONTRACT, MAX_TRANSACTION_ATTEMPTS } from '../../config/goerli.json'
import { fetchWalletIndex, fetchNonce, retry } from '../../helpers/helpers'

dotenv.config({ path: '../../.env.local' })

export default async function handler(req, res) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
  const currentIndex = await fetchWalletIndex()
  const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
  const tazMessageAbi = TazMessage.abi
  const tazMessageAddress = TAZMESSAGE_CONTRACT
  const groupId = GROUP_ID

  const { invitation, identityCommitment } = req.body

  if (req.method === 'GET') {
    res.status(400).json({
      error: 'Ensure that you are sending a POST request to this endpoint'
    })
  } else if (!invitation) {
    res.status(400).json({ error: 'Request needs to have an invitation string' })
  } else if (req.method === 'POST') {
    try {
      const secret = process.env.FAUNA_SECRET_KEY
      const { query } = faunadb
      const client = new faunadb.Client({ secret })

      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index('all_hashes')), {
            size: 10000
          }),
          query.Lambda('codeRef', query.Get(query.Var('codeRef')))
        )
      )

      const hashedInv = ethers.utils.id(invitation)
      const match = dbs.data.filter((code) => code.data.code === hashedInv)

      let isValid

      if (match[0] && !match[0].data.isUsed) {
        isValid = true
        console.log('MATCH DATA')
        console.log(match[0])
        console.log(match[0].data.isUsed)
        console.log('GROUP ID!')
        console.log(groupId)
        // console.log(tazMessageContract)
        console.log(identityCommitment)

        // const sendTransaction = async () => {
          try {
          console.log('Add Member Function called')
          console.log('currentIndex', currentIndex)
          const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
          const signerAddress = await signer.getAddress()
          const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)
          const nonce = await fetchNonce(signerAddress)
          console.log(nonce)
          const tx = await tazMessageContract.addMember(groupId, identityCommitment, { nonce, gasLimit: 15000000 })
          console.log(tx)

          const response = await tx.wait(1).then(
            client.query(
              query.Update(query.Ref(match[0].ref), {
                data: {
                  isUsed: true
                }
              })
            )
          )

          res.status(201).json(response)
          console.log(response)
        } catch (e) {
          console.log(e)
          res.status(500).json(e);
        }

        // await retry(sendTransaction, MAX_TRANSACTION_ATTEMPTS)


      } else {
        isValid = false
        console.log(isValid)
        console.log('Is not valid')
        res.status(401).json({ Error: 'Invalid code' })
      }
    } catch (error) {
      res.status(403).json({ Error: error.message })
    }
  }
}
