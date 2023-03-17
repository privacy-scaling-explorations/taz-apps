/* eslint-disable @typescript-eslint/no-unused-vars */
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import Footer from "../../components/Footer"
import BlueCircle from "../../components/svgElements/BlueCircle"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import QuestionModal from "../../components/QuestionModal"
import EventDetails from "../../components/EventDetails"
import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO } from "../../types"

type Props = {
    event: EventsDTO
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
}

export default function Event({ event, participants, favoritedEvents }: Props) {
    const router = useRouter()
    const { parentMessageId } = router.query
    const [updateEventModal, setUpdateEventModal] = useState(false)
    const [newEvent, setNewEvent] = useState<EventsDTO>({
        created_at: event.created_at,
        endDate: new Date(event.endDate),
        endTime: event.endTime,
        id: event.id,
        info: event.info,
        location: event.location,
        name: event.name,
        organizers: event.organizers,
        startDate: new Date(event.startDate),
        startTime: event.startTime,
        tags: event.tags,
        publicUrl: event.publicUrl,
        slug: event.slug
    })

    const addTag = (tag: string) => {
        newEvent.tags.push(tag)
        console.log("TAGS AFTER ADD", newEvent.tags)
    }

    const removeTag = (tag: string) => {
        const index = newEvent.tags.indexOf(tag)
        newEvent.tags.splice(index, 1)
        console.log("Tags after remove", newEvent.tags)
    }

    const addOrganizer = (organizer: string) => {
        console.log("Organizer", organizer)
        newEvent.organizers.push(organizer)
        console.log("Organizerss after add", newEvent.organizers)
    }

    const removeOrganizer = (idx: number) => {
        newEvent.organizers.splice(idx, 1)
        console.log("Organizers after remove", newEvent.organizers)
    }

    const handleUpdateEvent = async (e: any) => {
        e.preventDefault()

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

        const pretixBody = {
            name: { en: newEvent.name },
            date_from: newEvent.startDate,
            date_to: newEvent.endDate
        }

        try {
            // not working
            // await axios.post(`/api/pretix-update-event/${newEvent.slug}`, {
            //     data: pretixBody
            // })

            await axios.post("/api/updateEvent", body).then((_res) => {
                setUpdateEventModal(false)
            })

            router.push(router.asPath)

            toast.success("Event Updated", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } catch (error) {
            toast.error("Update Failed", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
    }

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

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <QuestionModal
                isOpen={updateEventModal}
                closeModal={setUpdateEventModal}
                setNewEvent={setNewEvent}
                newEvent={newEvent}
                handleSubmit={handleUpdateEvent}
                addTag={addTag}
                removeTag={removeTag}
                addOrganizer={addOrganizer}
                removeOrganizer={removeOrganizer}
                isUpdateEvent={true}
            />

            <EventDetails
                event={event}
                participants={participants}
                favoritedEvents={favoritedEvents}
                setUpdateEventModal={setUpdateEventModal}
            />
            <div className="flex w-full relative justify-center bg-black pb-3 pt-9">
                <Footer />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const response = await fetch(`${url}/api/fetchEvents/${query.parentMessageId}`)
        const participantsResponse = await fetch(`${url}/api/fetchParticipants`)
        const favoritedEventsResponse = await fetch(`${url}/api/fetchFavoritedEvents`)
        const event = await response.json()
        const participants = await participantsResponse.json()
        const favoritedEvents = await favoritedEventsResponse.json()

        return {
            props: { event, participants, favoritedEvents }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
