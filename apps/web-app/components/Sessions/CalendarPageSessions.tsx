import NextImage from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import moment from "moment"
import { SessionsDTO } from "../../types"
import FavoriteButton from "../FavoriteButton"

import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import ParticipateButton from "../ParticipateButton"

type Props = {
    sessions: SessionsDTO[]
    showStartDate?: boolean
}

interface GroupedSession {
    startDate: string
    groupSessions: SessionsDTO[]
}

const CalendarPageSessions = ({ sessions, showStartDate = false }: Props) => {
    // const [openBuyTicketModal, setOpenBuyTicketModal] = useState(false)
    // const [currentSubEventParams, setCurrentSubEventParams] = useState<any>({
    //     id: 0,
    //     subEventId: 0,
    //     eventSlug: "",
    //     eventItemId: 0
    // })

    // const handleClickAttend = async (sessionId: number) => {
    //     if (userInfo) {
    //         await axios
    //             .post("/api/addParticipant", {
    //                 session_id: sessionId,
    //                 user_id: userInfo.id
    //             })
    //             .then((res) => {
    //                 if (res.data === "Participant added") {
    //                     makeToast(true, "You are now attending this event.")
    //                     router.push(router.asPath)
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //                 makeToast(false, "Error")
    //             })
    //     }
    // }

    // const handleBuyTicket = async () => {
    //     await axios.post("/api/pretix-create-order", {
    //         subEventId: currentSubEventParams.subEventId,
    //         slug: currentSubEventParams.eventSlug,
    //         itemId: currentSubEventParams.eventItemId
    //     })
    //     handleClickAttend(currentSubEventParams.id)
    // }

    // const closeOpenTicketModal = (close = false) => {
    //     if (close) setOpenBuyTicketModal(false)
    // }

    const groupedByStartDate: GroupedSession[] = sessions.reduce((acc: GroupedSession[], session: SessionsDTO) => {
        const startDateStr: string = moment.utc(session.startDate).format("YYYY-MM-DD")
        const group: GroupedSession | undefined = acc.find((item: GroupedSession) => item.startDate === startDateStr)

        if (group) {
            group.groupSessions.push(session)
        } else {
            acc.push({ startDate: startDateStr, groupSessions: [session] })
        }

        return acc
    }, [] as GroupedSession[])

    return (
        <div className="w-full flex flex-col items-start py-[2px] gap-[16px] rounded-[16px]">
            {groupedByStartDate.map((item, index) => {
                const { groupSessions, startDate } = item

                return (
                    <div className="w-full flex-row" key={index}>
                        <div className="bg-[#1C2928] w-full flex flex-row items-center rounded-[8px]">
                            <p className="text-white py-[8px] font-[600] px-[16px] uppercase">
                                {moment.utc(`${item.startDate}`).isValid()
                                    ? moment.utc(`${item.startDate}`).format("MMMM Do")
                                    : "\u00A0"}
                            </p>
                            {/* {showStartDate ? (
                                <p className="text-white py-[8px] px-[16px] uppercase">
                                    {moment.utc(item.startDate).format("MMMM DD")}
                                </p>
                            ) : (
                                <p className="text-white py-[8px] px-[16px]">
                                    {item.startDate &&
                                    item.startTime &&
                                    moment.utc(`${item.startDate}T${item.startTime}`).isValid()
                                        ? moment
                                              .utc(`${item.startDate}T${item.startTime}`)
                                              .format("h A [|] dddd, MMMM Do")
                                        : "\u00A0"}
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-5">
                            {groupSessions.map((session, idx) => {
                                const [hours, minutes] = session.startTime.split(":").map(Number)

                                const startTimeFormatted = moment.utc({ hours, minutes }).format("HH:mm")

                                const endTimeFormatted = moment
                                    .utc({ hours, minutes })
                                    .add(parseInt(session.duration), "minute")
                                    .format("HH:mm")
                                return (
                                    <div
                                        key={idx}
                                        className={`${
                                            idx % 2 === 0 ? "bg-gray-100" : "bg-[#FCFFFE]"
                                        } w-full pl-5 md:pl-0 flex gap-2 flex-row md:flex-col items-start rounded-[16px]`}
                                    >
                                        <div className="flex md:hidden mt-6">
                                            <FavoriteButton session={session} isMiniButton={true} />
                                        </div>
                                        <div className="w-full flex flex-col items-start gap-[32px] bg-[#FCFFFE]] p-[16px]">
                                            <div className="w-full flex flex-row justify-between items-center gap-[67px]]">
                                                <div className="flex flex-row items-center gap-[16px]">
                                                    <NextLink href={`/event/${session.event_id}/session/${session.id}`}>
                                                        <h3
                                                            className={`text-lg text-[#424242] "w-full"
                                                           font-[600] text-[24px] border-b border-[#52B5A4] cursor-pointer`}
                                                        >
                                                            {session.name.length > 70
                                                                ? `${session.name.slice(0, 70)}...`
                                                                : session.name}
                                                        </h3>
                                                    </NextLink>

                                                    <div className="hidden md:flex">
                                                        <FavoriteButton session={session} isMiniButton={true} />
                                                    </div>
                                                </div>
                                                <div className="hidden md:flex">
                                                    <ParticipateButton session={session} isTallButton={false} />
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col md:flex-row gap-[32px] justify-between md:items-center items-start">
                                                <div className="hidden md:flex flex-row items-center justify-center gap-[8px]">
                                                    {session.team_members.length > 0 &&
                                                        session.team_members
                                                            .slice(0, 3)
                                                            .map((organizer: any, key: any) => (
                                                                <div
                                                                    className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]"
                                                                    key={key}
                                                                >
                                                                    {organizer.role === "Speaker" && (
                                                                        <NextImage
                                                                            src={"/user-icon-6.svg"}
                                                                            alt="user-icon-6"
                                                                            width={24}
                                                                            height={24}
                                                                        />
                                                                    )}
                                                                    {organizer.role === "Organizer" && (
                                                                        <NextImage
                                                                            src={"/user-icon-4.svg"}
                                                                            alt="user-icon-6"
                                                                            width={24}
                                                                            height={24}
                                                                        />
                                                                    )}
                                                                    {organizer.role === "Facilitator" && (
                                                                        <NextImage
                                                                            src={"/user-icon-5.svg"}
                                                                            alt="user-icon-5"
                                                                            width={24}
                                                                            height={24}
                                                                        />
                                                                    )}
                                                                    <p className="text-[#1C2928] font-[400] text-[16px]">
                                                                        {organizer.role}:{" "}
                                                                        <span className="font-[600] capitalize">
                                                                            {organizer.name}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                    {session.team_members.length > 4 && (
                                                        <h1 className="font-[600] text-[30px]">...</h1>
                                                    )}
                                                </div>
                                                <div className="flex flex-col md:flex-row w-full md:w-auto justify-between items-start md:items-end gap-3 md:gap-[32px] text-sm">
                                                    <div className="flex flex-row items-center gap-[8px]">
                                                        <NextImage
                                                            src={"/vector-calendar.svg"}
                                                            alt="vector-clock"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <p className="text-[#708E8C] text-[18px]">
                                                            {session.startDate &&
                                                            moment(`${session.startDate}T00:00:00Z`).isValid()
                                                                ? moment(
                                                                      `${session.startDate}T${session.startTime}`
                                                                  ).format("dddd, MMMM Do")
                                                                : "\u00A0"}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row items-center gap-[8px]">
                                                        <NextImage
                                                            src={"/vector-clock.svg"}
                                                            alt="vector-clock"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <p className="text-[#708E8C] text-[18px]">{`${startTimeFormatted}:${endTimeFormatted}`}</p>
                                                    </div>
                                                    <div className="flex flex-row items-center gap-[8px] border-b border-[#708E8C] text-[#708E8C]">
                                                        <NextImage
                                                            src={"/vector-location.svg"}
                                                            alt="location"
                                                            width={15}
                                                            height={15}
                                                        />
                                                        <p className="text-[18px]">{session.location}</p>
                                                    </div>
                                                </div>

                                                <div className="flex md:hidden flex-col items-start gap-[8px]">
                                                    {session.team_members.length > 0 &&
                                                        session.team_members.map((organizer: any, key: any) => (
                                                            <div
                                                                className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]"
                                                                key={key}
                                                            >
                                                                {organizer.role === "Speaker" && (
                                                                    <NextImage
                                                                        src={"/user-icon-6.svg"}
                                                                        alt="user-icon-6"
                                                                        width={24}
                                                                        height={24}
                                                                    />
                                                                )}
                                                                {organizer.role === "Organizer" && (
                                                                    <NextImage
                                                                        src={"/user-icon-4.svg"}
                                                                        alt="user-icon-6"
                                                                        width={24}
                                                                        height={24}
                                                                    />
                                                                )}
                                                                {organizer.role === "Facilitator" && (
                                                                    <NextImage
                                                                        src={"/user-icon-5.svg"}
                                                                        alt="user-icon-5"
                                                                        width={24}
                                                                        height={24}
                                                                    />
                                                                )}
                                                                <p className="text-[#1C2928] font-[400] text-[16px]">
                                                                    {organizer.role}:{" "}
                                                                    <span className="font-[600] capitalize">
                                                                        {organizer.name}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        ))}
                                                </div>
                                                <div className="flex md:hidden w-full">
                                                    <ParticipateButton session={session} isTallButton={false} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CalendarPageSessions
