/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const assert = require('assert')
const { expect } = require('chai')
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { run, ethers } = require('hardhat')
const { Identity } = require('@semaphore-protocol/identity')
const { keccak256 } = require('@ethersproject/keccak256')
const { toUtf8Bytes } = require('@ethersproject/strings')
const { GROUP_ID, TAZMESSAGE_CONTRACT, SEMAPHORE_CONTRACT } = require('../config/goerli.json')

const identitySeed = process.env.IDENTITY_SEED
const tazMessageAbi = require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi

const TAZ_ADMIN_ROLE_HASH = keccak256(toUtf8Bytes('TAZ_ADMIN_ROLE'))
const REVIEWER_ROLE_HASH = keccak256(toUtf8Bytes('REVIEWER_ROLE'))

/*
SETTINGS
Alter settings depending on what testing is needed
Initial steps required when deploying the contract locally:
  - Deploy a new TazMessage contract
  - Add a group to the local-forked-Goerli Semaphore contract with the new TazMessage contract address as the group admin
  - Add a member to that group on the Semaphore contract so that membership can be verified
*/
const DEPLOY_NEW_TAZ_MESSAGE_CONTRACT = true // Generally always do this on local fork
const CREATE_NEW_GROUP = true // Will fail if group id already exists
const ADD_MEMBER = true // Will fail if member has already been added to the group
const TEST_ADD_ADMINS = true
const TEST_REVIEWERS_AND_VIOLATIONS = true

