import { useRouter } from "next/router"
import NextLink from "next/link"
import NextImage from "next/image"
import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const EventsPage = ({ events }: Props) => {
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

    const firstHalf = eventsArr.slice(0, halfIndex)
    const secondHalf = eventsArr.slice(halfIndex)

    const handleClickEvent = (eventId: number) => {
        router.push(`/event/${eventId}`)
    }

    return (
        <BaseTemplate>
            <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10">
                <div className="overflow-hidden w-full h-full flex justify-between lg:flex-row flex-col py-5  px-[28px] md:px-[48px] bg-white rounded-[16px] gap-[100px] lg:gap-10">
                    <div className="flex md:w-3/6 w-full flex-col gap-5 justify-center">
                        <h1 className="font-semibold text-[32px] md:text-[52px] md:mb-10">
                            Zuzalu is a first-of-its-kind pop-up city community in{" "}
                            <span className="relative z-10 inline-block px-2">
                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200"></span>
                                <span className="relative z-10">Montenegro.</span>
                            </span>{" "}
                        </h1>
                        <h1 className="font-normal text-[16px] md:text-[18px] w-[auto] md:w-[600px] leading-[25px] md:leading-[25px]">
                            Join 200 core residents brought together by a shared desire to learn, create, live longer
                            and healthier lives, and build self-sustaining communities.
                        </h1>
                    </div>
                    <div className="p-5 relative w-full lg:w-3/6 h-[500px] w-full flex justify-center items-center">
                        <div className="absolute z-[10]  bottom-0 border border-black w-[550px] h-[300px] bg-eventbg2 filter blur-[150px] z-[1]" />
                        <div className="absolute z-[9]  border border-black w-[500px] h-[379px] bg-eventbg1 filter blur-[150px] z-[1]" />

                        <div className="top-0 absolute z-[20] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/vector.png')]" />
                        <div className="top-0 absolute z-[21] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/49.png')]" />
                    </div>
                </div>

                <div className="flex flex-col bg-white py-[40px] px-[36px] rounded-[8px] gap-10">
                    <div className="flex flex-col md:flex-row md:gap-0 gap-5  w-full justify-between items-start">
                        <div className="flex gap-5 flex-col md:w-3/6 w-full">
                            <h1 className="font-semibold text-[40px]">MARCH 25th - MAY 25th, 2023</h1>
                            <h1 className="text-[16px]">
                                Zuzalu will host a variety of events on topics like synthetic biology, technology for
                                privacy, public goods, longevity, governance and more.
                            </h1>
                        </div>
                        <NextLink href="/calendar-full">
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
                                    className={`flex overflow-hidden relative cursor-pointer flex-col gap-5 md:gap-2 justify-center md:justify-start p-[32px] h-[250px] rounded-[16px] ${
                                        index === 0 && "md:col-span-2"
                                    }`}
                                >
                                    <div className="flex z-[1] absolute right-0 left-0 top-0 w-full h-full overflow-hidden">
                                        <NextImage
                                            src={event.bg_image_url}
                                            width={900}
                                            height={400}
                                            objectFit="cover"
                                        />
                                    </div>

                                    <h1 className="md:text-[24px] text-[16px] font-semibold capitalize z-[2]">{`${event.name}`}</h1>
                                    <div className="flex gap-1 z-[2]">
                                        <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                        <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                            event.startDate
                                        ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                            event.startDate
                                        ).toLocaleDateString("en-US", {
                                            day: "numeric"
                                        })}-${new Date(event.endDate).toLocaleDateString("en-US", {
                                            day: "numeric"
                                        })},${new Date(event.startDate).toLocaleDateString("en-US", {
                                            year: "numeric"
                                        })}`}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid md:grid-rows-1 md:grid-cols-4 grid-cols-1 gap-5">
                            {secondHalf.map((event, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleClickEvent(event.id)}
                                    className={`flex overflow-hidden relative cursor-pointer flex-col gap-5 md:gap-2 justify-center md:justify-start p-[32px] h-[250px] rounded-[16px]`}
                                >
                                    <div className="flex z-[1] absolute right-0 left-0 top-0 w-full h-full overflow-hidden">
                                        <NextImage
                                            src={event.bg_image_url}
                                            width={900}
                                            height={400}
                                            objectFit="cover"
                                        />
                                    </div>

                                    <h1 className="md:text-[24px] text-[16px] font-semibold capitalize z-[2]">{`${event.name}`}</h1>
                                    <div className="flex gap-1 z-[2]">
                                        <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                        <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                            event.startDate
                                        ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                            event.startDate
                                        ).toLocaleDateString("en-US", {
                                            day: "numeric"
                                        })}-${new Date(event.endDate).toLocaleDateString("en-US", {
                                            day: "numeric"
                                        })},${new Date(event.startDate).toLocaleDateString("en-US", {
                                            year: "numeric"
                                        })}`}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default EventsPage
