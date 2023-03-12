import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { ethers } from "ethers"
import Link from "next/link"
import InfiniteScroll from "react-infinite-scroller"
import { RiArrowLeftLine } from "react-icons/ri"

import { useGenerateProof } from "../../hooks/useGenerateProof"
import { Subgraphs } from "../../helpers/subgraphs"
import AnswerModal from "../../components/AnswerModal"
import ProcessingModal from "../../components/ProcessingModal"
import Footer from "../../components/Footer"
import BlueCircle from "../../components/svgElements/BlueCircle"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import BackToTopArrow from "../../components/svgElements/BackToTopArrow"
import ConvoBubbles from "../../components/svgElements/ConvoBubbles"
import Loading from "../../components/Loading"
import QuestionModal from "../../components/QuestionModal"

const {
    API_REQUEST_TIMEOUT,
    FACT_ROTATION_INTERVAL,
    CHAINED_MODAL_DELAY,
    ITEMS_PER_FETCH
} = require("../../config/goerli.json")
const { FACTS } = require("../../data/facts.json")

export default function Answers() {
    const [generateFullProof] = useGenerateProof()
    const [answerModalIsOpen, setAnswerModalIsOpen] = useState(false)
    const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
    const [question, setQuestion] = useState(null)
    const [answer, setAnswer] = useState()
    const [identityKey, setIdentityKey] = useState("")
    const [answers, setAnswers] = useState([])
    const [steps, setSteps] = useState([])
    const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
    const [showTopBtn, setShowTopBtn] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [nextFetchSkip, setNextFetchSkip] = useState(0)

    const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false)

    const [newEvent, setNewEvent] = useState({
        name: "",
        organizers: [],
        startDate: new Date(),
        endDate: new Date(),
        startTime: "09:00",
        endTime: "18:00",
        location: "",
        tags: [],
        info: ""
    })

    const closeQuestionModal = () => {
        setQuestionModalIsOpen(false)
    }

    const openQuestionModal = () => {
        setQuestionModalIsOpen(true)
    }

    const addTag = (tag) => {
        newEvent.tags.push(tag)
        console.log("TAGS AFTER ADD", newEvent.tags)
    }

    const removeTag = (tag) => {
        const index = newEvent.tags.indexOf(tag)
        newEvent.tags.splice(index, 1)
        console.log("Tags after remove", newEvent.tags)
    }

    const addOrganizer = (organizer) => {
        console.log("Organizer", organizer)
        newEvent.organizers.push(organizer)
        console.log("Organizerss after add", newEvent.organizers)
    }

    const removeOrganizer = (organizer) => {
        const index = newEvent.organizers.indexOf(organizer)
        newEvent.organizers.splice(index, 1)
        console.log("Organizers after remove", newEvent.organizers)
    }

    const [event, setEvent] = useState()

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

    const handleUpdateEvent = async (event) => {
        event.preventDefault()

        closeQuestionModal()
        const body = {
            name: newEvent.name,
            startDate: newEvent.startDate,
            endDate: newEvent.endDate,
            organizers: newEvent.organizers,
            location: newEvent.location,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            tags: newEvent.tags,
            info: newEvent.info,
            id: parentMessageId
        }

        try {
            await axios.post("/api/updateEvent", body)
        } catch (error) {
            alert("Event submission faild")
            internalCloseProcessingModal()
        }
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()

    //     closeAnswerModal()
    //     setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

    //     setSteps([
    //         { status: "processing", text: "Generating zero knowledge proof" },
    //         { status: "queued", text: "Submit transaction with proof and answer" },
    //         { status: "queued", text: "Update answers from on-chain events" }
    //     ])

    //     const messageContent = answer
    //     const signal = ethers.utils.id(messageContent).slice(35)
    //     const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProof(
    //         identityKey,
    //         signal
    //     )

    //     setSteps([
    //         { status: "complete", text: "Generated zero knowledge proof" },
    //         { status: "processing", text: "Submitting transaction with proof and answer" },
    //         { status: "queued", text: "Update answers from on-chain events" }
    //     ])

    //     const body = {
    //         parentMessageId,
    //         messageContent,
    //         merkleTreeRoot,
    //         groupId,
    //         signal,
    //         nullifierHash,
    //         externalNullifier,
    //         solidityProof
    //     }
    //     console.log("ANSWERS PAGE | body", body)
    //     try {
    //         const postResponse = await axios.post("/api/postMessage", body, {
    //             timeout: API_REQUEST_TIMEOUT
    //         })
    //         if (postResponse.status === 201) {
    //             const newAnswer = {
    //                 parentMessageId,
    //                 messageId: 0,
    //                 txHash: postResponse.data.hash,
    //                 messageContent
    //             }
    //             const updatedAnswers = [newAnswer].concat(answers)
    //             setAnswers(updatedAnswers)

    //             console.log("ANSWERS PAGE | updatedAnswers", updatedAnswers)
    //             console.log("ANSWERS PAGE | answers", answers)
    //             console.log("ANSWERS PAGE | postResponse.status", postResponse.status)
    //             console.log("ANSWERS PAGE | postResponse.data.hash", postResponse.data.hash)

    //             // Cache answer while tx completes
    //             window.localStorage.setItem("savedAnswer", JSON.stringify(newAnswer))
    //         } else if (postResponse.status === 203) {
    //             alert("Your transaction has failed. Please try submitting again.")
    //             internalCloseProcessingModal()
    //         }
    //     } catch (error) {
    //         alert("Your transaction has failed. Please try submitting again.")
    //         internalCloseProcessingModal()
    //     }

    //     setSteps([
    //         { status: "complete", text: "Generated zero knowledge proof" },
    //         { status: "complete", text: "Submitted transaction with proof and answer" },
    //         { status: "processing", text: "Updating answers from on-chain events" }
    //     ])

    //     setTimeout(internalCloseProcessingModal, 2000)
    // }

    // const rotateFact = () => {
    //     setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
    // }

    // const fetchQuestion = async () => {
    //     if (parentMessageId) {
    //         const subgraphs = new Subgraphs()
    //         const questionItem = await subgraphs.getMessage(parentMessageId)
    //         setQuestion(questionItem)
    //     }
    // }

    // useEffect(() => {
    //     let identityKeyTemp = ""
    //     if (identityKeyTemp === "") {
    //         identityKeyTemp = window.localStorage.getItem("identity")
    //         setIdentityKey(identityKeyTemp)
    //     }

    //     // Fetch data for this question (not answers -- those are fetched with infinite scroll)
    //     fetchQuestion()

    //     // Set up scroll listening for scroll to top button
    //     const windowHeight = window.outerHeight
    //     window.addEventListener("scroll", () => {
    //         if (window.scrollY > windowHeight) {
    //             setShowTopBtn(true)
    //         } else {
    //             setShowTopBtn(false)
    //         }
    //     })
    // }, [])

    const fetchEventId = async () => {
        try {
            const res = await axios.get(`/api/fetchEvents/${parentMessageId}`)
            setEvent(res.data)
            setNewEvent({
                endDate: new Date(res.data.endDate),
                endTime: res.data.endTime,
                info: res.data.info,
                location: res.data.location,
                name: res.data.name,
                organizers: res.data.organizers,
                startDate: new Date(res.data.startDate),
                startTime: res.data.startTime,
                tags: res.data.tags
            })
        } catch (error) {
            console.log("fetching events failed", error)
        }
    }
    useEffect(() => {
        if (parentMessageId) {
            fetchEventId()
        }
    }, [parentMessageId])

    // useEffect(() => {
    //     setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
    // }, [fact])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    // const fetchItems = useCallback(async () => {
    //     if (fetching) return

    //     setFetching(true)

    //     try {
    //         const subgraphs = new Subgraphs()
    //         const items = await subgraphs.getMessages(parentMessageId, ITEMS_PER_FETCH, nextFetchSkip)

    //         // Check local storage for any items cached pending tx finalization
    //         if (nextFetchSkip === 0) {
    //             const savedItem = JSON.parse(window.localStorage.getItem("savedAnswer"))
    //             if (savedItem && savedItem.parentMessageId === parentMessageId) {
    //                 const found = items.some((item) => savedItem && item.messageContent === savedItem.messageContent)
    //                 if (found) {
    //                     window.localStorage.removeItem("savedAnswer")
    //                 } else {
    //                     items.unshift(savedItem)
    //                 }
    //             }
    //         }

    //         setAnswers(answers.concat(items))

    //         if (items.length === ITEMS_PER_FETCH) {
    //             setNextFetchSkip(nextFetchSkip + items.length)
    //         } else {
    //             setNextFetchSkip(-1) // -1 indicates fetching is complete
    //         }

    //         // console.log('QUESTIONS PAGE | fetched questions', items)
    //     } catch (err) {
    //         setNextFetchSkip(-1)
    //         console.error("Error fetching data from subgraph: ", err)
    //     } finally {
    //         setFetching(false)
    //     }
    // }, [answers, fetching, nextFetchSkip, parentMessageId])

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

            {/* {parentMessageId !== "0" && (
                <div className="fixed bottom-[15%] right-2 z-10 flex justify-end">
                    <button
                        type="button"
                        className="rounded-full bg-brand-yellow ring-2 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                        onClick={openAnswerModal}
                    >
                        Answer this question
                    </button>
                </div>
            )} */}
            {showTopBtn && (
                <div className="fixed bottom-[15%] left-2 z-10 flex justify-end">
                    <button onClick={goToTop}>
                        <BackToTopArrow />
                    </button>
                </div>
            )}

            <QuestionModal
                isOpen={questionModalIsOpen}
                closeModal={closeQuestionModal}
                setNewEvent={setNewEvent}
                newEvent={newEvent}
                handleSubmit={handleUpdateEvent}
                addTag={addTag}
                removeTag={removeTag}
                addOrganizer={addOrganizer}
                removeOrganizer={removeOrganizer}
                isUpdateEvent={true}
            />

            <ProcessingModal
                isOpen={processingModalIsOpen}
                closeModal={closeProcessingModal}
                steps={steps}
                fact={fact}
            />
            {/* <AnswerModal
                isOpen={answerModalIsOpen}
                closeModal={closeAnswerModal}
                handleAnswerChange={handleAnswerChange}
                handleSubmit={handleSubmit}
            /> */}
            {/* Begin Answer Board */}
            <div className="flex-grow mx-6 my-8 text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                <div onClick={()=>router.back()}>
                    <RiArrowLeftLine className="fill-brand-gray50 cursor-pointer mb-4 border-0" />
                </div>

                {parentMessageId === "0" && txHash ? (
                    <div className="p-4">
                        <p className="text-brand-red pb-4">Question is still being processed.</p>
                        <p className="text-sm">
                            You can check your transaction on{" "}
                            <a className="py-2 underline" href={`https://goerli.etherscan.io/tx/${txHash}`}>
                                Etherscan
                            </a>
                            .
                        </p>
                    </div>
                ) : (
                    event && (
                        <div className="border border-black relative">
                            <div
                                className="absolute top-5 left-5 rounded-full bg-brand-yellow ring-2 ring-brand-black px-5"
                                onClick={openQuestionModal}
                            >
                                <h1>Edit Event</h1>
                            </div>
                            <div className="border border-brand-blue rounded-md p-4 text-center">
                                <h1 className="text-4xl font-bold">{event.name}</h1>
                                <div className="flex flex-col w-full justify-center my-5">
                                    <h1>{`${event.startDate} -> ${event.endDate} , ${event.startTime}`}</h1>
                                    <h1>{event.location}</h1>
                                </div>
                                <div className="flex w-full justify-center gap-2 mb-2">
                                    <h1 className="font-bold">Organizers:</h1>
                                    {event.organizers.map((item, index) => (
                                        <h1 key={index} className="bg-green-200 p-1 rounded-md text-sm uppercase">
                                            {item}
                                        </h1>
                                    ))}
                                </div>

                                <div className="flex w-full justify-center gap-2 mb-2">
                                    <h1>Tags:</h1>
                                    {event.tags.map((item, index) => (
                                        <h1 key={index} className="bg-green-200 p-1 rounded-md text-sm uppercase">
                                            {item}
                                        </h1>
                                    ))}
                                </div>

                                <div className="flex w-full justify-center gap-2 mb-5">
                                    <h1>Additional Information:</h1>
                                    <h1>{event.info}</h1>
                                </div>

                                <div className="w-full flex justify-center gap-5 my-5">
                                    <button
                                        type="button"
                                        className="rounded-full bg-brand-yellow ring-2 ring-brand-black px-4 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                                    >
                                        Attend
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full bg-brand-yellow ring-2 ring-brand-black py-1 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                                    >
                                        Favorite
                                    </button>
                                </div>
                                <p className="px-2 pb-4">Comments Below </p>
                            </div>
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
