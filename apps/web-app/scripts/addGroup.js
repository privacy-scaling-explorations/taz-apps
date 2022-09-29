const { hre, run, ethers } = require('hardhat')
const { Identity } = require('@semaphore-protocol/identity')

const { GROUP_ID, IDENTITY_SEED, TAZMESSAGE_CONTRACT, SEMAPHORE_CONTRACT } = require('../config/goerli.json')

const tazMessageAbi = require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi

const semaphoreAbi = [
  'function createGroup(uint256 groupId, uint256 merkleTreeDepth, uint256 zeroValue, address admin)'
]

async function main() {
  const [signer1, signer2] = await ethers.getSigners()

  const semaphoreContract = new ethers.Contract(SEMAPHORE_CONTRACT, semaphoreAbi, signer1)

  console.log('Adding Semaphore group')
  const tx1 = await semaphoreContract.connect(signer1).createGroup(GROUP_ID, 16, 0, TAZMESSAGE_CONTRACT)
  const receipt1 = await tx1.wait()
  console.log('Tx1 receipt:', receipt1)

  const identity = new Identity(IDENTITY_SEED)
  const identityCommitment = identity.generateCommitment()
  const tazMessageContract = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)
  console.log(
    `Adding member to group ${GROUP_ID} with identityCommitment ${identityCommitment} using contract ${tazMessageContract.address}`
  )
  const tx2 = await tazMessageContract.connect(signer1).addMember(GROUP_ID, identityCommitment)
  const receipt2 = await tx2.wait()
  console.log('Tx2 receipt:', receipt2)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
