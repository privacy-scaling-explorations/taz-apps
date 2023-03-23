import NextImage from "next/image"
import Loading from "../Loading"

type NewSessionState = {
    name: string
    organizers: string[]
    team_members: { name: string; role: string }[]
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
    location: string
    tags: string[]
    info: string
    eventId: number
    hasTicket: boolean
    format: string
    level: string
    equipment: string
    track: string
    type: string
    event_slug: string
    event_item_id: number
}

type Props = {
    setSteps: (step: number) => void
    newSession: NewSessionState
    handleSubmit: Function
    isLoading: boolean
    amountTickets: string
}

const Step3 = ({ setSteps, newSession, handleSubmit, isLoading, amountTickets }: Props) => {
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
            <div className="w-full flex flex-col gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-full flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => setSteps(2)}
                >
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

export default Step3
