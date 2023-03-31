import { useState } from "react"
import NextImage from "next/image"
import axios from "axios"
import { useRouter } from "next/router"
import Link from "next/link"
import moment from "moment"
import { SessionsDTO } from "../../types"
import BaseTemplate from "../Base"
import DeleteSessionModal from "../../components/DeleteSessionModal"
import EditSessionModal from "../../components/EditSessionModal"
import ParticipateButton from "../../components/ParticipateButton"
import FavoriteButton from "../../components/FavoriteButton"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"

type Props = {
    session: SessionsDTO
    sessions: SessionsDTO[]
    userId: number
}

const SessionPage = ({ session, sessions, userId }: Props) => {
    const router = useRouter()
    const { userInfo, userRole } = useUserAuthenticationContext()
    const { startDate, location, startTime } = session
    const [openDeleteSessionModal, setOpenDeleteSessionModal] = useState(false)
    const [openEditSessionModal, setOpenEditSessionModal] = useState(false)

    const deleteSession = async () => {
        await axios.post("/api/deleteSession", { id: session.id })
        if (session.hasTicket) {
            try {
                await axios.post("/api/pretix-delete-subevent", {
                    slug: session.event_slug,
                    subEventId: session.subevent_id
                })
            } catch (error) {
                console.log(error)
                await axios.post("/api/pretix-deactivate-subevent", {
                    slug: session.event_slug,
                    subEventId: session.subevent_id
                })
                router.push("/")
            }
        }
        router.push("/")
    }

    const closeDeleteSessionModal = (close = false) => {
        if (close) setOpenDeleteSessionModal(false)
    }

    const checkOrganizerOrCreator = userInfo && (session.creator_id === userId || userInfo.role === "organizer")

    return (
        <BaseTemplate>
            <div className="flex flex-col items-center bg-[#EEEEF0] h-full md:h-[100vh] px-4 md:px-[24px] py-4 md:py-[24px] gap-4 md:gap-[16px]">
                <div className="flex flex-col md:flex-row justify-between p-5 bg-white w-full rounded-[16px]">
                    <div className="flex md:w-3/6 w-full items-center gap-2 mb-4 md:mb-0 text-[12px] md:text-[14px]">
                        <Link href={"/"}>
                            <a className={`text-[#1C292899]`}>Program</a>
                        </Link>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <Link href={router.asPath.split("/").slice(0, 3).join("/")}>
                            <a className={`text-[#1C292899]`}>{session.events.name}</a>
                        </Link>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <h1 className={`text-black font-[600]`}>{session.name}</h1>
                    </div>

                    <div className="flex justify-end flex-col md:flex-row gap-[8px] items-center w-full">
                        <FavoriteButton session={session} isMiniButton={false} />
                        <ParticipateButton session={session} isTallButton={true} />

                        {checkOrganizerOrCreator && (
                            <button
                                className={`flex w-full md:w-auto justify-center gap-2 items-center bg-zulalu-primary border border-primary text-white font-[600] py-[8px] px-[16px] rounded-[8px]`}
                                onClick={() => setOpenEditSessionModal(true)}
                            >
                                <NextImage src={"/pencil.svg"} width={12} height={16} />
                                EDIT SESSION
                            </button>
                        )}
                        <EditSessionModal
                            isOpen={openEditSessionModal}
                            closeModal={setOpenEditSessionModal}
                            session={session}
                            sessions={sessions}
                        />
                        {checkOrganizerOrCreator && (
                            <button
                                className={`flex w-full md:w-auto justify-center gap-2 items-center bg-zulalu-primary border border-primary text-white font-[600] py-[8px] px-[16px] rounded-[8px]`}
                                onClick={() => setOpenDeleteSessionModal(true)}
                            >
                                DELETE SESSION
                            </button>
                        )}
                        <DeleteSessionModal
                            isOpen={openDeleteSessionModal}
                            closeModal={closeDeleteSessionModal}
                            deleteSession={deleteSession}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-0 md:gap-[8px] h-full">
                    <div className="flex flex-col items-start pt-4 md:pt-[32px] gap-2 px-4 md:px-[32px] pb-4 md:pb-[40px] bg-white rounded-0 md:rounded-[8px] rounded-t-[16px] md:rounded-t-0 w-full md:w-4/6">
                        <div className="flex flex-row items-end">
                            <p className="text-[30px] md:text-[40px] font-semibold">{session.name}</p>
                        </div>
                        <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-0 md:gap-[24px]">
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">
                                    {startDate && moment.utc(startDate).isValid()
                                        ? moment.utc(startDate).format("dddd, MMMM Do")
                                        : "\u00A0"}
                                </h1>
                            </div>
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <NextImage src={"/vector-clock.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{`${startTime}`}</h1>
                            </div>
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <NextImage src={"/vector-location.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{location}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-[24px] w-full mt-4">
                            <div className="w-full md:w-5/6 py-5">{session.description}</div>
                            <div className="flex flex-wrap gap-5 w-full lg:w-3/6 p-0 lg:p-5">
                                {session.team_members.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex w-auto rounded-[4px] gap-2 px-2 py-1 bg-[#E4EAEA] text-[16px]"
                                    >
                                        {item.role === "Speaker" && (
                                            <NextImage
                                                src={"/user-icon-6.svg"}
                                                alt="user-icon-6"
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        {item.role === "Organizer" && (
                                            <NextImage
                                                src={"/user-icon-4.svg"}
                                                alt="user-icon-6"
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        {item.role === "Facilitator" && (
                                            <NextImage
                                                src={"/user-icon-5.svg"}
                                                alt="user-icon-6"
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        <p>{item.role}:</p>
                                        <p className="font-bold">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex bg-white md:bg-transparent rounded-b-[16px] flex-col gap-5 py-4 md:py-[32px] px-5 w-full md:w-2/6">
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="text-xl font-semibold">Tags</h4>
                            <div className="flex md:flex-wrap gap-2 md:gap-5">
                                {session.tags &&
                                    session.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="bg-black text-white capitalize rounded-[37px] px-[16px] flex flex-row items-center justify-center"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <h4 className="text-xl font-semibold">About</h4>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-1">
                                    Format: <p className="font-bold">{session.format}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    Type: <p className="font-bold">{session.event_type}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    Level: <p className="font-bold">{session.level}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default SessionPage
