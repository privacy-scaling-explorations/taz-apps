/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import { expect } from "chai"
import { run, ethers } from "hardhat"
import { Identity } from "@semaphore-protocol/identity"
import { keccak256 } from "@ethersproject/keccak256"
import { toUtf8Bytes } from "@ethersproject/strings"
import { TAZARTWORK_CONTRACT, SEMAPHORE_CONTRACT, EXTERNAL_NULLIFIER_FOR_VOTING } from "../config/goerli.json"

const GROUP_ID = 256 // Set here rather than from config so it differs from TazMessage

const identitySeed = "sample-identity-seed"
const tazArtworkAbi = require("../artifacts/contracts/TazArtwork.sol/TazArtwork.json").abi

const TAZ_ADMIN_ROLE_HASH = keccak256(toUtf8Bytes("TAZ_ADMIN_ROLE"))
const START_STOPPER_ROLE_HASH = keccak256(toUtf8Bytes("START_STOPPER_ROLE"))
const REVIEWER_ROLE_HASH = keccak256(toUtf8Bytes("REVIEWER_ROLE"))

/*
SETTINGS
Alter settings depending on what testing is needed
*/
const DEPLOY_NEW_TAZARTWORK_CONTRACT = true
const CREATE_NEW_GROUP = true // Will fail if group id already exists
const ADD_MEMBER = true // Will fail if member has already been added to the group

