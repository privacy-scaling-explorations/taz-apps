const { hre, run, ethers } = require('hardhat')

const { GROUP_ID, TAZMESSAGE_CONTRACT, TAZTOKEN_CONTRACT, SEMAPHORE_CONTRACT } = require('../config/goerli.json')
const tazMessageAbi = require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi

async function main() {
  const [signer1, signer2] = await ethers.getSigners()

  const OLD_TAZMESSAGE_CONTRACT = '0xE2C95FD193148321286Acf018E4fbB645F804f8B'
  const NEW_TAZMESSAGE_CONTRACT = TAZMESSAGE_CONTRACT // Assumes config has been updated

  const oldTazMessageContract = new ethers.Contract(OLD_TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)

  // If a new TazMessage contract is deployed, it may be necessary to update the group admin
  // on the Semaphore contract to be the address of the new TazMessage contract.
  // The new admin should be the new contract, and this should be run using a connection to the old contract (old contract in config)

  console.log('Updating the Semaphore group admin')

  const tx = await oldTazMessageContract.connect(signer1).updateSemaphoreGroupAdmin(GROUP_ID, NEW_TAZMESSAGE_CONTRACT)
  const receipt = await tx.wait()
  console.log('Tx receipt:', receipt)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
