// import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
const Sketch = dynamic(() => import('react-p5'), {
  ssr: false,
})
const { generateProof } = require('@semaphore-protocol/proof')
const { verifyProof } = require('@semaphore-protocol/proof')
// const { packToSolidityProof } = require('@semaphore-protocol/proof')

export default function GenerativeArt() {
  // Needs to save data and upload to IPFS
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef)
  }

  const draw = (p5) => {
    p5.background(255, 130, 20)
    p5.ellipse(100, 100, 100)
    p5.ellipse(300, 100, 100)
  }

  const handleGenerateProof = async () => {
    const newIdentity = new Identity('secret-message')
    const identityCommitment = newIdentity.generateCommitment()

    console.log(identityCommitment)

    // Generate Group
    const group = new Group()
    group.addMember(identityCommitment)

    // Subgraph - fetch from subgraph all the group members
    // group.addMember([member1,member2,member3...member100]);

    // there 100 members

    // Generate Proof
    const externalNullifier = 10
    const signal = 'This is my Signal'

    const fullProof = await generateProof(
      newIdentity,
      group,
      externalNullifier,
      signal,
      {
        zkeyFilePath:
          'https://www.trusted-setup-pse.org/semaphore/20/semaphore.zkey',
        wasmFilePath:
          'https://www.trusted-setup-pse.org/semaphore/20/semaphore.wasm',
      },
    )
    console.log('Proof')
    console.log(fullProof)

    // Verify Proof Off Chain
    // Fetch Verification Key
    const verificationKey = await fetch(
      'https://www.trusted-setup-pse.org/semaphore/20/semaphore.json',
    ).then(function (res) {
      return res.json()
    })

    const res = await verifyProof(verificationKey, fullProof)
    console.log('Verification')
    console.log(res)

    // Verify Proof On Chain
  }

  return (
    <div className="flex items-center justify-center flex-col gap-y-5 mt-10">
      <h1 className="text-3xl font-bold text-gray-700">Generative Art</h1>
      <Sketch setup={setup} draw={draw} />

      <button
        className="bg-blue-300 text-gray-700 font-bold p-5 mt-3 rounded-2xl"
        onClick={handleGenerateProof}
      >
        Generate Proof
      </button>
      <h1>Proof</h1>
      <h1>Address</h1>
      <input className="bg-gray-200"></input>
      <button className="bg-blue-300 text-gray-700 font-bold p-5 mt-3 rounded-2xl">
        Submit
      </button>
      <h1>Submited</h1>
      <button className="bg-blue-300 text-gray-700 font-bold p-5 mt-3 rounded-2xl">
        Mint Nft
      </button>
      <h1>Minted!</h1>
    </div>
  )
}
