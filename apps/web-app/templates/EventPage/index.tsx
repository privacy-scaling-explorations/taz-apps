import { useState } from "react"
import { useRouter } from "next/router"
import NextImage from "next/image"
import axios from "axios"
import AddSessionModal from "../../components/AddSessionModal"
import { toast } from "react-toastify"
import QuestionModal from "../../components/QuestionModal"
// import EventDetails from "../../components/EventDetails"

import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO } from "../../types"
import BaseTemplate from "../Base"

type Props = {
    event: EventsDTO
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
    setUpdateEventModal: (b: boolean) => void
}

const EventPage = ({ event, favoritedEvents, participants, setUpdateEventModal }: Props) => {
    const router = useRouter()
    const { parentMessageId } = router.query
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

    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)

    const startDate = new Date(newEvent.startDate).getDay()
    const startWeekDay = new Date(newEvent.startDate).toLocaleDateString("en-US", { weekday: "long" })
    const endDate = new Date(newEvent.endDate).getDay()
    const eventMonth = new Date(newEvent.startDate).toLocaleDateString("en-US", { month: "long" })
    const eventYear = new Date(newEvent.startDate).getUTCFullYear()

    const { parentMessageId } = router.query

    const checkIfUserHaveAttended = participants
        .filter((item) => item.user_id === 1)
        .find((item) => item.event_id === event.id)

    const checkIfUserHadFavorited = favoritedEvents
        .filter((item) => item.user_id === 1)
        .find((item) => item.event_id === event.id)

    const handleClickAttend = async () => {
        if (checkIfUserHaveAttended) {
            await axios
                .post("/api/removeParticipant", {
                    id: checkIfUserHaveAttended.id
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("You are now not attending to this event anymore.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Error", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                })
        } else {
            await axios
                .post("/api/addParticipant", {
                    event_id: event.id,
                    user_id: 1
                })
                .then((res) => {
                    if (res.data === "Participant added") {
                        toast.success("You are now attending to this event.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Error", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                })
        }
    }

    const handleClickFavorite = async () => {
        if (checkIfUserHadFavorited) {
            await axios
                .post("/api/removeFavoriteEvent", {
                    id: checkIfUserHadFavorited.id
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("This event is not anymore favorite.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Error", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                })
        } else {
            await axios
                .post("/api/addFavoriteEvent", {
                    event_id: event.id,
                    user_id: 1
                })
                .then((res) => {
                    if (res.data === "Event favorited") {
                        toast.success("You favorited this event.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Error", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                })
        }
    }

    const renderSessions = () => {
        return event.sessions.map((session: any) => {
            return (
                <div className="w-full">
                    <div className="bg-[#1C2928] w-full flex flex-row items-center rounded-[8px]">
                        <p className="text-white py-[8px] px-[16px]">{session.startTime.slice(0, -3)}</p>
                    </div>

                    <div className="w-full flex flex-col items-start gap-[32px] bg-[#FCFFFE]] rounded-[16px] p-[16px]">
                        <div className="w-full flex flex-row justify-between items-center gap-[67px]]">
                            <div className="flex flex-row items-center gap-[16px]">
                                <h3 className="text-lg text-[#424242] font-[600] text-[24px] border-b border-[#52B5A4]">
                                    {session.name}
                                </h3>
                                <NextImage
                                    className="text-[#91A8A7] cursor-pointer"
                                    src={"/vector-bookmark.svg"}
                                    alt="vector-bookmark"
                                    width={24}
                                    height={24}
                                    onClick={() => handleClickFavorite()}
                                />
                            </div>
                            <button
                                className="bg-[#35655F] text-white py-[4px] px-[16px] text-[16px] rounded-[6px]"
                                onClick={() => handleClickAttend()}
                            >
                                RSVP
                            </button>
                        </div>
                        <div className="w-full flex flex-row gap-[32px] justify-between items-center">
                            <div className="flex flex-row items-start gap-[8px]">
                                {session.organizers.map((item: any) => {
                                    return (
                                        <div className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]">
                                            <NextImage
                                                src={"/user-icon-6.svg"}
                                                alt="user-icon-6"
                                                width={24}
                                                height={24}
                                            />
                                            <p className="text-[#1C2928] font-[400] text-[16px]">
                                                Organizer: <span className="font-[600]">{item}</span>
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex flex-row items-end gap-[32px] text-sm">
                                <div className="flex flex-row items-center gap-[8px]">
                                    <NextImage src={"/vector-clock.svg"} alt="vector-clock" width={16} height={16} />
                                    <p className="text-[#708E8C] text-[18px]">
                                        {session.startTime.slice(0, -3)}-{session.endTime.slice(0, -3)}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-[8px] border-b border-[#708E8C] text-[#708E8C]">
                                    <NextImage src={"/vector-location.svg"} alt="location" width={15} height={15} />
                                    <p className="text-[18px]">{session.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
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
                    <div className="flex flex-row gap-[8px] items-center">
                        <button className="bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]">
                            CONTACT ORGANIZERS
                        </button>
                        <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] gap-[8px] flex flex-row items-center justify-center">
                            <NextImage src={"/ticket.svg"} width={13} height={12} />
                            <p>TICKETS</p>
                        </button>
                        <button
                            className="text-[#F8FFFE] bg-[#35655F] rounded-[8px] flex flex-row justify-center items-center py-[8px] px-[16px] flex flex-row gap-[8px]"
                            onClick={() => setUpdateEventModal(true)}
                        >
                            <NextImage src={"/pencil.svg"} width={13} height={12} />
                            <p>EDIT</p>
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
                <div className="flex flex-col items-center pt-[16px] px-[32px] pb-[40px] bg-white gap-[8px]">
                    <div className="w-full flex flex-row justify-between items-end p-[16px] gap-[24px]">
                        <div className="flex flex-row items-start justify-center gap-[32px]">
                            <h1 className="text-[40px] text-[#37352F] font-[600]">Sessions</h1>
                            <button
                                className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                                onClick={() => setOpenAddSessionModal(true)}
                            >
                                CREATE SESSION
                            </button>
                            <AddSessionModal
                                closeModal={setOpenAddSessionModal}
                                isOpen={openAddSessionModal}
                                eventId={parentMessageId}
                            />
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            <button className="uppercase bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center">
                                <p>{`${startWeekDay},${eventMonth} ${startDate}TH, ${eventYear}`}</p>
                                <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                            </button>
                            <button className="bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center">
                                <p>ALL SESSIONS</p>
                                <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                            </button>
                            <button className="uppercase bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center">
                                <p>{`${startWeekDay},${eventMonth} ${startDate}TH, ${eventYear}`}</p>
                                <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start py-[2px] gap-[16px] rounded-[16px]">
                        {renderSessions()}
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
                /> */}
            </div>
        </BaseTemplate>
    )
}

export default EventPage
