import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useEffect, useState } from 'react'
import { Subgraph } from '@semaphore-protocol/subgraph'

const {
  generateProof,
  verifyProof,
  packToSolidityProof,
} = require('@semaphore-protocol/proof')

export const useGenerateProof = (identityKey) => {
  const [externalNullifier] = useState(Math.round(Math.random() * 1000000000))
  // Define signal based on message
  const [signal] = useState('proposal_1')
  // const [fullProof, setFullProof] = useState(null)
  // const [solidityProof, setSolidityProof] = useState(null)
  // const [nullifierHash, setNullifierHash] = useState(null)
  // const [identity, setIdentity] = useState(new Identity(identityKey))

  const generateFullProof = async (identityKey) => {
    const identity = new Identity(identityKey)
    const group = new Group(16)
    const groupId = '10803'
    const subgraph = new Subgraph('goerli')
    const { members } = await subgraph.getGroup(groupId, { members: true })
    console.log('IdentityCommitment', identity.generateCommitment().toString())
    console.log(members)
    group.addMembers(members)
    console.log('group...', group)

    const fullProofTemp = await generateProof(
      identity,
      group,
      externalNullifier,
      signal,
      {
        zkeyFilePath:
          'https://www.trusted-setup-pse.org/semaphore/16/semaphore.zkey',
        wasmFilePath:
          'https://www.trusted-setup-pse.org/semaphore/16/semaphore.wasm',
      },
    )
    // console.log('fullProofTemp...', fullProofTemp)
    const { nullifierHash: nullifierHashTemp } = fullProofTemp.publicSignals
    const solidityProof = packToSolidityProof(fullProofTemp.proof)
    console.log('fullProof on useHook', fullProofTemp)
    return {
      fullProofTemp,
      solidityProof,
      nullifierHashTemp,
      externalNullifier,
      signal,
    }
  }

  useEffect(() => {
    console.log('State Initiated')
  }, [])

  return [generateFullProof]
}
