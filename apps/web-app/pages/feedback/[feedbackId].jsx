import axios from "axios"
import { ethers } from "ethers"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { RiArrowLeftLine } from "react-icons/ri"
import InfiniteScroll from "react-infinite-scroller"
import AnswerModal from "../../components/AnswerModal"
import Footer from "../../components/Footer"
import Loading from "../../components/Loading"
import ProcessingModal from "../../components/ProcessingModal"
import BackToTopArrow from "../../components/svgElements/BackToTopArrow"
import BlueCircle from "../../components/svgElements/BlueCircle"
import ConvoBubbles from "../../components/svgElements/ConvoBubbles"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import { Subgraphs } from "../../helpers/subgraphs"
import { useGenerateProof } from "../../hooks/useGenerateProof"

const {
    API_REQUEST_TIMEOUT,
    FACT_ROTATION_INTERVAL,
    CHAINED_MODAL_DELAY,
    ITEMS_PER_FETCH
} = require("../../config/goerli.json")
const { FACTS } = require("../../data/facts.json")
const allFeedback = require("../../data/feedback.json")

export default function Answers() {
    const [generateFullProof] = useGenerateProof()
    const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
    const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
    const [feedback, setFeedback] = useState(null)
    const [answer, setAnswer] = useState()
    const [identityKey, setIdentityKey] = useState("")
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
    const { feedbackId } = router.query

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
            { status: "processing", text: "Generating zero knowledge proof" },
            { status: "queued", text: "Submit transaction with proof and answer" },
            { status: "queued", text: "Update answers from on-chain events" }
        ])

        const messageContent = answer
        const signal = ethers.utils.id(messageContent).slice(35)
        const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
            identityKey,
            signal
        )

        setSteps([
            { status: "complete", text: "Generated zero knowledge proof" },
            { status: "processing", text: "Submitting transaction with proof and answer" },
            { status: "queued", text: "Update answers from on-chain events" }
        ])

        const body = {
            parentMessageId: feedbackId,
            messageContent,
            merkleTreeRoot,
            groupId,
            signal,
            nullifierHash,
            externalNullifier,
            solidityProof
        }

        try {
            const postResponse = await axios.post("/api/postMessage", body, {
                timeout: API_REQUEST_TIMEOUT
            })

            if (postResponse.status === 201) {
                const newAnswer = {
                    parentMessageId: feedbackId,
                    messageId: 0,
                    txHash: postResponse.data.hash,
                    messageContent
                }
                const updatedAnswers = [newAnswer].concat(answers)
                setAnswers(updatedAnswers)

                // Cache answer while tx completes
                window.localStorage.setItem("savedAnswer", JSON.stringify(newAnswer))
            } else if (postResponse.status === 203) {
                alert("Your transaction has failed. Please try submitting again.")

                internalCloseProcessingModal()
            }
        } catch (error) {
            alert("Your transaction has failed. Please try submitting again.")

            internalCloseProcessingModal()
        }

        setSteps([
            { status: "complete", text: "Generated zero knowledge proof" },
            { status: "complete", text: "Submitted transaction with proof and answer" },
            { status: "processing", text: "Updating answers from on-chain events" }
        ])

        setTimeout(internalCloseProcessingModal, 2000)
    }

    const rotateFact = () => {
        setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
    }

    const fetchQuestion = async () => {
        if (feedbackId) {
            setFeedback(allFeedback.find((f) => f.id.toString() === feedbackId))
        }
    }

    useEffect(() => {
        let identityKeyTemp = ""
        if (identityKeyTemp === "") {
            identityKeyTemp = window.localStorage.getItem("identity")
            setIdentityKey(identityKeyTemp)
        }

        // Fetch data for this question (not answers -- those are fetched with infinite scroll)
        fetchQuestion()

        // Set up scroll listening for scroll to top button
        const windowHeight = window.outerHeight
        window.addEventListener("scroll", () => {
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
            behavior: "smooth"
        })
    }

    const fetchItems = useCallback(async () => {
        if (fetching) return

        setFetching(true)

        try {
            const subgraphs = new Subgraphs()
            const items = await subgraphs.getMessages(feedbackId, ITEMS_PER_FETCH, nextFetchSkip)

            // Check local storage for any items cached pending tx finalization
            if (nextFetchSkip === 0) {
                const savedItem = JSON.parse(window.localStorage.getItem("savedAnswer"))
                if (savedItem && savedItem.parentMessageId === feedbackId) {
                    const found = items.some((item) => savedItem && item.messageContent === savedItem.messageContent)
                    if (found) {
                        window.localStorage.removeItem("savedAnswer")
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
            console.error("Error fetching data from subgraph: ", err)
        } finally {
            setFetching(false)
        }
    }, [answers, fetching, nextFetchSkip, feedbackId])

    return (
        <div className="h-full min-h-screen relative overflow-hidden flex flex-col">
            <div className="fixed top-[10%] -left-[30%]">
                <Ellipse color="#EFAD5F" />
            </div>
            <div className="fixed top-[40%] right-[2%]">
                <RedCircle />
            </div>
            <div className="fixed top-[60%] left-[-25%]">
                <BlueCircle />
            </div>

            {feedbackId !== "0" && (
                <div className="fixed bottom-[15%] right-2 z-10 flex justify-end">
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
                <div className="fixed bottom-[15%] left-2 z-10 flex justify-end">
                    <button onClick={goToTop}>
                        <BackToTopArrow />
                    </button>
                </div>
            )}

            <ProcessingModal
                isOpen={processingModalIsOpen}
                closeModal={closeProcessingModal}
                steps={steps}
                fact={fact}
            />
            <AnswerModal
                isOpen={answerModalIsOpen}
                closeModal={closeAnswerModal}
                handleAnswerChange={handleAnswerChange}
                handleSubmit={handleSubmit}
            />
            {/* Begin Answer Board */}
            <div className="flex-grow mx-6 my-8 text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                <Link href="/feedback" className="cursor-pointer brand">
                    <RiArrowLeftLine className="fill-brand-gray50 cursor-pointer mb-4 border-0" />
                </Link>

                {feedback && (
                    <div style={{ borderTopWidth: "0px" }}>
                        <div
                            style={
                                answers.length > 0
                                    ? { borderTopWidth: "0px", borderBottomWidth: "1px", borderColor: "#EAE1DA" }
                                    : { borderTopWidth: "0px", borderBottomWidth: "0px" }
                            }
                        >
                            <p className="px-2 pb-3">{feedback.description}</p>
                            <p className="px-2 text-brand-info text-brand-gray50 font-medium">{feedback.questions}</p>
                        </div>

                        {answers.length === 0 && <hr className="mt-4" />}

                        <InfiniteScroll loadMore={fetchItems} hasMore={hasMoreItems} loader={loader}>
                            {answers.length > 0 ? (
                                answers.map((item) => (
                                    <div
                                        className="flex flex-row align-top border-b-[1px] border-brand-beige last:border-b-0"
                                        key={item.messageId}
                                    >
                                        <div className="flex-col px-2 py-4">
                                            <ConvoBubbles />
                                        </div>

                                        <div className="flex-col py-3 text-xs text-brand-brown">
                                            <p className="px-4 pb-2 text-brand-3xs text-brand-gray50 font-medium">
                                                aID {item.messageId ? item.messageId.toLocaleString() : "0"}
                                            </p>
                                            <p className="px-4 leading-[1.3rem] opacity-[70%]">{item.messageContent}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-2 mt-3">
                                    <p className="text-brand-orange text-brand-info">
                                        No one has answered this question.
                                        <br />
                                        Be the first!
                                    </p>
                                </div>
                            )}
                        </InfiniteScroll>
                    </div>
                )}
            </div>

            <div className="flex w-full relative justify-center bg-black pb-3 pt-9">
                <Footer />
            </div>
        </div>
    )
}
