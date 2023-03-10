import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { ethers } from "ethers"
import Link from "next/link"
import InfiniteScroll from "react-infinite-scroller"
import QuestionModal from "../../components/QuestionModal"
import { useGenerateProof } from "../../hooks/useGenerateProof"
import ProcessingModal from "../../components/ProcessingModal"
import { Subgraphs } from "../../helpers/subgraphs"
import BackToTopArrow from "../../components/svgElements/BackToTopArrow"
import YellowCircle from "../../components/svgElements/YellowCircle"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import SelectorArrow from "../../components/ArrowNavigators/SelectorArrow"
import BackTAZ from "../../components/ArrowNavigators/BackTAZ"
import Footer from "../../components/Footer"
import Loading from "../../components/Loading"

const {
    API_REQUEST_TIMEOUT,
    FACT_ROTATION_INTERVAL,
    CHAINED_MODAL_DELAY,
    ITEMS_PER_FETCH
} = require("../../config/goerli.json")
const { FACTS } = require("../../data/facts.json")

export default function Questions() {
    const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false)
    const [processingModalIsOpen, setProcessingModalIsOpen] = useState(false)
    const [steps, setSteps] = useState([])
    const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
    const [showTopBtn, setShowTopBtn] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [nextFetchSkip, setNextFetchSkip] = useState(0)
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
    const [questions, setQuestions] = useState([])
    const [test, setTest] = useState(true)
    const hasMoreItems = nextFetchSkip > -1
    const loader = (
        <div className="p-12 flex justify-center">
            <Loading size="xl" />
        </div>
    )

    const addTag = (tag) => {
        console.log("TAG", tag)
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

    const handleEventChange = (event) => {
        setNewEvent(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        closeQuestionModal()
        setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

        //body will be event data
        const body = {
            name: newEvent.name,
            startDate: newEvent.startDate,
            endDate: newEvent.endDate,
            organizers: newEvent.organizers,
            location: newEvent.location,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            tags: newEvent.tags,
            info: newEvent.info
        }

        //send event to database
        try {
            await axios.post("/api/createEvent", body)
        } catch (error) {
            alert("Event submission faild")
            internalCloseProcessingModal()
        }

        setSteps([
            { status: "complete", text: "Generated zero knowledge proof" },
            { status: "complete", text: "Submitted transaction with proof and question" },
            { status: "processing", text: "Updating questions from on-chain events" }
        ])

        setTimeout(internalCloseProcessingModal, 2000)
        setNewEvent({
            name: "",
            organizers: [],
            startDate: new Date(),
            endDate: new Date(),
            startTime: "9:00",
            endTime: "9:00",
            location: "",
            tags: [],
            info: ""
        })
    }

    const rotateFact = () => {
        setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
    }

    useEffect(() => {
        // Set up scroll listening for scroll to top button
        console.log("new event", newEvent)
        const windowHeight = window.outerHeight
        window.addEventListener("scroll", () => {
            if (window.scrollY > windowHeight) {
                setShowTopBtn(true)
            } else {
                setShowTopBtn(false)
            }
        })
    }, [])

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
            const items = await subgraphs.getMessages(0, ITEMS_PER_FETCH, nextFetchSkip)

            // Check local storage for any items cached pending tx finalization
            if (nextFetchSkip === 0) {
                const savedItem = JSON.parse(window.localStorage.getItem("savedQuestion"))
                if (savedItem) {
                    const found = items.some((item) => savedItem && item.messageContent === savedItem.messageContent)
                    if (found) {
                        window.localStorage.removeItem("savedQuestion")
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
            console.error("Error fetching data from subgraph: ", err)
        } finally {
            setFetching(false)
        }
    }, [questions, fetching, nextFetchSkip])

    return (
        <div className="min-h-[700px] relative overflow-hidden h-auto flex flex-col">
            <div className="fixed top-[25%] -left-[14%]">
                <YellowCircle />
            </div>
            <div className="fixed top-[62%] right-[-35%]">
                <Ellipse color="#435C6C" />
            </div>
            <div className="fixed top-[70%] left-[2%]">
                <RedCircle />
            </div>

            <div className="fixed bottom-[15%] right-2 z-20 flex justify-end">
                <button
                    type="button"
                    className="rounded-full bg-brand-yellow ring-2 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                    onClick={openQuestionModal}
                >
                    Add an event
                </button>
            </div>
            {showTopBtn && (
                <div className="fixed bottom-[15%] left-2 z-20 flex justify-end">
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
                test={test}
            />

            <QuestionModal
                isOpen={questionModalIsOpen}
                test={test}
                closeModal={closeQuestionModal}
                setNewEvent={setNewEvent}
                newEvent={newEvent}
                handleSubmit={handleSubmit}
                addTag={addTag}
                removeTag={removeTag}
                addOrganizer={addOrganizer}
                removeOrganizer={removeOrganizer}
            />

            {/* Begin Questions Board */}

            <div className="z-10 ">
                <Link href="/experiences-page">
                    <div className="flex max-w-[76px] max-h-[32px] bg-black ml-8 mt-8 mb-7 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
                        <BackTAZ />
                        <h1>TAZ</h1>
                    </div>
                </Link>
                <div className="px-6 pb-4">
                    <div className="flex flex-col w-full pt-5 pb-2">
                        <h2 className="ml-2 text-2xl leading-5 font-extrabold">Check events</h2>
                        <h2 className="ml-2 text-2xl font-extrabold">Create events</h2>
                    </div>
                    <p className="ml-2 text-brand-info text-brand-blue">Check on going events (Sample text)</p>
                    <p className="ml-2 text-brand-info text-brand-blue">TODO: Add Filter mechanism</p>
                </div>
            </div>

            <div className="z-10 px-6 pb-8">
                <div className="min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
                    TODO: For each element, add more data about event (data, location, organized by, event type?)
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
                                    <p className="text-brand-brown opacity-[85%] text-sm leading-5 w-[100%]">
                                        {item.messageContent}
                                    </p>
                                    <SelectorArrow />
                                </div>
                            </Link>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>

            <div className="flex w-full relative justify-center bg-black pb-3 pt-9">
                <Footer />
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
