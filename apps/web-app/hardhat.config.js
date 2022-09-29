require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

// Import task definitions

require('./tasks/deployTazMessage')
require('./tasks/deployTazToken')
require('./tasks/createProof')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.13',
  networks: {
    hardhat: {
      accounts: [
        { privateKey: process.env.PRIVATE_KEY, balance: '10000000000000000000000' },
        { privateKey: process.env.PRIVATE_KEY_1, balance: '10000000000000000000000' }
      ],
      forking: {
        url: process.env.GOERLI_URL,
        blockNumber: 7622092 // This block came after the deployment of the new Semaphore contract, prior to us adding a group
      }
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY_1]
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY_1]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
}
