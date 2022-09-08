const assert = require('assert')
const { expect } = require('chai')
const { run, ethers } = require('hardhat')
const tazTokenAbi = require('../artifacts/contracts/TazToken.sol/TazToken.json').abi
const {  TAZTOKEN_CONTRACT } = require('../config/goerli.json')
const DEPLOY_NEW_TAZ_TOKEN_CONTRACT = false

describe("TazToken", function () {
    let contract;
    let signers

    before(async () => {
        signers = await ethers.getSigners()

        if(DEPLOY_NEW_TAZ_TOKEN_CONTRACT) {
            contract = await run("deployTazToken", { logs: true })
        } else {
            contract = new ethers.Contract(
                TAZTOKEN_CONTRACT,
                tazTokenAbi,
                signers[0],
                )
        }
    })

    it("Should mint", async () => {
        const uri = "https://bafkreickoepvzub4bh6xtlrpdg5s64iwrzy4dc3vmjrgugxi3gplymqs74.ipfs.dweb.link/";
        console.log("TEST LOG | Minting to address: " + signers[0].address);
        const tx = await contract.safeMint(signers[0].address, uri);
        console.log("LOG | Transaction: ", tx);
        tokenId = await tx.wait();
        console.log("TEST LOG | Token ID: ", tokenId);
        await expect(tx).to.emit(contract, 'NewToken')//.withArgs(tokenId, uri)
    })
});