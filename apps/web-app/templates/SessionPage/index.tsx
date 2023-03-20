import NextImage from "next/image"
import { RsvpDTO, SessionsDTO } from "../../types"
import BaseTemplate from "../Base"

type Props = {
    session: SessionsDTO
    createRsvp: (userId: number, sessionId: number) => Promise<RsvpDTO | null>
    deleteRsvp: (id: number) => Promise<boolean>
}

const SessionPage = ({ session }: Props) => {
    const { startDate, endTime, location, startTime } = session

    const startDateFormatted = new Date(startDate).toLocaleDateString("en-US", { day: "numeric" })
    const startWeekDayFormatted = new Date(startDate).toLocaleDateString("en-US", { weekday: "long" })
    const eventMonthFormatted = new Date(startDate).toLocaleDateString("en-US", { month: "long" })
    return (
        <BaseTemplate>
            <div className="flex flex-col items-center bg-[#EEEEF0] h-[100vh] px-[24px] py-[24px] gap-[16px]">
                <div className="flex justify-between p-5 bg-white w-full rounded-[8px]">
                    <div className="flex items-center gap-2">
                        <h1 className={`text-[#1C292899]`}>Program</h1>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <h1 className={`text-black font-[600]`}>ZK Week</h1>
                    </div>
                    <div className="flex flex-row gap-[8px] items-center">
                        <button className="flex gap-2 items-center bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]">
                            <NextImage src={"/vector-bookmark.svg"} width={12} height={16} />
                            BOOKMARK
                        </button>
                        <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] gap-[8px] flex flex-row items-center justify-center">
                            RSVP
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-[8px] h-full">
                    <div className="flex flex-col items-start pt-[32px] gap-2 px-[32px] pb-[40px] bg-white rounded-[8px] w-4/6">
                        <div className="flex flex-row items-end">
                            <p className="text-[40px] font-semibold">{session.name}</p>
                        </div>
                        <div className="flex flex-row items-center gap-[24px]">
                            <div className="flex gap-1 items-center justify-start">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{`${startWeekDayFormatted}, ${eventMonthFormatted} ${startDateFormatted}th`}</h1>
                            </div>
                            <div className="flex gap-1 items-center justify-start">
                                <NextImage src={"/vector-clock.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{`${startTime} - ${endTime}`}</h1>
                            </div>
                            <div className="flex gap-1 items-center justify-start">
                                <NextImage src={"/vector-location.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{location}</h1>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[24px]  w-full">
                            <div className="w-5/6 py-5">{session.info}</div>
                            <div className="flex flex-wrap gap-[8px] w-3/6 p-5">
                                {session.organizers.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex w-auto rounded-[4px] gap-2 px-2 py-1 bg-[#E4EAEA] text-[16px]"
                                    >
                                        <NextImage src={"/user-icon-5.svg"} alt="calendar" width={24} height={24} />
                                        <p>Organizer:</p>
                                        <p className="font-bold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 py-[32px] px-5 w-2/6">
                        <div className="flex flex-col gap-[8px]">
                            <h4 className="text-xl font-semibold">Tags</h4>
                            <div className="flex flex-wrap gap-5">
                                {session.tags.map((tag, index) => (
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
                                Format: <p className="font-bold">Live</p>
                            </div>
                            <div className="flex items-center gap-1">
                                Track: <p className="font-bold">ZK</p>
                            </div>
                            <div className="flex items-center gap-1">
                                Type: <p className="font-bold">Workshop</p>
                            </div>
                            <div className="flex items-center gap-1">
                                Level: <p className="font-bold">Intermediate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default SessionPage
