import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useEffect } from 'react'
// import { Subgraph } from '@semaphore-protocol/subgraph'
import { Subgraphs } from './subgraphs'

const { generateProof, packToSolidityProof } = require('@semaphore-protocol/proof')
const { GROUP_ID } = require('../config/goerli.json')

// eslint-disable-next-line import/prefer-default-export
export const useGenerateProofVote = () => {
  const generateFullProofVote = async (identityKey, signal) => {
    const identity = new Identity(identityKey)
    const group = new Group(16)
    const groupId = GROUP_ID.toString()

    // const subgraph = new Subgraph()
    // const subgraph = new Subgraph('goerli')
    // const { members } = await subgraph.getGroup(groupId, { members: true })

    const subgraphs = new Subgraphs()
    const members = await subgraphs.getGroupIdentities(groupId)

    console.log('members', members)

    group.addMembers(members)

    const merkleTreeRoot = group.root.toString()

    const externalNullifier = 115101

    // Adapt Signal
    // const signal = 'proposal_1'
    const fullProofTemp = await generateProof(identity, group, 115101, signal, {
      zkeyFilePath: '/semaphore.zkey',
      wasmFilePath: '/semaphoreWasm.wasm'
    })

    const { nullifierHash } = fullProofTemp.publicSignals
    const solidityProof = packToSolidityProof(fullProofTemp.proof)

    console.log('nullifierHash', nullifierHash)

    return {
      fullProofTemp,
      solidityProof,
      nullifierHash,
      externalNullifier,
      merkleTreeRoot,
      groupId
    }
  }

  useEffect(() => {
    console.log('State Initiated')
  }, [])

  return [generateFullProofVote]
}
