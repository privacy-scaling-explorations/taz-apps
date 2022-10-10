import { ethers } from "hardhat"
import { TAZMESSAGE_CONTRACT, TAZARTWORK_CONTRACT } from "../config/goerli.json"

const tazMessageAbi = require("../artifacts/contracts/TazMessage.sol/TazMessage.json").abi
const tazArtworkAbi = require("../artifacts/contracts/TazArtwork.sol/TazArtwork.json").abi

async function main() {
    const [signer1] = await ethers.getSigners()

    const tazMessage = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)
    const tazArtwork = new ethers.Contract(TAZARTWORK_CONTRACT, tazArtworkAbi, signer1)

    const publicKeys = (process.env.PUBLIC_KEY_ARRAY as any).split(",")

    console.info("Calling tazMessage.addAdmins")

    const tx1 = await tazMessage.connect(signer1).addAdmins(publicKeys)
    const receipt1 = await tx1.wait()

    console.info("tazMessage.addAdmins receipt", receipt1)

    console.info("Calling tazArtwork.addAdmins")

    const tx2 = await tazArtwork.connect(signer1).addAdmins(publicKeys)
    const receipt2 = await tx2.wait()

    console.info("tazArtwork.addAdmins receipt", receipt2)

    console.info("Calling tazMessage.addReviewers")

    const tx3 = await tazMessage.connect(signer1).addReviewers([signer1.address])
    const receipt3 = await tx3.wait()

    console.info("tazMessage.addReviewers receipt", receipt3)

    console.info("Calling tazArtwork.addReviewers")

    const tx4 = await tazArtwork.connect(signer1).addReviewers([signer1.address])
    const receipt4 = await tx4.wait()

    console.info("tazArtwork.addReviewers receipt", receipt4)

    console.info("Calling tazArtwork.addStartStoppers")

    const tx5 = await tazArtwork.connect(signer1).addStartStoppers([signer1.address])
    const receipt5 = await tx5.wait()

    console.info("tazArtwork.addStartStoppers receipt", receipt5)

    console.info("Calling tazArtwork.startVoting")

    const tx6 = await tazArtwork.connect(signer1).startVoting()
    const receipt6 = await tx6.wait()

    console.info("tazArtwork.startVoting receipt", receipt6)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
