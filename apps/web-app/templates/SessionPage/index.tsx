import { useState } from "react"
import NextImage from "next/image"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { SessionsDTO, EventsDTO } from "../../types"
import BaseTemplate from "../Base"
import ParticipateButton from "../../components/ParticipateButton"


type Props = {
    session: SessionsDTO
    event: EventsDTO
}

const SessionPage = ({ session, event }: Props) => {
    const router = useRouter()
    const LOGGED_IN_USER_ID = 1
    console.log(session)
    const is_favorited = session.favorited_sessions.some(favorited => favorited.user_id === LOGGED_IN_USER_ID && favorited.session_id === session.id);

    const { startDate, endTime, location, startTime } = session

    const startDateFormatted = new Date(startDate).toLocaleDateString("en-US", { day: "numeric" })
    const startWeekDayFormatted = new Date(startDate).toLocaleDateString("en-US", { weekday: "long" })
    const eventMonthFormatted = new Date(startDate).toLocaleDateString("en-US", { month: "long" })


    const makeToast = (isSuccess: boolean, message: string) => {
        if (isSuccess) {
            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error(message, {
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


    const handleAddFavorite = async (sessionId: number) => {
        await axios
            .post("/api/addFavoriteSession", {
                session_id: sessionId,
                user_id: LOGGED_IN_USER_ID
            })
            .then((res) => {
                if (res.data === "Session favorited") {
                    makeToast(true, "This session is now bookmarked.")
                    router.push(router.asPath)
                }
            })
            .catch((err) => {
                console.log(err)
                makeToast(false, "Error")
            })
    }

    const handleRemoveFavorite = async (favoritedSessionId: number) => {
        console.log("remove bookmark")
        await axios
            .post("/api/removeFavoriteSession", {
                id: favoritedSessionId
            })
            .then((res) => {
                if (res.status === 200) {
                    makeToast(true, "This session is no longer bookmarked.")
                    router.push(router.asPath)
                }
            })
            .catch((err) => {
                console.log(err)
                makeToast(false, "Error")
            })
    }

    return (
        <BaseTemplate>
            <div className="flex flex-col items-center bg-[#EEEEF0] h-[100vh] px-4 md:px-[24px] py-4 md:py-[24px] gap-4 md:gap-[16px]">
                <div className="flex flex-col md:flex-row justify-between p-5 bg-white w-full rounded-[8px]">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <h1 className={`text-[#1C292899]`}>Program</h1>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <h1 className={`text-black font-[600]`}>ZK Week</h1>
                    </div>
                    <div className="flex flex-row gap-[8px] items-center">
                        <button className="flex gap-2 items-center bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]"
                                    onClick={() => {
                                        if (is_favorited > 0) {
                                            handleRemoveFavorite(session.id)
                                        } else {
                                            handleAddFavorite(session.id)
                                        }
                                    }}>
                            <NextImage src={
                                        is_favorited > 0
                                            ? "/vector-bookmark2.svg"
                                            : "/vector-bookmark.svg"
                                    } width={12} height={16} />
                            {
                                        is_favorited > 0
                                            ? "BOOKMARKED"
                                            : "BOOKMARK"
                                    }
                        </button>
                        <ParticipateButton event={event} session={session} isTallButton={true} />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-[8px] h-full">
                    <div className="flex flex-col items-start pt-4 md:pt-[32px] gap-2 px-4 md:px-[32px] pb-4 md:pb-[40px] bg-white rounded-[8px] w-full md:w-4/6">
                        <div className="flex flex-row items-end">
                            <p className="text-[40px] font-semibold">{session.name}</p>
                        </div>
                        <div className="flex flex-row flex-wrap items-center gap-[24px]">
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{`${startWeekDayFormatted}, ${eventMonthFormatted} ${startDateFormatted}th`}</h1>
                            </div>
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <NextImage src={"/vector-clock.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{`${startTime} - ${endTime}`}</h1>
                            </div>
                            <div className="flex gap-1 items-center justify-start mt-4">
                                <NextImage src={"/vector-location.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{location}</h1>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[24px] w-full mt-4">
                            <div className="w-5/6 py-5">{session.info}</div>
                            <div className="flex flex-wrap gap-5 w-3/6 p-5">
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
                                        <p>{item.role}:</p>
                                        <p className="font-bold">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 py-4 md:py-[32px] px-5 w-full md:w-2/6">
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="text-xl font-semibold">Tags</h4>
                            <div className="flex flex-wrap gap-5">
                                {session.tags &&
                                    session.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#F8FFFE] capitalize rounded-[37px] py-[4px] px-[16px] flex flex-row items-center justify-center"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="text-xl font-semibold">About</h4>
                            <div className="flex items-center gap-1">
                                Format: <p className="font-bold">{session.format}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                Track: <p className="font-bold">{session.track}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                Type: <p className="font-bold">{session.type}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                Level: <p className="font-bold">{session.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default SessionPage

