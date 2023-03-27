import NextLink from "next/link"
import { useRouter } from "next/router"
import NextImage from "next/image"
import moment from "moment"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const Events = ({ events }: Props) => {
    const router = useRouter()
    let eventsArr = events

    const findOpenSessions = events.find((item) => item.name === "Open Sessions")

    if (findOpenSessions) {
        const idxOpenSessions = events.indexOf(findOpenSessions)
        eventsArr.splice(idxOpenSessions, 1)
    }

    eventsArr.sort((a, b) => {
        const dateA = new Date(a.startDate)
        const dateB = new Date(b.startDate)

        // Compare the two dates to determine the sort order
        if (dateA < dateB) {
            return -1
        }
        if (dateA > dateB) {
            return 1
        }
        return 0
    })

    const halfIndex = Math.ceil(eventsArr.length / 4)

    const firstHalf = eventsArr.slice(0, halfIndex + 1)
    const secondHalf = eventsArr.slice(halfIndex + 1)

    const handleClickEvent = (eventId: number) => {
        router.push(`/event/${eventId}`)
    }

    const formatDates = (startDate: Date, endDate: Date) => {
        const start = moment.utc(startDate)
        const end = moment.utc(endDate)

        if (start.month() === end.month()) {
            const formattedDate = `${start.format("MMMM D")} - ${end.format("D")}`
            return formattedDate
        }
        const formattedDate = `${start.format("MMMM D")} - ${end.format("MMMM D")}`
        return formattedDate
    }

    return (
        <div className="flex flex-col bg-white py-[40px] px-[36px] rounded-[8px] gap-10">
            <div className="flex flex-col md:flex-row md:gap-0 gap-5  w-full justify-between items-start">
                <div className="flex gap-5 flex-col md:w-3/6 w-full">
                    <h1 className="font-semibold text-[40px]">MARCH 25th - MAY 25th, 2023</h1>
                    <h1 className="text-[16px]">
                        Zuzalu will host a variety of events on topics like synthetic biology, technology for privacy,
                        public goods, longevity, governance and more.
                    </h1>
                </div>
                <NextLink href="/full-program">
                    <div className="flex cursor-pointer items-center gap-2 bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]">
                        <NextImage src={"/vector-calendar.svg"} width={16} height={16} />
                        FULL PROGRAM
                    </div>
                </NextLink>
            </div>
            <div className="grid w-full gap-5 grid-cols-1">
                <div className="grid md:grid-rows-1 md:grid-cols-4 grid-cols-1 gap-5">
                    {firstHalf.map((event, index) => (
                        <div
                            key={index}
                            onClick={() => handleClickEvent(event.id)}
                            className={`flex overflow-hidden relative cursor-pointer flex-col gap-1 md:gap-2 justify-start md:justify-start p-5 md:p-[32px] h-[100px] md:h-[250px] rounded-[16px]`}
                        >
                            <div className="flex z-[1] absolute right-0 left-0 top-0 w-full h-full overflow-hidden">
                                <NextImage src={event.bg_image_url} width={900} height={400} objectFit="cover" />
                            </div>

                            <h1 className="md:text-[24px] text-[16px] font-semibold capitalize z-[2]">{`${event.name}`}</h1>
                            <div className="flex gap-1 z-[2] font-[600]">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-black md:text-[14px] text-[10px]">
                                    {formatDates(event.startDate, event.endDate)}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-rows-1 md:grid-cols-4 grid-cols-1 gap-5">
                    {secondHalf.map((event, index) => (
                        <div
                            key={index}
                            onClick={() => handleClickEvent(event.id)}
                            className={`flex overflow-hidden relative cursor-pointer flex-col gap-1 md:gap-2 justify-start md:justify-start p-5 md:p-[32px] h-[100px] md:h-[250px] rounded-[16px]`}
                        >
                            <div className="flex z-[1] absolute right-0 left-0 top-0 w-full h-full overflow-hidden">
                                <NextImage src={event.bg_image_url} width={900} height={400} objectFit="cover" />
                            </div>

                            <h1 className="md:text-[24px] text-[16px] font-semibold capitalize z-[2]">{`${event.name}`}</h1>
                            <div className="flex gap-1 z-[2] font-[600]">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-black md:text-[14px] text-[10px]">
                                    {formatDates(event.startDate, event.endDate)}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Events
