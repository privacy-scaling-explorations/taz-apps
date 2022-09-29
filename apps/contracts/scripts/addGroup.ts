import { Identity } from "@semaphore-protocol/identity"
import { ethers } from "hardhat"
import { GROUP_ID, SEMAPHORE_CONTRACT, IDENTITY_SEED, TAZMESSAGE_CONTRACT } from "../config/goerli.json"

const tazMessageAbi = require("../artifacts/contracts/TazMessage.sol/TazMessage.json").abi

const semaphoreAbi = [
    "function createGroup(uint256 groupId, uint256 merkleTreeDepth, uint256 zeroValue, address admin)"
]

async function main() {
    const [signer1] = await ethers.getSigners()

    const semaphoreContract = new ethers.Contract(SEMAPHORE_CONTRACT, semaphoreAbi, signer1)

    console.info("Adding Semaphore group")

    const tx1 = await semaphoreContract.connect(signer1).createGroup(GROUP_ID, 16, 0, TAZMESSAGE_CONTRACT)
    const receipt1 = await tx1.wait()

    console.info("Tx1 receipt:", receipt1)

    const identity = new Identity(IDENTITY_SEED)
    const identityCommitment = identity.generateCommitment()
    const tazMessageContract = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)

    console.info(
        `Adding member to group ${GROUP_ID} with identityCommitment ${identityCommitment} using contract ${tazMessageContract.address}`
    )

    const tx2 = await tazMessageContract.connect(signer1).addMember(GROUP_ID, identityCommitment)
    const receipt2 = await tx2.wait()

    console.info("Tx2 receipt:", receipt2)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
