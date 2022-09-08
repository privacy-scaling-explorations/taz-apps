const { task, types } = require("hardhat/config")

task("deployTazMessage", "Deploy a TazMessage contract")
    .addParam("semaphoreContract", "Address of the Semaphore contract", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ semaphoreContract, logs }, { ethers }) => {
        const contract = await ethers.getContractFactory("TazMessage");
        const taz = await contract.deploy(semaphoreContract)
        await taz.deployed();
        logs && console.log(`TazMessage contract has been deployed to: ${taz.address} with owner: ${await contract.signer.getAddress()}`)
        return taz;
    });