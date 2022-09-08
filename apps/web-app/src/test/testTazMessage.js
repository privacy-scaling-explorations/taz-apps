const assert = require('assert')
const { expect } = require('chai')
const { run, ethers } = require('hardhat')
const { Identity } = require('@semaphore-protocol/identity')
const {
  GROUP_ID,
  TAZMESSAGE_CONTRACT,
  SEMAPHORE_CONTRACT,
  IDENTITY_SEED,
} = require('../config/goerli.json')
const tazMessageAbi =
  require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi
const DEPLOY_NEW_TAZ_MESSAGE_CONTRACT = false

/* Initial steps required when deploying the contract:
- Deploy a new TazMessage contract
- Add a group to the local-forked-Goerli Semaphore contract with the new TazMessage contract address as the group admin
- Add a member to that group on the Semaphore contract (the local signer) so that membership can be verified
- Call addMember on TazMessage, which should be allowed to add members to that group on the Semaphore contract (but only members who haven't already been added)
*/

describe('TazMessage', function () {
  let contract
  let signer1, signer2
  const semaphoreAbi = [
    'function createGroup(uint256 groupId, uint8 depth, uint256 zeroValue, address admin)',
  ]

  before(async () => {
    const signers = await ethers.getSigners()
    signer1 = signers[0]
    signer2 = signers[1]

    if (DEPLOY_NEW_TAZ_MESSAGE_CONTRACT) {
      // Deploy a new TazMessage contract
      console.log(
        '--------------------------------------------------------------------',
      )
      console.log('TEST LOG | Deploying new contract')
      contract = await run('deployTazMessage', {
        semaphoreContract: SEMAPHORE_CONTRACT,
        logs: true,
      })

      // Add a new group on the Semaphore contract with the new TazMessage contract as group admin
      const semaphoreContract = new ethers.Contract(
        SEMAPHORE_CONTRACT,
        semaphoreAbi,
        signer1,
      )
      const txCreateGroup = await semaphoreContract.createGroup(
        GROUP_ID,
        16,
        0,
        contract.address,
      )
      await txCreateGroup.wait()
      console.log('TEST LOG | Group ' + GROUP_ID + ' created')
      console.log(
        '--------------------------------------------------------------------',
      )
    } else {
      // Use already-deployed TazMessage contract
      console.log('TEST LOG | Using existing TazMessage contract')
      contract = new ethers.Contract(
        TAZMESSAGE_CONTRACT,
        tazMessageAbi,
        signer1,
      )
    }
  })

  // // If a new TazMessage contract is deployed, it may be useful to update the group admin
  // // on the Semaphore contract to be the address of the new TazMessage contract.
  // describe("# updateSemaphoreGroupAdmin", () => {
  //   it("Should update the Semaphore group admin", async () => {
  //     const tx = await contract.connect(signer1).updateSemaphoreGroupAdmin(GROUP_ID, contract.address)
  //     const receipt = await tx.wait()
  //   })
  // })

  describe('# addMember', () => {
    it('Should fail to add a member if caller is not the owner', async () => {
      const identity = new Identity(IDENTITY_SEED)
      const identityCommitment = identity.generateCommitment()
      const tx = contract
        .connect(signer2)
        .addMember(GROUP_ID, identityCommitment)
      await expect(tx).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('Should add a member', async () => {
      const identity = new Identity(IDENTITY_SEED)
      const identityCommitment = identity.generateCommitment()
      const tx = contract
        .connect(signer1)
        .addMember(GROUP_ID, identityCommitment)
      await expect(tx)
        .to.emit(contract, 'MemberAdded')
        .withArgs(GROUP_ID, identityCommitment)
    })

    it('Should fail to add a member if the member has already been added', async () => {
      const identity = new Identity(IDENTITY_SEED)
      const identityCommitment = identity.generateCommitment()
      const tx = contract
        .connect(signer1)
        .addMember(GROUP_ID, identityCommitment)
      await expect(tx).to.be.revertedWith(
        'Member has already been added to this group',
      )
    })
  })

  describe('# addMessage', () => {
    it('Should add a message', async () => {
      const messageContent = 'What is the name of this Dapp?'
      const messageId = ethers.utils.id(messageContent)
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed: IDENTITY_SEED,
        groupId: GROUP_ID,
        signal,
        logs: false,
      })

      const tx = contract
        .connect(signer1)
        .addMessage(
          messageId,
          messageContent,
          proofElements.groupId,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 },
        )

      await expect(tx)
        .to.emit(contract, 'MessageAdded')
        .withArgs('', messageId, messageContent)
    })

    it('Should fail to add a message if proof is not verified', async () => {
      const messageContent = 'What is the name of this Dapp again?'
      const messageId = ethers.utils.id(messageContent)
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed: IDENTITY_SEED,
        groupId: GROUP_ID,
        signal,
        logs: false,
      })

      const tx = contract.connect(signer1).addMessage(
        messageId,
        messageContent,
        proofElements.groupId,
        proofElements.signalBytes32,
        proofElements.nullifierHash,
        0, // proofElements.externalNullifier purposely set to zero so proof will fail
        proofElements.solidityProof,
        { gasLimit: 1500000 },
      )

      await expect(tx).to.be.reverted
    })
  })

  describe('# replyToMessage', () => {
    it('Should reply to a message', async () => {
      const messageContent = 'The name of the Dapp is TAZ'
      const messageId = ethers.utils.id(messageContent)
      const parentMessageId = ethers.utils.id('What is the name of this Dapp?')
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed: IDENTITY_SEED,
        groupId: GROUP_ID,
        signal,
        logs: false,
      })

      const tx = contract
        .connect(signer1)
        .replyToMessage(
          parentMessageId,
          messageId,
          messageContent,
          proofElements.groupId,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 },
        )

      await expect(tx)
        .to.emit(contract, 'MessageAdded')
        .withArgs(parentMessageId, messageId, messageContent)
    })

    it('Should fail to reply to message when parentMessageId is empty', async () => {
      const messageContent = 'The name of the Dapp is unknowable'
      const messageId = ethers.utils.id(messageContent)
      const parentMessageId = ''
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed: IDENTITY_SEED,
        groupId: GROUP_ID,
        signal,
        logs: false,
      })

      const tx = contract
        .connect(signer1)
        .replyToMessage(
          parentMessageId,
          messageId,
          messageContent,
          proofElements.groupId,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 },
        )

      await expect(tx).to.be.revertedWith(
        'Invalid ID provided for parent message',
      )
    })
  })
})
