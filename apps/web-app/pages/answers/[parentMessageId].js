import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ethers } from 'ethers'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import { RiArrowLeftLine } from 'react-icons/ri'

import { useGenerateProof } from '../../hooks/useGenerateProof'
import { Subgraphs } from '../../hooks/subgraphs'
import AnswerModal from '../../components/AnswerModal'
import ProcessingModal from '../../components/ProcessingModal'
import Footer from '../../components/Footer'
import BlueCircle from '../../components/svgElements/BlueCircle'
import YellowEllipse from '../../components/svgElements/YellowEllipse'
import RedCircle from '../../components/svgElements/RedCircle'
import BackToTopArrow from '../../components/svgElements/BackToTopArrow'
import ConvoBubbles from '../../components/svgElements/ConvoBubbles'
import Loading from '../../components/Loading'

const {
  API_REQUEST_TIMEOUT,
  FACT_ROTATION_INTERVAL,
  CHAINED_MODAL_DELAY,
  ITEMS_PER_FETCH
} = require('../../config/goerli.json')
const { FACTS } = require('../../data/facts.json')

export default function Answers() {
  const [generateFullProof] = useGenerateProof()
  const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [answers, setAnswers] = useState([])
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [nextFetchSkip, setNextFetchSkip] = useState(0)
  const hasMoreItems = nextFetchSkip > -1
  const loader = (
    <div className="p-12 flex justify-center">
      <Loading size="xl" />
    </div>
  )
  const router = useRouter()
  const { parentMessageId, txHash } = router.query

  const closeAnswerModal = () => {
    setAnswerModalIsOpen(false)
  }

  const openAnswerModal = () => {
    setAnswerModalIsOpen(true)
  }

  const internalCloseProcessingModal = () => {
    setProcessingModalIsOpen(false)
  }

  const closeProcessingModal = () => {
    setProcessingModalIsOpen(true)
  }

  const openProcessingModal = () => {
    setProcessingModalIsOpen(true)
  }

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    closeAnswerModal()
    setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and answer' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

    const messageContent = answer
    const signal = ethers.utils.id(messageContent).slice(35)
    const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
      identityKey,
      signal
    )

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'processing', text: 'Submit transaction with proof and answer' },
      { status: 'queued', text: 'Update answers from on-chain events' }
    ])

    const body = {
      parentMessageId,
      messageContent,
      merkleTreeRoot,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    }
    console.log('ANSWERS PAGE | body', body)
    try {
      const postResponse = await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT
      })
      if (postResponse.status === 201) {
        const newAnswer = {
          parentMessageId,
          messageId: 0,
          txHash: postResponse.data.hash,
          messageContent
        }
        const updatedAnswers = [newAnswer].concat(answers)
        setAnswers(updatedAnswers)

        console.log('ANSWERS PAGE | updatedAnswers', updatedAnswers)
        console.log('ANSWERS PAGE | answers', answers)
        console.log('ANSWERS PAGE | postResponse.status', postResponse.status)
        console.log('ANSWERS PAGE | postResponse.data.hash', postResponse.data.hash)

        // Cache answer while tx completes
        window.localStorage.setItem('savedAnswer', JSON.stringify(newAnswer))
      } else if (postResponse.status === 203) {
        alert('Your transaction has failed. Please try submitting again.')
        internalCloseProcessingModal()
      }
    } catch (error) {
      alert('Your transaction has failed. Please try submitting again.')
      internalCloseProcessingModal()
    }

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'complete', text: 'Submit transaction with proof and answer' },
      { status: 'processing', text: 'Update answers from on-chain events' }
    ])

    setTimeout(internalCloseProcessingModal, 2000)
  }

  const rotateFact = () => {
    setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
  }

  const fetchQuestion = async () => {
    if (parentMessageId) {
      const subgraphs = new Subgraphs()
      const questionItem = await subgraphs.getMessage(parentMessageId)
      setQuestion(questionItem)
    }
  }

  useEffect(() => {
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
    }

    // Fetch data for this question (not answers -- those are fetched with infinite scroll)
    fetchQuestion()

    // Set up scroll listening for scroll to top button
    const windowHeight = window.outerHeight
    window.addEventListener('scroll', () => {
      if (window.scrollY > windowHeight) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])

  useEffect(() => {
    setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
  }, [fact])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const fetchItems = useCallback(async () => {
    if (fetching) return

    setFetching(true)

    try {
      const subgraphs = new Subgraphs()
      const items = await subgraphs.getMessages(parentMessageId, ITEMS_PER_FETCH, nextFetchSkip)

      // Check local storage for any items cached pending tx finalization
      if (nextFetchSkip === 0) {
        const savedItem = JSON.parse(window.localStorage.getItem('savedAnswer'))
        if (savedItem && savedItem.parentMessageId === parentMessageId) {
          const found = items.some((item) => savedItem && item.messageContent === savedItem.messageContent)
          if (found) {
            window.localStorage.removeItem('savedAnswer')
          } else {
            items.unshift(savedItem)
          }
        }
      }

      setAnswers(answers.concat(items))

      if (items.length === ITEMS_PER_FETCH) {
        setNextFetchSkip(nextFetchSkip + items.length)
      } else {
        setNextFetchSkip(-1) // -1 indicates fetching is complete
      }

      // console.log('QUESTIONS PAGE | fetched questions', items)
    } catch (err) {
      setNextFetchSkip(-1)
      console.error('Error fetching data from subgraph: ', err)
    } finally {
      setFetching(false)
    }
  }, [answers, fetching, nextFetchSkip, parentMessageId])

  return (
    <div className="h-full min-h-screen relative overflow-hidden flex flex-col">
      <div className="fixed top-[10%] -left-[30%]">
        <YellowEllipse />
      </div>
      <div className="fixed top-[40%] right-[2%]">
        <RedCircle />
      </div>
      <div className="fixed top-[60%] left-[-25%]">
        <BlueCircle />
      </div>

      {parentMessageId !== '0' && (
        <div className="fixed bottom-[25%] right-2 z-10 flex justify-end">
          <button
            type="button"
            className="rounded-full bg-brand-yellow ring-2 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
            onClick={openAnswerModal}
          >
            Answer this question
          </button>
        </div>
      )}
      {showTopBtn && (
        <div className="fixed bottom-[25%] left-2 z-10 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow />
          </button>
        </div>
      )}

      <ProcessingModal isOpen={processingModalIsOpen} closeModal={closeProcessingModal} steps={steps} fact={fact} />
      <AnswerModal
        isOpen={answerModalIsOpen}
        closeModal={closeAnswerModal}
        handleAnswerChange={handleAnswerChange}
        handleSubmit={handleSubmit}
      />
      {/* Begin Answer Board */}
      <div className="flex-grow mx-6 mt-8 mb-[30%] text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
        <Link href="/questions" className="cursor-pointer brand">
          <RiArrowLeftLine className="fill-brand-gray50 cursor-pointer mb-4 border-0" />
        </Link>

        {parentMessageId === '0' && txHash ? (
          <div className="p-4">
            <p className="text-brand-red pb-4">Question is still being processed.</p>
            <p className="text-sm">
              You can check your transaction on{' '}
              <a className="py-2 underline" href={`https://goerli.etherscan.io/tx/${txHash}`}>
                Etherscan
              </a>
              .
            </p>
          </div>
        ) : (
          question && (
            <div style={{ borderTopWidth: '0px' }}>
              <div
                style={
                  answers.length > 0
                    ? { borderTopWidth: '0px', borderBottomWidth: '1px', borderColor: '#EAE1DA' }
                    : { borderTopWidth: '0px', borderBottomWidth: '0px' }
                }
              >
                <p className="px-2 text-brand-3xs text-brand-gray50 font-medium">
                  qID {question.messageId.toLocaleString()}
                </p>
                <p className="px-2 pb-4">{question.messageContent}</p>
              </div>

              <InfiniteScroll loadMore={fetchItems} hasMore={hasMoreItems} loader={loader}>
                {answers.length > 0 ? (
                  answers.map((item, index) => (
                    <div
                      className="flex flex-row align-top border-b-[1px] border-brand-beige last:border-b-0"
                      key={item.messageId}
                      // style={
                      //   index + 1 === item.length
                      //     ? { borderTopWidth: '0px', borderBottomWidth: '0px' }
                      //     : { borderTopWidth: '0px', borderBottomWidth: '1px', borderColor: '#EAE1DA' }
                      // }
                    >
                      <div className="flex-col px-2 py-4">
                        <ConvoBubbles />
                      </div>

                      <div className="flex-col py-3 text-xs text-brand-brown">
                        <p className="px-4 pb-2 text-brand-3xs text-brand-gray50 font-medium">
                          aID {item.messageId ? item.messageId.toLocaleString() : '0'}
                        </p>
                        <p className="px-4 leading-[1.3rem] opacity-[70%]">{item.messageContent}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <p className="pl-6 text-brand-orange text-brand-info">No one has answered this question.</p>
                    <p className="pl-24 text-brand-orange text-brand-info">Be the first!</p>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          )
        )}
      </div>
      <div className="flex w-full relative justify-center bg-black pb-3 pt-9">
        <Footer />
      </div>
      {/* End Answer Board */}
    </div>
  )
}

// This exists to prevent losing dynamic query params on refresh
// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  return {
    props: {}
  }
}

/* export async function getServerSideProps({ query }) {
  const subgraphs = new Subgraphs()
  const question = await subgraphs.getMessage(query.parentMessageId)
  const answers = await subgraphs.getMessages(query.parentMessageId)

  console.log('ANSWERS PAGE | fetched answers', answers)

  return {
    props: {
      messageId: query.parentMessageId,
      txHash: query.txHash || '',
      questionProp: question,
      answersProp: answers
    }
  }
}
 */
