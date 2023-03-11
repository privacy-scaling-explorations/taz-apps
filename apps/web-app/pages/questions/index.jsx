import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import QuestionModal from "../../components/QuestionModal"
import BackToTopArrow from "../../components/svgElements/BackToTopArrow"
import YellowCircle from "../../components/svgElements/YellowCircle"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import BackTAZ from "../../components/ArrowNavigators/BackTAZ"
import Footer from "../../components/Footer"
import Calendar from "../../components/Calendar"

export default function Questions() {
    const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false)
    const [showTopBtn, setShowTopBtn] = useState(false)
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
    const [events, setEvents] = useState([])

    const fetchEvents = async () => {
        try {
            const response = await axios.get("/api/fetchEvents")
            setEvents(response.data)
        } catch (error) {
            console.log("fetching events failed", error)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

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

    const closeQuestionModal = () => {
        setQuestionModalIsOpen(false)
    }

    const openQuestionModal = () => {
        setQuestionModalIsOpen(true)
    }

    const handleSubmit = async (event) => {
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
            info: newEvent.info
        }

        try {
            await axios.post("/api/createEvent", body)
        } catch (error) {
            alert("Event submission faild")
            internalCloseProcessingModal()
        }

        setNewEvent({
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
    }

    useEffect(() => {
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

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

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

            <QuestionModal
                isOpen={questionModalIsOpen}
                closeModal={closeQuestionModal}
                setNewEvent={setNewEvent}
                newEvent={newEvent}
                handleSubmit={handleSubmit}
                addTag={addTag}
                removeTag={removeTag}
                addOrganizer={addOrganizer}
                removeOrganizer={removeOrganizer}
            />

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
                        {/* <h2 className="ml-2 text-2xl font-extrabold">Create events</h2> */}
                    </div>
                    <p className="ml-2 text-brand-info text-brand-blue">Check on going events (Sample text)</p>
                    {/* <p className="ml-2 text-brand-info text-brand-blue">TODO: Add Filter mechanism</p> */}
                </div>
            </div>

            <div className="z-10 px-6 pb-8">
                <div className="min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
                    <Calendar events={events} />
                </div>
            </div>

            <div className="flex w-full relative justify-center bg-black pb-3 pt-9">
                <Footer />
            </div>

            {/* End Questions Board */}
        </div>
    )
}
