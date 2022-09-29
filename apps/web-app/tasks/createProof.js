const { task } = require('hardhat/config')
const { Identity } = require('@semaphore-protocol/identity')
const { Group } = require('@semaphore-protocol/group')
const { generateProof } = require('@semaphore-protocol/proof')
const { packToSolidityProof } = require('@semaphore-protocol/proof')
const { Subgraphs } = require('../hooks/subgraphs')

task('createProof', 'create a proof')
  .addParam('identitySeed', 'String used for identity creation', '', types.string)
  .addParam('groupId', 'Semaphore Group ID', 0, types.int)
  .addParam('signal', 'Signal for proof', 'Select Signal', types.string)
  .addParam('externalNullifier', 'ExternalNullifier', 0, types.int)
  .addOptionalParam('logs', 'Print the logs', true, types.boolean)
  .setAction(async ({ identitySeed, groupId, signal, externalNullifier, logs }, { ethers }) => {
    const proofElements = {
      identity: null,
      identityCommitment: null,
      group: null,
      groupId: null,
      merkleTreeRoot: null,
      members: null,
      signal: null,
      signalBytes32: null,
      nullifierHash: null,
      externalNullifier: null,
      solidityProof: null
    }

    if (logs) {
      console.log('--------------------------------------------------------------------')
      console.log('TASK createProof | initiated')
    }

    proofElements.identity = new Identity(identitySeed)
    proofElements.identityCommitment = proofElements.identity.generateCommitment()

    // Create new group with just this member
    // ! Verification will fail if the on-chain group has different membership
    // Use this if creating a new group or adding a member and executing subsequent steps without time for it to register on subgraph
    proofElements.groupId = groupId.toString()
    proofElements.group = new Group(16)
    proofElements.group.addMember(proofElements.identityCommitment)
    proofElements.members = proofElements.group.members

    // Create group using custom subgraph for members (to eliminate 100-member limit)
    // // Use this if group and members are already existing
    // proofElements.group = new Group(16)
    // proofElements.groupId = groupId.toString()
    // const subgraphs = new Subgraphs()
    // proofElements.members = await subgraphs.getGroupIdentities(proofElements.groupId)
    // proofElements.group.addMembers(proofElements.members)

    // Create group using Semaphore subgraph for members
    // proofElements.groupId = groupId.toString()
    // proofElements.group = new Group(16)
    // const subgraph = new Subgraph('goerli')
    // const { members } = await subgraph.getGroup(proofElements.groupId, { members: true })
    // proofElements.group.addMembers(members)
    // proofElements.members = proofElements.group.members

    proofElements.merkleTreeRoot = proofElements.group.root
    proofElements.externalNullifier = externalNullifier
    proofElements.signal = signal
    const fullProof = await generateProof(
      proofElements.identity,
      proofElements.group,
      proofElements.externalNullifier,
      proofElements.signal,
      {
        zkeyFilePath: 'static/semaphore.zkey',
        wasmFilePath: 'static/semaphore.wasm'
      }
    )
    proofElements.nullifierHash = fullProof.publicSignals.nullifierHash
    proofElements.solidityProof = packToSolidityProof(fullProof.proof)
    proofElements.signalBytes32 = ethers.utils.formatBytes32String(proofElements.signal)

    logs && console.log('TASK createProof | proofElements', proofElements)
    logs && console.log('TASK createProof | proofElements.nullifierHash', proofElements.nullifierHash)
    logs && console.log('TASK createProof | proofElements.solidityProof', proofElements.solidityProof)
    logs && console.log('TASK createProof | proofElements.signalBytes32', proofElements.signalBytes32)

    if (logs) {
      console.log('TASK createProof | ended')
      console.log('--------------------------------------------------------------------')
    }

    return proofElements
  })
