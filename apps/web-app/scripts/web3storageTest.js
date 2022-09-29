const { Web3Storage, File } = require('web3.storage')
const { Blob } = require('@web-std/blob')

// This helper function converts a Basea64 string into a Blob (which is what web3.storage needs to create a file).
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  // First, it decode the Base64-encoded string into a new string with a character for each byte of the binary data.
  // Each character's code point (charCode) will be the value of the byte.
  const byteCharacters = Buffer.from(b64Data, 'base64').toString('binary') // atob(b64Data) is showing as deprecated
  // Then, we can create an array of byte values by applying this using the .charCodeAt method for each character in the string.
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    // We can convert this array of byte values into a real typed byte array by passing it to the Uint8Array constructor.
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  // The byte array can then be converted to a BLOB by wrapping it in an array and passing it to the Blob constructor.
  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

const web3StorageApiToken = process.env.WEB3_STORAGE_API_TOKEN

// Test image data
const contentType = 'image/png'
const stringPrefix = 'data:image/image/png;base64,'
const b64Data =
  'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='

const blobForServingImage = b64toBlob(b64Data, contentType) // Use for serving an image
const blobForServingString = new Blob([stringPrefix + b64Data], {
  type: 'text/plain',
}) // Use for serving a string

// Create client to add documents to permanent storage on web3.storage
const web3StorageClient = new Web3Storage({
  token: web3StorageApiToken,
  endpoint: new URL('https://api.web3.storage'),
})

const dataFileArrayForServingImage = [
  new File([blobForServingImage], 'image.png'),
]
const dataFileArrayForServingString = [
  new File([blobForServingString], 'image.txt'),
]

web3StorageClient
  .put(dataFileArrayForServingImage, { wrapWithDirectory: false })
  .then((dataCid) => {
    const imagelUri = 'https://' + dataCid + '.ipfs.dweb.link'
    console.log('Uri for serving image: ', imagelUri)
  })

web3StorageClient
  .put(dataFileArrayForServingString, { wrapWithDirectory: false })
  .then((dataCid) => {
    const imagelUri = 'https://' + dataCid + '.ipfs.dweb.link'
    console.log('Uri for serving string text: ', imagelUri)
  })