describe("TazArtwork", () => {
    let contract: any
    let signer1: any
    let signer2: any

    before(async () => {
        ;[signer1, signer2] = await ethers.getSigners()

        if (DEPLOY_NEW_TAZARTWORK_CONTRACT) {
            contract = await run("deploy:taz-artwork", {
                semaphoreContract: SEMAPHORE_CONTRACT,
                logs: true
            })
        } else {
            console.log("--------------------------------------------------------------------")
            console.log("TEST | Using existing TazArtwork contract")
            console.log("--------------------------------------------------------------------")
            contract = new ethers.Contract(TAZARTWORK_CONTRACT, tazArtworkAbi, signer1)
        }
    })

    if (CREATE_NEW_GROUP) {
        const semaphoreAbi = [
            "function createGroup(uint256 groupId, uint256 merkleTreeDepth, uint256 zeroValue, address admin)"
        ]

        describe("#createGroup", () => {
            it("Should create a new group on Semaphore contract", async () => {
                // Add a new group on the Semaphore contract with the current signer as the group admin
                const semaphoreContract = new ethers.Contract(SEMAPHORE_CONTRACT, semaphoreAbi, signer1)
                const tx = semaphoreContract.connect(signer1).createGroup(GROUP_ID, 16, 0, signer1.address)
                await expect(tx).to.not.be.reverted
                console.log("--------------------------------------------------------------------")
                console.log(`TEST | Group ${GROUP_ID} created`)
                console.log("--------------------------------------------------------------------")
            })
        })
    }

    if (ADD_MEMBER) {
        const semaphoreAbi = ["function addMember(uint256 groupId, uint256 identityCommitment)"]
        describe("# addMember", () => {
            it("Should add a member", async () => {
                const semaphoreContract = new ethers.Contract(SEMAPHORE_CONTRACT, semaphoreAbi, signer1)
                const identity = new Identity(identitySeed)
                const identityCommitment = identity.generateCommitment()

                // console.log('--------------------------------------------------------------------')
                // console.log(
                //   `TEST | Adding member to group ${GROUP_ID} with identityCommitment ${identityCommitment} using contract ${semaphoreContract.address}`
                // )
                // console.log('--------------------------------------------------------------------')

                const tx = semaphoreContract.connect(signer1).addMember(GROUP_ID, identityCommitment)
                // await expect(tx).to.emit(semaphoreContract, 'MemberAdded').withArgs(GROUP_ID, identityCommitment)
                await expect(tx).to.not.be.reverted
            })
        })
    }

    describe("# addStartStoppers", () => {
        it("Should fail to add a startStopper", async () => {
            const startStoppers = [signer2.address]
            const tx = contract.connect(signer2).addStartStoppers(startStoppers)
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
            )
        })

        it("Should add startStoppers", async () => {
            const startStoppers = [signer1.address, signer2.address]
            const tx = contract.connect(signer1).addStartStoppers(startStoppers)
            await expect(tx)
                .to.emit(contract, "RoleGranted")
                .withArgs(START_STOPPER_ROLE_HASH, signer2.address, signer1.address)
        })
    })

    describe("# removeStartStoppers", () => {
        it("Should fail to remove a startStopper", async () => {
            const startStoppers = [signer1.address]
            const tx = contract.connect(signer2).removeReviewers(startStoppers)
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
            )
        })

        it("Should remove a startStopper", async () => {
            const startStoppers = [signer1.address]
            const tx = contract.connect(signer1).removeStartStoppers(startStoppers)
            await expect(tx)
                .to.emit(contract, "RoleRevoked")
                .withArgs(START_STOPPER_ROLE_HASH, signer1.address, signer1.address)
        })
    })

    describe("# startMinting", () => {
        it("Should fail to start minting due to not being startStopper role", async () => {
            const tx = contract.connect(signer1).startMinting()
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer1.address.toLowerCase()} is missing role ${START_STOPPER_ROLE_HASH}`
            )
        })

        it("Should start minting", async () => {
            const tx = contract.connect(signer2).startMinting()
            await expect(tx).to.not.be.reverted
        })
    })

    describe("# stopVoting", () => {
        it("Should fail to stop voting due to not being startStopper role", async () => {
            const tx = contract.connect(signer1).stopVoting()
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer1.address.toLowerCase()} is missing role ${START_STOPPER_ROLE_HASH}`
            )
        })

        it("Should stop voting", async () => {
            const tx = contract.connect(signer2).stopVoting()
            await expect(tx).to.not.be.reverted
        })
    })

    describe("# safeMint", () => {
        const uri = "https://bafkreignzbdtj6355qlex3njd46lubd7xpyrqdyobvw2q4sxv7fihvsi6y.ipfs.dweb.link/"
        const imageId = "VFAUuztYJEjIMltLItfVb"

        it("Should fail to mint due to not having the tazAdmin role", async () => {
            // Ensure minting is active
            const tx1 = contract.connect(signer2).startMinting()
            await expect(tx1).to.not.be.reverted

            const tx2 = contract.connect(signer2).safeMint(signer1.address, uri, imageId, { gasLimit: 1500000 })

            await expect(tx2).to.be.revertedWith(
                `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
            )
        })

        it("Should fail to mint due to minting being stopped", async () => {
            // Stop minting
            const tx1 = contract.connect(signer2).stopMinting()
            await expect(tx1).to.not.be.reverted

            const tx2 = contract.connect(signer1).safeMint(signer2.address, uri, imageId, { gasLimit: 1500000 })

            await expect(tx2).to.be.revertedWith("Minting not active")
        })

        it("Should mint an NFT", async () => {
            // Ensure minting is active
            const tx1 = contract.connect(signer2).startMinting()
            await expect(tx1).to.not.be.reverted

            // Call static to get token id
            const tokenId = await contract
                .connect(signer1)
                .callStatic.safeMint(signer2.address, uri, imageId, { gasLimit: 1500000 })

            // console.log('--------------------------------------------------------------------')
            // console.log('TEST | Token ID: ', tokenId)
            // console.log(`TEST | Minting to address: ${signer2.address}`)
            // console.log('--------------------------------------------------------------------')

            const tx2 = await contract.connect(signer1).safeMint(signer2.address, uri, imageId, { gasLimit: 1500000 })

            /* console.log('--------------------------------------------------------------------')
      console.log('TEST | Transaction: ', tx2)
      console.log('--------------------------------------------------------------------') */

            await expect(tx2).to.emit(contract, "NewToken").withArgs(tokenId, uri, imageId)
        })
    })

    describe("# vote", () => {
        const tokenId = 1
        const signal = tokenId.toString()

        it("Should fail to vote due to voting not being active", async () => {
            const proofElements = await run("create:proof", {
                identitySeed,
                groupId: GROUP_ID,
                signal,
                externalNullifier: EXTERNAL_NULLIFIER_FOR_VOTING,
                logs: false
            })

            const tx = contract
                .connect(signer1)
                .vote(
                    tokenId,
                    proofElements.groupId,
                    proofElements.merkleTreeRoot,
                    proofElements.signalBytes32,
                    proofElements.nullifierHash,
                    proofElements.solidityProof,
                    { gasLimit: 1500000 }
                )

            await expect(tx).to.be.revertedWith("Voting not active")
        })

        it("Should vote", async () => {
            // Ensure voting is active
            const tx1 = contract.connect(signer2).startVoting()
            await expect(tx1).to.not.be.reverted

            const proofElements = await run("create:proof", {
                identitySeed,
                groupId: GROUP_ID,
                signal,
                externalNullifier: EXTERNAL_NULLIFIER_FOR_VOTING,
                logs: false
            })

            const tx = contract
                .connect(signer1)
                .vote(
                    tokenId,
                    proofElements.groupId,
                    proofElements.merkleTreeRoot,
                    proofElements.signalBytes32,
                    proofElements.nullifierHash,
                    proofElements.solidityProof,
                    { gasLimit: 1500000 }
                )

            await expect(tx).to.emit(contract, "VoteAdded").withArgs(tokenId)
        })

        it("Should fail to vote due to having already cast a vote", async () => {
            const proofElements = await run("create:proof", {
                identitySeed,
                groupId: GROUP_ID,
                signal,
                externalNullifier: EXTERNAL_NULLIFIER_FOR_VOTING,
                logs: false
            })

            const tx = contract
                .connect(signer1)
                .vote(
                    tokenId,
                    proofElements.groupId,
                    proofElements.merkleTreeRoot,
                    proofElements.signalBytes32,
                    proofElements.nullifierHash,
                    proofElements.solidityProof,
                    { gasLimit: 1500000 }
                )

            await expect(tx).to.be.reverted
        })
    })

    describe("# addReviewers", () => {
        it("Should fail to add a reviewer", async () => {
            const reviewers = [signer2.address]
            const tx = contract.connect(signer2).addReviewers(reviewers)
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
            )
        })

        it("Should add reviewers", async () => {
            const reviewers = [signer1.address, signer2.address]
            const tx = contract.connect(signer1).addReviewers(reviewers)
            await expect(tx)
                .to.emit(contract, "RoleGranted")
                .withArgs(REVIEWER_ROLE_HASH, signer2.address, signer1.address)
        })
    })

    describe("# removeReviewers", () => {
        it("Should fail to remove a reviewer", async () => {
            const reviewers = [signer1.address]
            const tx = contract.connect(signer2).removeReviewers(reviewers)
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer2.address.toLowerCase()} is missing role ${TAZ_ADMIN_ROLE_HASH}`
            )
        })

        it("Should remove a reviewer", async () => {
            const reviewers = [signer1.address]
            const tx = contract.connect(signer1).removeReviewers(reviewers)
            await expect(tx)
                .to.emit(contract, "RoleRevoked")
                .withArgs(REVIEWER_ROLE_HASH, signer1.address, signer1.address)
        })
    })

    describe("# addViolation", () => {
        it("Should fail to add a violation", async () => {
            const tokenId = 1
            const tx = contract.connect(signer1).addViolation(tokenId)
            await expect(tx).to.be.revertedWith(
                `AccessControl: account ${signer1.address.toLowerCase()} is missing role ${REVIEWER_ROLE_HASH}`
            )
        })

        it("Should add a violation", async () => {
            const tokenId = 1
            const tx = contract.connect(signer2).addViolation(tokenId)
            await expect(tx).to.emit(contract, "ViolationAdded").withArgs(tokenId, signer2.address)
        })
    })
})
