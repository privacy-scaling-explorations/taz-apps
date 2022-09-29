import { ethers } from 'ethers'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import TazMessage from '../utils/TazMessage.json'
import { GROUP_ID, TAZMESSAGE_CONTRACT } from '../../config/goerli.json'
import { fetchWalletIndex } from '../../helpers/helpers'

dotenv.config({ path: '../../.env.local' })

export default async function handler(req, res) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
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

        try {
          console.log('Add Member Function called')
          const currentIndex = await fetchWalletIndex()
          console.log('currentIndex', currentIndex)
          const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
          const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)
          const tazMessageContract = new ethers.Contract(tazMessageAddress, tazMessageAbi, signer)
          const tx = await tazMessageContract.addMember(groupId, identityCommitment, { gasLimit: 15000000 })
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
          res.status(401).json(e)
        }
      } else {
        isValid = false
        res.status(401).json({ Error: 'Invalid code' })
      }
    } catch (error) {
      res.status(403).json({ Error: error.message })
    }
  }
}
