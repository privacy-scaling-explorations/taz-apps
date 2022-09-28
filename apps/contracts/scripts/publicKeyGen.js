const { Wallet } = require('ethers')

const privateKeys = process.env.PRIVATE_KEY_ARRAY.split(',')
const publicKeys = []

privateKeys.forEach((element) => {
  const wallet = new Wallet(element)
  publicKeys.push(wallet.getAddress())
})

console.log(publicKeys)
