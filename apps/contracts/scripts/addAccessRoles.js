const { hre, run, ethers } = require('hardhat')

const { TAZMESSAGE_CONTRACT, TAZTOKEN_CONTRACT, SEMAPHORE_CONTRACT } = require('../config/goerli.json')
const tazMessageAbi = require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi
const tazTokenAbi = require('../artifacts/contracts/TazToken.sol/TazToken.json').abi

async function main() {
  const [signer1, signer2] = await ethers.getSigners()

  const tazMessage = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)
  const tazToken = new ethers.Contract(TAZTOKEN_CONTRACT, tazTokenAbi, signer1)

  const publicKeys = process.env.PUBLIC_KEY_ARRAY.split(',')

  console.log('Calling tazMessage.addAdmins')
  const tx1 = await tazMessage.connect(signer1).addAdmins(publicKeys)
  const receipt1 = await tx1.wait()
  console.log('tazMessage.addAdmins receipt', receipt1)

  console.log('Calling tazToken.addAdmins')
  const tx2 = await tazToken.connect(signer1).addAdmins(publicKeys)
  const receipt2 = await tx2.wait()
  console.log('tazToken.addAdmins receipt', receipt2)

  console.log('Calling tazMessage.addReviewers')
  const tx3 = await tazMessage.connect(signer1).addReviewers([signer1.address])
  const receipt3 = await tx3.wait()
  console.log('tazMessage.addReviewers receipt', receipt3)

  console.log('Calling tazToken.addReviewers')
  const tx4 = await tazToken.connect(signer1).addReviewers([signer1.address])
  const receipt4 = await tx4.wait()
  console.log('tazToken.addReviewers receipt', receipt4)

  console.log('Calling tazToken.addStartStoppers')
  const tx5 = await tazToken.connect(signer1).addStartStoppers([signer1.address])
  const receipt5 = await tx5.wait()
  console.log('tazToken.addStartStoppers receipt', receipt5)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
