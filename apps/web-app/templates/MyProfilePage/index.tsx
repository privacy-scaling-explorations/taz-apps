import { useEffect, useState } from "react"
import NextImage from "next/image"
import BaseTemplate from "../Base"
import Sessions from "../../components/Sessions/CalendarPageSessions"
import { useUserIdentityContext } from "../../context/UserIdentityContext"
import CalendarSessionModal from "../../components/CalendarSessionModal"
import { EventsDTO, SessionsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
}

const MyProfilePage = ({ events, sessions }: Props) => {
    const { userInfo, userSessions, userParticipatingSessions } = useUserIdentityContext()

    const [eventsOpt, setEventsOpt] = useState<string[]>([])
    const [selectedOpt, setSelectedOpt] = useState<string[]>([])
    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)

    useEffect(() => {
        if (userSessions) {
            const eventsName = userSessions.map((item) => item.events).map((event) => event.name.replace("\n", ""))
            const uniqueValues = eventsName.filter((value, index, self) => self.indexOf(value) === index)

            setEventsOpt(uniqueValues)
        }
    }, [userSessions])

    const handleOptionChange = (i: string) => {
        if (selectedOpt.includes(i)) {
            setSelectedOpt(selectedOpt.filter((item) => item !== i))
        } else {
            setSelectedOpt([...selectedOpt, i])
        }
    }

    const sortByDate = userSessions.sort((a, b) => (new Date(a.startDate) as any) - (new Date(b.startDate) as any))

    const filteredSessions =
        selectedOpt.length > 0
            ? sortByDate.filter((item) => selectedOpt.includes(item.events.name.replace("\n", "")))
            : sortByDate
    return (
        <BaseTemplate>
            {/* <div className="flex flex-col bg-[#EEEEF0] px-6 sm:px-12 md:px-[24px] py-6 sm:py-12 md:py-[24px] gap-4 sm:gap-8 md:gap-[16px]"> */}
            <div className="flex flex-col bg-[#EEEEF0] px-4 md:px-[24px] py-4 md:py-[24px] gap-4 md:gap-[16px]">
                <div className="flex flex-col sm:flex-row justify-between p-5 bg-white w-full rounded-[8px] flex-wrap">
                    {/* <div className="flex items-center w-full md:w-auto mb-4 md:mb-0"> */}
                    <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mb-4 md:mb-0 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                            <NextImage src={"/user-icon-5.svg"} alt="calendar" width={24} height={24} />
                            <p className="font-bold capitalize">{userInfo && userInfo.userName}</p>
                        </div>
                        <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                            <NextImage src={"/vector-location.svg"} alt="location" width={24} height={24} />
                            <p>Ho Chi Minh City</p>
                        </div>
                        <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                            <NextImage src={"/vector-computer.svg"} alt="location" width={24} height={24} />
                            <p>Ethereum Foundation</p>
                        </div>
                    </div>
                </div>
                <CalendarSessionModal
                    closeModal={setOpenAddSessionModal}
                    isOpen={openAddSessionModal}
                    events={events}
                    sessions={sessions}
                />
                <div className="flex flex-col md:flex-row justify-between h-full">
                    <div className="p-5 flex flex-col items-start bg-white rounded-[8px] w-full md:w-4/6 gap-10">
                        <div className="flex flex-wrap md:flex-nowrap justify-between w-full">
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-10">
                                <h1 className="font-semibold text-3xl md:text-[40px] mb-0 md:mb-0">My Sessions</h1>
                                <button
                                    onClick={() => setOpenAddSessionModal(true)}
                                    className="flex flex-row font-semibold justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] h-[40px]"
                                >
                                    CREATE SESSION
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pl-0 md:pl-5 w-full md:w-2/6 gap-10 mt-10 md:mt-0">
                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                            <h1 className="text-[24px] font-semibold">My Sessions</h1>
                            <div className="flex gap-2 flex-col items-start justify-center">
                                {eventsOpt &&
                                    eventsOpt.map((item, index) => (
                                        <label
                                            key={index}
                                            className="flex w-auto items-center gap-2 capitalize text-[16px] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name="checkbox"
                                                value="value"
                                                checked={selectedOpt.includes(item)}
                                                onChange={() => handleOptionChange(item)}
                                            />
                                            {item}
                                        </label>
                                    ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                            <h1 className="text-[24px] font-semibold">My Tickets</h1>
                            <div className="flex gap-2 flex-col justify-center items-start">
                                {userParticipatingSessions &&
                                    userParticipatingSessions.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 cursor-pointer w-auto">
                                            <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                            <h1 className="capitalize border-b border-[#52B5A4] text-[16px]">
                                                {item.name}
                                            </h1>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default MyProfilePage
