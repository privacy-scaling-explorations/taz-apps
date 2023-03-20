import { useState } from "react"
import { useRouter } from "next/router"
import NextImage from "next/image"
import AddSessionModal from "../../components/AddSessionModal"
import Sessions from "../../components/Sessions"
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

    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)
    const [updateEventModal, setUpdateEventModal] = useState(false)

    const startDate = new Date(event.startDate).getDay()
    const startWeekDay = new Date(event.startDate).toLocaleDateString("en-US", { weekday: "long" })
    const endDate = new Date(event.endDate).getDay()
    const eventMonth = new Date(event.startDate).toLocaleDateString("en-US", { month: "long" })
    const eventYear = new Date(event.startDate).getUTCFullYear()

    const checkIfUserHaveAttended = participants
        .filter((item) => item.user_id === 1)
        .find((item) => item.event_id === event.id)

    const checkIfUserHadFavorited = favoritedEvents
        .filter((item) => item.user_id === 1)
        .find((item) => item.event_id === event.id)

    return (
        <BaseTemplate>
            <div className="flex flex-col border border-black p-5 bg-[#EEEEF0] gap-5 w-full h-full">
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
                    <div className="flex h-full w-full rounded-[8px]">
                        <NextImage
                            src="/event-image.png"
                            objectFit="cover"
                            alt="event-image"
                            width="1014px"
                            height="682px"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center pt-[16px] px-[32px] pb-[40px] bg-white gap-[8px] rounded-[8px]">
                    <div className="w-full flex flex-row justify-between items-center p-[16px] gap-[24px]">
                        <div className="flex flex-row items-center justify-center gap-[32px]">
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
                                eventId={parentMessageId as string}
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
                    <Sessions
                        event={event}
                        checkIfUserHaveAttended={checkIfUserHaveAttended}
                        checkIfUserHadFavorited={checkIfUserHadFavorited}
                    />
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
