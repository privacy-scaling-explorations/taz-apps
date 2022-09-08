const { task, types } = require("hardhat/config")

task("deployTazToken", "Deploy a TazToken contract")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs }, { ethers }) => {
        const contract = await ethers.getContractFactory("TazToken")
        const taz = await contract.deploy()
        await taz.deployed()
        logs && console.log(`TazToken contract has been deployed to: ${taz.address} with owner: ${await contract.signer.getAddress()}`)
        return taz
    });