require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

// Import task definitions

require("./tasks/deployTazMessage")
require("./tasks/deployTazToken")
require("./tasks/createProof")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.13',
  networks: {
    hardhat: {
      accounts: [
        { privateKey: process.env.PRIVATE_KEY, balance: "10000000000000000000000" }, 
        { privateKey: process.env.PRIVATE_KEY, balance: "10000000000000000000000" }
      ],
      forking: {
        url: process.env.GOERLI_URL,         
        /* blockNumber: 7530010 */
      },
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
}