describe('TazMessage', () => {
  let contract
  let signer1
  let signer2

  before(async () => {
    ;[signer1, signer2] = await ethers.getSigners()

    if (DEPLOY_NEW_TAZ_MESSAGE_CONTRACT) {
      console.log('--------------------------------------------------------------------')
      console.log('TEST | Deploying new contract')
      console.log('--------------------------------------------------------------------')
      contract = await run('deployTazMessage', {
        semaphoreContract: SEMAPHORE_CONTRACT,
        logs: true
      })
    } else {
      console.log('--------------------------------------------------------------------')
      console.log('TEST | Using existing TazMessage contract')
      console.log('--------------------------------------------------------------------')
      contract = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)
    }
  })

  if (CREATE_NEW_GROUP) {
    const semaphoreAbi = [
      'function createGroup(uint256 groupId, uint256 merkleTreeDepth, uint256 zeroValue, address admin)'
    ]

    describe('#createGroup', () => {
      it('Should create a new group on Semaphore contract', async () => {
        // Add a new group on the Semaphore contract with the TazMessage contract as group admin
        const semaphoreContract = new ethers.Contract(SEMAPHORE_CONTRACT, semaphoreAbi, signer1)
        const tx = semaphoreContract.connect(signer1).createGroup(GROUP_ID, 16, 0, contract.address)
        // await expect(tx).to.emit(semaphoreContract, 'GroupCreated').withArgs(GROUP_ID, 16, 0)
        await expect(tx).to.not.be.reverted
        console.log('--------------------------------------------------------------------')
        console.log(`TEST | Group ${GROUP_ID} created`)
        console.log('--------------------------------------------------------------------')
      })
    })
  }

  // If a new TazMessage contract is deployed, it may be necessary to update the group admin
  // on the Semaphore contract to be the address of the new TazMessage contract.
  // The new admin should be the new contract, and this should be run using a connection to the old contract (old contract in config)
  /*  describe('# updateSemaphoreGroupAdmin', () => {
    it('Should update the Semaphore group admin', async () => {
      const newAdminContract = '' // contract.address ?
      const tx = await contract.connect(signer1).updateSemaphoreGroupAdmin(GROUP_ID, newAdminContract)
      const receipt = await tx.wait()
    })
  }) */

  if (ADD_MEMBER) {
    describe('# addMember', () => {
      it('Should fail to add a member if caller is not an admin', async () => {
        const identity = new Identity(identitySeed)
        const identityCommitment = identity.generateCommitment()
        const tx = contract.connect(signer2).addMember(GROUP_ID, identityCommitment)
        await expect(tx).to.be.revertedWith(
          `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
        )
      })

      it('Should add a member', async () => {
        const identity = new Identity(identitySeed)
        const identityCommitment = identity.generateCommitment()
        console.log('--------------------------------------------------------------------')
        console.log(
          `TEST | Adding member to group ${GROUP_ID} with identityCommitment ${identityCommitment} using contract ${contract.address}`
        )
        console.log('--------------------------------------------------------------------')
        const tx = contract.connect(signer1).addMember(GROUP_ID, identityCommitment)
        await expect(tx).to.emit(contract, 'MemberAdded').withArgs(GROUP_ID, identityCommitment)
      })

      it('Should fail to add a member if the member has already been added', async () => {
        const identity = new Identity(identitySeed)
        const identityCommitment = identity.generateCommitment()
        const tx = contract.connect(signer1).addMember(GROUP_ID, identityCommitment)
        await expect(tx).to.be.revertedWith('Member already added to group')
      })
    })
  }

  if (TEST_ADD_ADMINS) {
    describe('# addAdmins', () => {
      it('Should add admins', async () => {
        const admins = process.env.PUBLIC_KEY_ARRAY.split(',')
        const tx = contract.connect(signer1).addAdmins(admins)
        await expect(tx).to.not.be.reverted
      })
    })
  }

  describe('# addMessage', () => {
    it('Should add a message', async () => {
      const messageContent = 'What is the name of this Dapp?'
      const signal = ethers.utils.id(messageContent).slice(35)
      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        externalNullifier: Math.round(Math.random() * 1000000000),
        logs: false
      })
      /*
      console.log('messageContent:', messageContent)
      console.log('proofElements.groupId:', proofElements.groupId)
      console.log('proofElements.merkleTreeRoot:', proofElements.merkleTreeRoot)
      console.log('proofElements.signalBytes32:', proofElements.signalBytes32)
      console.log('proofElements.nullifierHash:', proofElements.nullifierHash)
      console.log('proofElements.externalNullifier:', proofElements.externalNullifier)
      console.log('proofElements.solidityProof:', proofElements.solidityProof)
      */
      const tx = await contract
        .connect(signer1)
        .addMessage(
          messageContent,
          proofElements.groupId,
          proofElements.merkleTreeRoot,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 }
        )

      await expect(tx).to.emit(contract, 'MessageAdded').withArgs(0, anyValue, messageContent)

      /*
      // Method below allows for testing individual arguments separately. Same result.
      const receipt = await tx.wait()
      const interfaceMessageAdded = new ethers.utils.Interface([
        'event MessageAdded(string parentMessageId, string messageId, string messageContent)'
      ])
      const { data } = receipt.logs[1]
      const { topics } = receipt.logs[1]
      const event = interfaceMessageAdded.decodeEventLog('MessageAdded', data, topics)
      expect(event.parentMessageId).to.equal('')
      expect(event.messageId).to.equal(messageId)
      expect(event.messageContent).to.equal(messageContent)
      */
    })
  })

  describe('# replyToMessage', () => {
    it('Should reply to a message', async () => {
      const messageContent = 'The name of the Dapp is TAZ'
      const parentMessageId = 1
      const signal = ethers.utils.id(messageContent).slice(35)

      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        externalNullifier: Math.round(Math.random() * 1000000000),
        logs: false
      })

      const tx = contract
        .connect(signer1)
        .replyToMessage(
          parentMessageId,
          messageContent,
          proofElements.groupId,
          proofElements.merkleTreeRoot,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 }
        )

      await expect(tx).to.emit(contract, 'MessageAdded').withArgs(parentMessageId, anyValue, messageContent)
    })

    it('Should fail to reply to message when parentMessageId is empty', async () => {
      const messageContent = 'The name of the Dapp is unknowable'
      const parentMessageId = 0
      const signal = ethers.utils.id(messageContent).slice(35)

      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        externalNullifier: Math.round(Math.random() * 1000000000),
        logs: false
      })

      const tx = contract
        .connect(signer1)
        .replyToMessage(
          parentMessageId,
          messageContent,
          proofElements.groupId,
          proofElements.merkleTreeRoot,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 }
        )

      await expect(tx).to.be.revertedWith('Invalid ID for parent message')
    })
  })

  if (TEST_REVIEWERS_AND_VIOLATIONS) {
    describe('# addReviewers', () => {
      it('Should fail to add a reviewer', async () => {
        const reviewers = [signer2.address]
        const tx = contract.connect(signer2).addReviewers(reviewers)
        await expect(tx).to.be.revertedWith(
          `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
        )
      })

      it('Should add reviewers', async () => {
        const reviewers = [signer1.address, signer2.address]
        const tx = contract.connect(signer1).addReviewers(reviewers)
        await expect(tx).to.emit(contract, 'RoleGranted').withArgs(REVIEWER_ROLE_HASH, signer2.address, signer1.address)
      })
    })

    describe('# removeReviewers', () => {
      it('Should fail to remove a reviewer', async () => {
        const reviewers = [signer1.address]
        const tx = contract.connect(signer2).removeReviewers(reviewers)
        await expect(tx).to.be.revertedWith(
          `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
        )
      })

      it('Should remove a reviewer', async () => {
        const reviewers = [signer1.address]
        const tx = contract.connect(signer1).removeReviewers(reviewers)
        await expect(tx).to.emit(contract, 'RoleRevoked').withArgs(REVIEWER_ROLE_HASH, signer1.address, signer1.address)
      })
    })

    describe('# addViolation', () => {
      it('Should fail to add a violation', async () => {
        const messageId = 1
        const tx = contract.connect(signer1).addViolation(messageId)
        await expect(tx).to.be.revertedWith(
          `AccessControl: account ${signer1.address.toLowerCase()} is missing role ${REVIEWER_ROLE_HASH}`
        )
      })

      it('Should add a violation', async () => {
        const messageId = 1
        const tx = contract.connect(signer2).addViolation(messageId)
        await expect(tx).to.emit(contract, 'ViolationAdded').withArgs(messageId, signer2.address)
      })
    })
  }
})
