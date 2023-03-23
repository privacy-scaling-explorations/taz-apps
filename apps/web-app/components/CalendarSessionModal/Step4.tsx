import NextImage from "next/image"
import { IoMdArrowBack } from "react-icons/io"
import Loading from "../Loading"

type NewSessionState = {
    description: string
    equipment: string
    event_id: number
    event_item_id: number
    event_slug: string
    event_type: string
    format: string
    hasTicket: boolean
    info: string
    level: string
    location: string
    name: string
    startDate: Date
    startTime: string
    subevent_id: number
    tags: string[]
    team_members: {
        name: string
        role: string
    }[]
    track: string
}

type Props = {
    setSteps: (step: number) => void
    newSession: NewSessionState
    handleSubmit: Function
    isLoading: boolean
    amountTickets: string
}

const Step4 = ({ setSteps, newSession, handleSubmit, isLoading, amountTickets }: Props) => {
    const day = newSession.startDate
        ? new Date(newSession.startDate).toLocaleDateString("en-US", { day: "numeric" })
        : ""

    const month = newSession.startDate
        ? new Date(newSession.startDate).toLocaleDateString("en-US", { month: "long" })
        : ""

    const weekday = newSession.startDate
        ? new Date(newSession.startDate).toLocaleDateString("en-US", { weekday: "long" })
        : ""

    return (
        <div className="flex flex-col w-full gap-8 bg-white rounded-lg">
            <div className="flex flex-col gap-4">
                <h1 className="text-[18px] font-bold uppercase ">{newSession.name}</h1>
                <h1 className="text-[18px]">{newSession.info}</h1>

                <div className="flex items-center gap-2">
                    <NextImage src="/vector-calendar.svg" width={20} height={20} />
                    <h1>{`${weekday}, ${month} ${day}th`}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <NextImage src="/vector-clock.svg" width={20} height={20} />
                    <h1>{newSession.startTime}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <NextImage src="/vector-location.svg" width={20} height={20} />
                    <h1>{newSession.location}</h1>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-full flex flex-row border-zulalu-primary border font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-white rounded-[8px] text-black text-[16px]"
                    onClick={() => setSteps(2)}
                >
                    <IoMdArrowBack size={20} />
                    BACK
                </button>
                <button
                    type="button"
                    disabled={isLoading}
                    className="w-full flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => handleSubmit()}
                >
                    {isLoading ? <Loading size="xs" /> : "CREATE SESSION!"}
                </button>
            </div>
        </div>
    )
}

export default Step4
