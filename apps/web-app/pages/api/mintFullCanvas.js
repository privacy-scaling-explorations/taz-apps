import { ethers } from 'ethers'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import { Web3Storage, File } from 'web3.storage'
import { Blob } from '@web-std/blob'
import { TAZTOKEN_CONTRACT, MAX_TRANSACTION_ATTEMPTS } from '../../config/goerli.json'
import { fetchWalletIndex, fetchNonce, retry } from '../../helpers/helpers'

import TazToken from '../utils/TazToken.json'

dotenv.config({ path: '../../.env.local' })

export default async function handler(req, res) {
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL)
  const currentIndex = await fetchWalletIndex()
  const signer_array = process.env.PRIVATE_KEY_ARRAY.split(',')
  const signer = new ethers.Wallet(signer_array[currentIndex]).connect(provider)

  const signerAddress = await signer.getAddress()
  const { abi } = TazToken
  const contractAddress = TAZTOKEN_CONTRACT
  const nftContract = new ethers.Contract(contractAddress, abi, signer)

  if (res.method === 'GET') {
    res.status(405).json('GET not allowed')
  } else if (req.method === 'POST') {
    try {
      // make connection to DB

      // get fileUrl and canvasId from frontend
      const { imageUri, canvasId, groupId, signal, nullifierHash, externalNullifier, merkleTreeRoot, solidityProof } =
        req.body

      if (!imageUri || !canvasId || !groupId || !signal || !nullifierHash || !externalNullifier || !solidityProof) {
        res
          .status(400)
          .json('Needs to have imageUri, canvasId, groupId, signal, nullifierHash, externalNullifier, solidityProof')
      }

      // Check DB if canvas with canvasId is full

      // Query all 5 canvases from the database
      const dbs = await client.query(
        query.Map(
          query.Paginate(query.Match(query.Index('all_canvases')), {
            size: 10000
          }),
          query.Lambda('canvasRef', query.Get(query.Var('canvasRef')))
        )
      )

      // Find the matching canvas based on the canvasId
      const match = dbs.data.filter((canvas) => canvas.data.canvasId === canvasId)[0]

      // Check if canvas array does not have empty tiles
      if (match.data.tiles.includes('')) {
        res.status(400).json('Canvas is not full yet')
      } else {
        console.log('canvas is full')

        // Convert base64 string to Blob
        const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
          const byteCharacters = Buffer.from(b64Data, 'base64').toString('binary')
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

        const web3StorageApiToken = process.env.WEB3_STORAGE_API_TOKEN

        // Image data
        const contentType = 'image/png'
        // const b64Data = imageUri.subString(22)
        const b64Data = imageUri.replace('data:image/png;base64,', '')
        const blobForServingImage = b64toBlob(b64Data, contentType) // Use for serving an image

        const web3StorageClient = new Web3Storage({
          token: web3StorageApiToken,
          endpoint: new URL('https://api.web3.storage')
        })

        const dataFileArrayForServingImage = [new File([blobForServingImage], 'image.png')]

        let ipfsUrl

        await web3StorageClient.put(dataFileArrayForServingImage, { wrapWithDirectory: false }).then((dataCid) => {
          ipfsUrl = `https://${dataCid}.ipfs.dweb.link`
          console.log('IPFS url created: ', ipfsUrl)
        })

        // const sendTransaction = async () => {
          try {
          const signalBytes32 = ethers.utils.formatBytes32String(signal)
          const nonce = await fetchNonce(signerAddress)
          const tx = await nftContract.safeMint(
            signerAddress,
            ipfsUrl,
            groupId,
            merkleTreeRoot,
            signalBytes32,
            nullifierHash,
            externalNullifier,
            solidityProof,
            {
              nonce,
              gasLimit: 15000000
            }
          )
          console.log(tx)

          // const response = await tx.wait(1)
          // console.log(response)

          // Reset canvas in database
          await client.query(
            query.Update(query.Ref(match.ref), {
              data: {
                tiles: ['', '', '', '', '', '', '', '', '']
              }
            })
          )

          // Send response to frontend
          res.status(201).json({ tx, ipfsUrl })
        } catch (e) {
          console.log(e)
          res.status(500).json(e);
        }

        // await retry(sendTransaction, MAX_TRANSACTION_ATTEMPTS)
      }
    } catch (error) {
      res.status(500).json('Error in catch 2: ', error)
    }
  }
}
