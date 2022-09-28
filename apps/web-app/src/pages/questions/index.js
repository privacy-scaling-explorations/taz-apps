import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'
import QuestionModal from '../../components/QuestionModal'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ProcessingModal from '../../components/ProcessingModal'
import { Subgraphs } from '../../hooks/subgraphs'
import BackToTopArrow from '../../components/svgElements/BackToTopArrow'
import BunnyQuestion from '../../components/svgElements/BunnyQuestion'
import YellowCircle from '../../components/svgElements/YellowCircle'
import BlueEllipse from '../../components/svgElements/BlueEllipse'
import RedCircle from '../../components/svgElements/RedCircle'
import SelectorArrow from '../../components/ArrowNavigators/SelectorArrow'
import BackTAZ from '../../components/ArrowNavigators/BackTAZ'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'

const {
  API_REQUEST_TIMEOUT,
  FACT_ROTATION_INTERVAL,
  CHAINED_MODAL_DELAY,
  ITEMS_PER_FETCH
} = require('../../config/goerli.json')
const { FACTS } = require('../../data/facts.json')

export default function Questions() {
  const [generateFullProof] = useGenerateProof()
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false)
  const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
  const [question, setQuestion] = useState()
  const [identityKey, setIdentityKey] = useState('')
  const [questions, setQuestions] = useState([])
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

  const closeQuestionModal = () => {
    setQuestionModalIsOpen(false)
  }

  const openQuestionModal = () => {
    setQuestionModalIsOpen(true)
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

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    closeQuestionModal()
    setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and question' },
      { status: 'queued', text: 'Update questions from on-chain events' }
    ])

    const messageContent = question
    const signal = ethers.utils.id(messageContent).slice(35)
    const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
      identityKey,
      signal
    )

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'processing', text: 'Submit transaction with proof and question' },
      { status: 'queued', text: 'Update questions from on-chain events' }
    ])

    const body = {
      parentMessageId: 0,
      messageContent,
      merkleTreeRoot,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    }
    console.log('QUESTIONS PAGE | body', body)
    try {
      const postResponse = await axios.post('/api/postMessage', body, {
        timeout: API_REQUEST_TIMEOUT
      })
      if (postResponse.status === 201) {
        const newQuestion = {
          messageId: 0,
          txHash: postResponse.data.hash,
          messageContent
        }
        const updatedQuestions = [newQuestion].concat(questions)
        setQuestions(updatedQuestions)

        console.log('QUESTIONS PAGE | updatedQuestions', updatedQuestions)
        console.log('QUESTIONS PAGE | postResponse.status', postResponse.status)
        console.log('QUESTIONS PAGE | postResponse.data.hash', postResponse.data.hash)

        // Cache question while tx completes
        window.localStorage.setItem('savedQuestion', JSON.stringify(newQuestion))
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
      { status: 'complete', text: 'Submit transaction with proof and question' },
      { status: 'processing', text: 'Update questions from on-chain events' }
    ])

    setTimeout(internalCloseProcessingModal, 2000)
  }

  const rotateFact = () => {
    setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
  }

  useEffect(() => {
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
    }

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
      const items = await subgraphs.getMessages(0, ITEMS_PER_FETCH, nextFetchSkip)

      // Check local storage for any items cached pending tx finalization
      if (nextFetchSkip === 0) {
        const savedItem = JSON.parse(window.localStorage.getItem('savedQuestion'))
        if (savedItem) {
          const found = items.some((item) => savedItem && item.messageContent === savedItem.messageContent)
          if (found) {
            window.localStorage.removeItem('savedQuestion')
          } else {
            items.unshift(savedItem)
          }
        }
      }

      setQuestions(questions.concat(items))

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
  }, [questions, fetching, nextFetchSkip])

  return (
    <div className="min-h-[700px]">
      <div className="fixed bottom-[37%] right-2 z-30 flex justify-end">
        <button
          type="button"
          className="rounded-full bg-brand-yellow ring-1 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          onClick={openQuestionModal}
        >
          Ask a question
        </button>
      </div>
      {showTopBtn && (
        <div className="fixed bottom-[25%] left-2 z-30 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow />
          </button>
        </div>
      )}
      <ProcessingModal isOpen={processingModalIsOpen} closeModal={closeProcessingModal} steps={steps} fact={fact} />
      <QuestionModal
        isOpen={questionModalIsOpen}
        closeModal={closeQuestionModal}
        handleQuestionChange={handleQuestionChange}
        handleSubmit={handleSubmit}
      />

      {/* Begin Questions Board */}

      <div className="grid mb-[200px]">
        <div className="z-20 col-start-1 row-start-1 fixed">
          <div className="absolute top-[142px] -left-[51px]">
            <YellowCircle />
          </div>
          <div className="absolute top-[360px] left-[320px]">
            <BlueEllipse />
          </div>
          <div className="absolute top-[500px] left-[9px]">
            <RedCircle />
          </div>
        </div>

        <div className="z-20 col-start-1 row-start-1">
          <Link href="/experiences-page">
            <div className="flex max-w-[76px] max-h-[32px] bg-black ml-9 mt-8 mb-10 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
              <BackTAZ />
              <h1>TAZ</h1>
            </div>
          </Link>
          <div className="px-6 pt-3 pb-2">
            <div>
              <h2 className="ml-3 text-[24px] leading-5 font-extrabold">ASK AND ANSWER</h2>
            </div>
            <div>
              <h2 className="ml-3 mb-1 text-[24px] font-extrabold">QUESTIONS FREELY</h2>
            </div>
            <div>
              <h3 className="mx-3 pr-20 text-brand-body text-brand-blue">
                More details about what makes this anonymous and copy about this long.
              </h3>
            </div>
          </div>
        </div>

        <div className="z-20 col-start-1 row-start-2 px-6 pb-8">
          <div className="z-20 min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
            <InfiniteScroll loadMore={fetchItems} hasMore={hasMoreItems} loader={loader}>
              {questions.map((item) => (
                <Link
                  href={
                    item.messageId !== 0
                      ? `/answers/${item.messageId}`
                      : `/answers/${item.messageId}/?txHash=${item.txHash}`
                  }
                  key={item.messageId}
                >
                  <div className="flex w-full flex-row items-center border-brand-blue border-b-[1px] p-4 cursor-pointer">
                    <p className="text-brand-brown opacity-[85%] text-sm leading-5 w-[100%]">{item.messageContent}</p>
                    <SelectorArrow />
                  </div>
                </Link>
              ))}
            </InfiniteScroll>
          </div>
        </div>

        <div className="z-10 fixed bottom-0 w-full flex-col bg-black py-5">
          <Footer />
        </div>
        <div className="absolute overflow-hidden top-36 md:top-20 -right-0">
          <BunnyQuestion />
        </div>
      </div>

      {/* End Questions Board */}
    </div>
  )
}

/* export async function getServerSideProps() {
  const subgraphs = new Subgraphs()
  const questions = await subgraphs.getMessages(0)

  // console.log('QUESTIONS PAGE | fetched questions', questions)

  return {
    props: { questionsProp: questions }
  }
} */
