import NextLink from "next/link"
import NextImage from "next/image"
import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const EventsPage = ({ events }: Props) => (
    <BaseTemplate>
        <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10">
            <div className="w-full h-full flex justify-between lg:flex-row flex-col py-5 px-[48px] bg-white rounded-[16px] gap-5 lg:gap-0">
                <div className="bg-[url('/event-image-1.png')] w-[100%] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px] flex lg:hidden" />

                <div className="flex flex-col lg:w-3/6 w-full justify-between">
                    <h1 className="font-semibold text-[40px]">
                        A first-of-its-kind pop-up city community in Montenegro
                    </h1>
                    <h1 className="text-[21px]">
                        Join 200 core residents for healthy living, co-working and learning through co-created events on
                        synthetic biology, ZK, public goods, longevity, and network states.
                    </h1>
                </div>
                <div className="bg-[url('/event-image-1.png')] w-[700px] h-[250px] bg-fill bg-no-repeat bg-center rounded-[16px] hidden lg:flex" />
            </div>
            <div className="flex flex-col bg-white p-5 rounded-[8px] gap-10">
                <div className="flex flex-col md:flex-row md:gap-0 gap-5  w-full justify-between items-start md:items-center">
                    <div className="flex">
                        <h1 className="font-semibold text-[40px]">MARCH 25th - MAY 25th, 2023</h1>
                    </div>
                    <NextLink href="/calendar-full">
                        <div className="flex cursor-pointer items-center gap-2 bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]">
                            <NextImage src={"/vector-calendar.svg"} width={16} height={16} />
                            FULL PROGRAM
                        </div>
                    </NextLink>
                </div>

                <div className="grid grid-cols-1 w-full gap-5 md:grid-cols-2">
                    <div className="grid grid-cols-2 gap-5">
                        <NextLink href={`/event/${events[0].id}`}>
                            <div className="flex cursor-pointer flex-col gap-5 md:gap-2 justify-center md:justify-start col-span-2 p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[0].name}`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[0].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[0].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[0].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[0].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[1].id}`}>
                            <div className="flex cursor-pointer flex-col gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[1].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[1].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[1].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[1].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[1].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[2].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[2].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[2].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[2].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[2].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[2].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[3].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[3].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[3].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[3].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[3].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[3].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[4].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[4].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[4].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[4].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[4].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[4].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <NextLink href={`/event/${events[5].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[5].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[5].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[5].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[5].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[5].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[6].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[6].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[6].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[6].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[6].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[6].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[7].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[7].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[7].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[7].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[7].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[7].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[8].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start md:p-[32px] p-[12px] w-full bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[8].name.substring(
                                    0,
                                    30
                                )}...`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[8].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[8].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[8].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[8].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                        <NextLink href={`/event/${events[9].id}`}>
                            <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start col-span-2 md:p-[32px] p-[23px] bg-[url('/event-image-2.png')] h-[250px] bg-cover bg-no-repeat bg-center rounded-[16px]">
                                <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[9].name}`}</h1>
                                <div className="flex gap-1">
                                    <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                    <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                        events[9].startDate
                                    ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                        events[9].startDate
                                    ).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })}-${new Date(events[9].endDate).toLocaleDateString("en-US", {
                                        day: "numeric"
                                    })},${new Date(events[9].startDate).toLocaleDateString("en-US", {
                                        year: "numeric"
                                    })}`}</h1>
                                </div>
                            </div>
                        </NextLink>
                    </div>
                </div>
            </div>
        </div>
    </BaseTemplate>
)

export default EventsPage
