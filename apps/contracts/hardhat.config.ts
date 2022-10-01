import "@nomicfoundation/hardhat-toolbox"
import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
import { HardhatUserConfig } from "hardhat/types"

import "./tasks/createProof"
import "./tasks/deployTazMessage"
import "./tasks/deployTazArtwork"

dotenvConfig({ path: resolve(__dirname, "./.env") })

const hardhatConfig: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
        hardhat: {
            accounts: [
                { privateKey: process.env.PRIVATE_KEY, balance: "10000000000000000000000" },
                { privateKey: process.env.PRIVATE_KEY_2, balance: "10000000000000000000000" }
            ],
            forking: {
                url: process.env.GOERLI_URL,
                blockNumber: 7622092 // This block came after the deployment of the latest Semaphore contract, prior to us adding a group
            }
        },
        goerli: {
            url: process.env.GOERLI_URL,
            accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY_2]
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY
    }
}

export default hardhatConfig
