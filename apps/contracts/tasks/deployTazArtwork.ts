import { task, types } from "hardhat/config"

task("deploy:taz-artwork", "Deploy a TazArtwork contract")
    .addParam("semaphoreContract", "Address of the Semaphore contract", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ semaphoreContract, logs }, { ethers }) => {
        const contract = await ethers.getContractFactory("TazArtwork")
        const taz = await contract.deploy(semaphoreContract)
        await taz.deployed()
        if (logs) {
            console.log("--------------------------------------------------------------------")
            console.log(
                `TASK deployTazArtwork | TazArtwork contract has been deployed to: ${
                    taz.address
                } with owner: ${await contract.signer.getAddress()}`
            )
            console.log("--------------------------------------------------------------------")
        }
        return taz
    })
