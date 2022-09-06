import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import { Group } from '@semaphore-protocol/group'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import LoadingModal from '../LoadingModal/Index.js'
import { AnimatePresence } from 'framer-motion'
import {
  API_REQUEST_TIMEOUT,
  TAZMESSAGE_SUBGRAPH,
} from '../../config/goerli.json'

// import { useIdentity } from './IdentityProvider'
const { generateProof } = require('@semaphore-protocol/proof')
const { verifyProof } = require('@semaphore-protocol/proof')
const { packToSolidityProof } = require('@semaphore-protocol/proof')
const { Subgraph } = require('@semaphore-protocol/subgraph')

// 3. Ask Answer Page
const AnswerQuestion = (props) => {
  const [messageContent, setMessageContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [localIdentity, setLocalIdentity] = useState()
  const [loadingMessage, setLoadingMessage] = useState('')
  const [loadingProof, setLoadingProof] = useState('')

  const router = useRouter()

  const messageId = props.messageId

  const [question, setQuestion] = useState([])

  const fetchQuestion = async (messageId) => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        messageAddeds(
          orderBy: timestamp
          first: 1
          where: {messageId: "${messageId}"}
          orderDirection: desc
        ) {
          id
          messageContent
          messageId
          parentMessageId
        }       
      }
      `,
    }
    // Fetch data
    try {
      const result = await axios.post(TAZMESSAGE_SUBGRAPH, postData)
      console.log('result:', result)
      setQuestion(result.data.data.messageAddeds[0])
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }
  }

  useEffect(() => {
    // setter

    let key = ''

    if (key === '') {
      key = window.localStorage.getItem('identity')
    }
    setLocalIdentity(key)
    console.log(key)

    // Fetch data from subgraph
    const doAsync = async () => {
      await fetchQuestion(messageId)
    }
    doAsync()
  }, [])

  const handleSubmitButton = async () => {
    setIsLoading(true)
    setLoadingMessage('1. Generating Zero Knowledge Proof')

    try {
      const newMessageId = ethers.utils.id(messageContent)
      const signal = newMessageId.slice(35)

      const identity = new Identity(localIdentity)
      const identityCommitment = identity.generateCommitment()
      console.log(identityCommitment)
      console.log('Identity Key')
      console.log(localIdentity)

      // Generate Group
      const groupId = '10803'
      const group = new Group(16)
      const subgraph = new Subgraph('goerli')

      const { members } = await subgraph.getGroup(groupId, { members: true })
      console.log('Members')

      group.addMembers(members)

      // Generate Proof
      const externalNullifier = Math.round(Math.random() * 10000000)

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

      const { nullifierHash } = fullProof.publicSignals
      const solidityProof = packToSolidityProof(fullProof.proof)
      console.log('NullifierHash', nullifierHash)

      // Verify Proof Off Chain
      // Fetch Verification Key
      // Verifing Zero Knwoladge proof off Chain
      const verificationKey = await fetch(
        'https://www.trusted-setup-pse.org/semaphore/16/semaphore.json',
      ).then(function (res) {
        return res.json()
      })

      const res = await verifyProof(verificationKey, fullProof)
      console.log('Verification', res)

      setLoadingMessage(
        "2. The proof has been generated. Your message transaction is now being submitted. This can take up to 1 - 2 minutes, please don't close the App during the proccess :)",
      )
      setLoadingProof(solidityProof)

      const body = {
        parentMessageId: messageId, // The parent of the new message will be the current message
        messageId: newMessageId,
        messageContent,
        groupId,
        externalNullifier,
        signal,
        nullifierHash,
        solidityProof,
      }

      // Verifying Zero Knowledge Proof on Chain and sending Answer
      const response = await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT,
      })
      console.log(response)
      console.log(response.data)

      // go to the answer page to see submitted answer
      router.push('/answers-board-page/' + messageId)
    } catch (error) {
      setIsLoading(false)

      // Custom error depending on points of failure
      alert(error)
    }
  }
  const onClose = () => {
    setIsLoading(!isLoading)
  }

  return (
    <div className="p-4 font-sans bg-brand-beige">
      {isLoading ? (
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
          className="z-20"
        >
          <LoadingModal
            onClose={onClose}
            loadingMessage={loadingMessage}
            loadingProof={loadingProof}
          />
        </AnimatePresence>
      ) : null}
      <svg
        className="absolute -left-2 top-[370px]"
        width="69"
        height="100"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[642px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
      </svg>

      <div className="flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-gray shadow-xl">
        <div className="flex w-full justify-between border-b-2 border-brand-gray bg-brand-beige2 p-3">
          <Link href={'/answers-board-page/' + messageId}>
            <svg
              className="cursor-pointer scale-[100%]"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.8643 0.833496C22.8956 0.833496 29.4063 7.39999 29.4063 15.5002C29.4063 23.6003 22.8956 30.1668 14.8643 30.1668C6.83295 30.1668 0.322266 23.6003 0.322266 15.5002C0.322266 7.39999 6.83295 0.833496 14.8643 0.833496ZM2.96627 15.5002C2.96627 8.87275 8.29319 3.50016 14.8643 3.50016C21.4354 3.50016 26.7623 8.87275 26.7623 15.5002C26.7623 22.1276 21.4354 27.5002 14.8643 27.5002C8.29319 27.5002 2.96627 22.1276 2.96627 15.5002Z"
                fill="#475F6F"
              />
              <path
                transform="translate(9, 9)"
                d="M5.86415 0.843262L7.73372 2.72888L3.99457 6.50008L7.73372 10.2714L5.86415 12.157L0.255371 6.50008L5.86415 0.843262Z"
                fill="#475F6F"
              />
            </svg>
          </Link>
          <div>Q&amp;A Anonymous Reply</div>
          <div></div>
        </div>

        <div className="h-[586px] bg-white py-3 w-full px-4 z-10">
          <p className="py-5 font-bold">{question?.messageContent}</p>
          <p className="py-2 w-[80%] mb-3 text-xs">
            Reply to the message above to see your message appear anonymously in
            TAZ.
          </p>
          <input
            className="border-2 border-brand-gray w-full my-3 py-2 rounded-lg"
            onChange={(e) => {
              setMessageContent(e.target.value)
            }}
          ></input>
          {isLoading ? (
            <button className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              Waiting for transaction
            </button>
          ) : (
            <button
              className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              onClick={handleSubmitButton}
            >
              Submit Reply
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between w-[70%] py-6 text-white  z-[5]">
        <p className="underline">Share your feedback & claim your POAP!</p>
        <p className="ml-10">X</p>
        <div className="bg-black absolute w-full h-[20%] bottom-[50px] left-0 -z-10"></div>
      </div>
      <Link href="questions-page">
        <button>Go to Questions Board Page(Test)</button>
      </Link>
    </div>
  )
}

export default AnswerQuestion
