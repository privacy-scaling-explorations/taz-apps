import { useState } from "react"
import { useRouter } from "next/router"
import NextImage from "next/image"
import axios from "axios"
// import QuestionModal from "../../components/QuestionModal"
// import EventDetails from "../../components/EventDetails"

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
    const startWeekDay = new Date(newEvent.startDate).toLocaleDateString("en-US", { weekday: "long" })
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
                        <h1 className={`text-[#1C292899]`}>Program</h1>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <h1 className={`text-black font-[600]`}>ZK Week</h1>
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
                <div className="flex w-full justify-start bg-white rounded-[8px] h-[682px]">
                    <div className="flex h-full max-w-[1014px] w-full">
                        <NextImage
                            src="/event-image.png"
                            objectFit="cover"
                            alt="event-image"
                            width="1014px"
                            height="682px"
                        />
                    </div>
                    <div className="flex flex-col w-2/6 pl-5 pr-20">
                        <div className="flex my-5 w-full">
                            <h1 className="text-black text-[52px] font-[600]">{event.name}</h1>
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex gap-1 items-center justify-start">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{`${eventMonth} ${startDate}-${endDate}, ${eventYear}`}</h1>
                            </div>
                            <h1>
                                Join us for presentations, workshops, and roundtables to discuss beginner ZK, ZK for
                                biohackers, new proving systems and more.
                            </h1>
                        </div>
                        <div className="flex flex-col mt-10 gap-5">
                            <h1 className="text-black text-[24px]">Speakers</h1>
                            <div className="flex flex-wrap">
                                {event.organizers.map((organizer, idx) => (
                                    <div className="flex gap-2 bg-gray-200 rounded-[4px] px-3 py-1" key={idx}>
                                        <img src="/user-icon-4.svg" className="w-[24px] h-[24px]" />
                                        <h1 className="capitalize">{organizer}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full bg-white rounded-[8px] p-5 h-full">
                    <div className="flex justify-between w-full">
                        <div className="flex justify-center items-center gap-5">
                            <h1 className="text-[40px]">Sessions</h1>
                            <button className="bg-zulalu-primary h-[40px] text-white py-[8px] px-[16px] rounded-[8px]">
                                CREATE SESSION
                            </button>
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            <button className="bg-white border border-primary text-zulalu-primary py-[8px] px-[16px] text-[16px] rounded-[8px]">
                                {`${startWeekDay},${eventMonth} ${startDate}TH, ${eventYear}`}
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
