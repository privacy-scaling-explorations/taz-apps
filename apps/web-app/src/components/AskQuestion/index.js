import { useState, useEffect } from 'react'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { API_REQUEST_TIMEOUT } from '../../config/goerli.json'

import AskQuestionComponent from './View.js'

const { generateProof } = require('@semaphore-protocol/proof')
const { verifyProof } = require('@semaphore-protocol/proof')
const { packToSolidityProof } = require('@semaphore-protocol/proof')
const { Subgraph } = require('@semaphore-protocol/subgraph')

// 3. Ask Question Page
const AskQuestion = () => {
  const [messageContent, setMessageContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [localIdentity, setLocalIdentity] = useState()
  const [loadingMessage, setLoadingMessage] = useState('')
  const [loadingProof, setLoadingProof] = useState('')

  const router = useRouter()

  useEffect(() => {
    let identityKey = ''

    if (identityKey === '') {
      identityKey = window.localStorage.getItem('identity')
    }
    console.log(identityKey)
    setLocalIdentity(identityKey)
  })

  const handleAskButton = async () => {
    setIsLoading(true)
    setLoadingMessage('1. Generating Zero Knowledge Proof')
    try {
      const messageId = ethers.utils.id(messageContent)
      const signal = messageId.slice(35)

      const identity = new Identity(localIdentity)
      const identityCommitment = identity.generateCommitment()
      console.log(identityCommitment)
      console.log('Identity Key')
      console.log(localIdentity)

      // Generate Group
      const group = new Group(16)
      const groupId = '10803'
      const subgraph = new Subgraph('goerli')

      const { members } = await subgraph.getGroup(groupId, { members: true })
      console.log('Members')
      console.log(members)

      group.addMembers(members)
      console.log('Group Root')
      console.log(group.root)

      // Generate Proof
      const externalNullifier = Math.round(Math.random() * 1000000000)

      const fullProof = await generateProof(
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
      console.log('Proof')
      console.log(fullProof)
      const { nullifierHash } = fullProof.publicSignals
      const solidityProof = packToSolidityProof(fullProof.proof)
      console.log('NullifierHash')
      console.log(nullifierHash)

      // Verify Proof Off Chain
      // Fetch Verification Key
      const verificationKey = await fetch(
        'https://www.trusted-setup-pse.org/semaphore/16/semaphore.json',
      ).then(function (res) {
        return res.json()
      })

      const res = await verifyProof(verificationKey, fullProof)
      console.log('Verification')
      console.log(res)

      setLoadingMessage(
        '2. A proof has been generated. Your message transaction is now being submitted.',
      )
      setLoadingProof(solidityProof)

      const body = {
        parentMessageId: '',
        messageId,
        messageContent,
        groupId,
        signal,
        nullifierHash,
        externalNullifier,
        solidityProof,
      }
      // console.log('Body:', body)

      const response = await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT,
      })
      // console.log(response)
      console.log(response.data)

      // go to the next page
      setLoadingMessage('3. Transaction Successfuly Submitted!')
      router.push('/questions-page')
    } catch (error) {
      setIsLoading(false)
      // Custom error depending on points of failure
      alert(error)
    }
  }

  const onClose = () => {
    setIsLoading(!isLoading)
  }

  const clearIdentity = () => {
    console.log('clear')
    window.localStorage.removeItem('identity')
    router.push('/')
  }

  return (
    <AskQuestionComponent
      onClose={onClose}
      loadingMessage={loadingMessage}
      loadingProof={loadingProof}
      isLoading={isLoading}
      setMessageContent={setMessageContent}
      handleAskButton={handleAskButton}
      clearIdentity={clearIdentity}
    />
  )
}

export default AskQuestion
