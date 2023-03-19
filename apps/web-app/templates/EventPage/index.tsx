import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Footer from "../../components/Footer"
import BlueCircle from "../../components/svgElements/BlueCircle"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import QuestionModal from "../../components/QuestionModal"
import EventDetails from "../../components/EventDetails"

import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO } from "../../types"
import BaseTemplate from "../Base"

type Props = {
    event: EventsDTO
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
}

const EventPage = ({ event, favoritedEvents, participants }: Props) => {
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

    const startDate = new Date(newEvent.startDate).getDay()
    const endDate = new Date(newEvent.endDate).getDay()
    const eventMonth = new Date(newEvent.startDate).toLocaleDateString("en-US", { month: "long" })
    const eventYear = new Date(newEvent.startDate).getUTCFullYear()

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

            // toast.success("Event Updated", {
            //     position: "top-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light"
            // })
        } catch (error) {
            // toast.error("Update Failed", {
            //     position: "top-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light"
            // })
        }
    }
    return (
        <BaseTemplate>
            <div className="flex flex-col border border-black p-5 bg-gray-200 gap-5 w-full h-full">
                <div className="flex justify-between p-5 bg-white rounded-[8px]">
                    <div className="flex items-center gap-2">
                        <h1 className={`text-zinc-400`}>Program</h1>
                        <h1>/</h1>
                        <h1 className={`text-black`}>ZK Week</h1>
                    </div>
                    <div className="flex gap-5">
                        <button className="bg-white border border-primary text-zulalu-primary py-[8px] px-[16px] rounded-[8px]">
                            CONTACT ORGANIZERS
                        </button>
                        <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]">
                            TICKETS
                        </button>
                    </div>
                </div>
                <div className="flex w-full bg-white rounded-[8px] p-5 min-h-[600px] h-full">
                    <div className="flex h-full border border-black w-5/6">
                        <h1>image</h1>
                    </div>
                    <div className="flex flex-col border border-black w-3/6 justify-between">
                        <div className="flex my-5 w-full">
                            <h1 className="text-black text-[52px]">{event.name}</h1>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <h1 className="text-zulalu-secondary">{`${eventMonth} ${startDate}-${endDate}, ${eventYear}`}</h1>
                            <h1>
                                Join us for presentations, workshops, and roundtables to discuss beginner ZK, ZK for
                                biohackers, new proving systems and more.
                            </h1>
                        </div>
                        <div className="border border-black flex flex-col mt-10 gap-5">
                            <h1 className="text-black text-[24px]">Speakers</h1>
                            <div className="flex flex-wrap">
                                <div className="bg-gray-200 rounded-[4px] p-1">
                                    <h1>Lovely Person</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full bg-white rounded-[8px] p-5 h-full">
                    <div className="border border-black flex justify-between w-full">
                        <div className="border border-black flex justify-center items-center gap-5">
                            <h1 className="text-[40px]">Sessions</h1>
                            <button className="bg-zulalu-primary h-[40px] text-white py-[8px] px-[16px] rounded-[8px]">
                                TICKETS
                            </button>
                        </div>
                        <div className="border border-black flex justify-center items-center gap-5">
                            <button className="bg-white border border-primary text-zulalu-primary py-[8px] px-[16px] rounded-[8px]">
                                TICKETS
                            </button>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer
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
                /> */}
            </div>
        </BaseTemplate>
    )
}

export default EventPage
