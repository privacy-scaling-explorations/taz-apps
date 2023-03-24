import NextLink from "next/link"
import NextImage from "next/image"
import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const EventsPage = ({ events }: Props) => {
    console.log("Before sorting", events)

    events.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
    
        // Compare the two dates to determine the sort order
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

      console.log("After sorting", events)

    return (
        <BaseTemplate>
            <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10">
                <div className="overflow-hidden w-full h-full flex justify-between lg:flex-row flex-col py-5  px-[28px] md:px-[48px] bg-white rounded-[16px] gap-[100px] lg:gap-10">
                    <div className="flex md:w-3/6 w-full flex-col gap-5">
                        <h1 className="font-semibold text-[32px] md:text-[52px] md:mb-10">
                            Zuzalu is a first-of-its-kind pop-up city community in{" "}
                            <span className="relative z-10 inline-block px-2">
                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200"></span>
                                <span className="relative z-10">Montenegro.</span>
                            </span>{" "}
                        </h1>
                        <h1 className="font-normal text-[16px] md:text-[18px] w-[auto] md:w-[600px] leading-[25px] md:leading-[25px]">
                            Join 200 core residents brought together by a shared desire to learn, create, live longer and
                            healthier lives, and build self-sustaining communities.
                        </h1>
                    </div>
                    <div className="p-5 relative w-full lg:w-3/6 h-[500px] w-full flex justify-center items-center">
                        <div className="absolute z-[10]  bottom-0 border border-black w-[550px] h-[300px] bg-eventbg2 filter blur-[150px] z-[1]" />
                        <div className="absolute z-[9]  border border-black w-[500px] h-[379px] bg-eventbg1 filter blur-[150px] z-[1]" />
    
                        <div className="top-0 absolute z-[20] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/vector.png')]" />
                        <div className="top-0 absolute z-[21] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/49.png')]" />
                    </div>
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
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                            <NextLink href={`/event/${events[0].id}`}>
                                <div className="flex cursor-pointer flex-col gap-5 md:gap-2 justify-center md:justify-start md:col-span-2 p-[32px] bg-[url('/buildweek.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                            <NextLink href={`/event/${events[3].id}`}>
                                <div className="flex cursor-pointer flex-col gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/publicgoods.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/zkweek.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                            <NextLink href={`/event/${events[7].id}`}>
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/longevity.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/industry.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <NextLink href={`/event/${events[1].id}`}>
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/synthetic.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/jurisdiction.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
                                    <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">
                                        {`${events[2].name.substring(0, 30)}...`}ssss
                                    </h1>
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
                            <NextLink href={`/event/${events[5].id}`}>
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start p-[32px] bg-[url('/newcities.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start md:p-[32px] p-[12px] w-full bg-[url('/aicrypto.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                            <NextLink href={`/event/${events[9].id}`}>
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start md:p-[32px] p-[23px] bg-[url('/communnation.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
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
                            <NextLink href={`/event/${events[10].id}`}>
                                <div className="flex flex-col cursor-pointer gap-5 md:gap-2 justify-center md:justify-start md:p-[32px] p-[23px] bg-[url('/sunrise.png')] h-[250px] bg-cover bg-no-repeat bg-end rounded-[16px]">
                                    <h1 className="md:text-[24px] text-[16px] font-semibold capitalize">{`${events[10].name}`}</h1>
                                    <div className="flex gap-1">
                                        <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                        <h1 className="text-black md:text-[14px] text-[10px]">{`${new Date(
                                            events[10].startDate
                                        ).toLocaleDateString("en-US", { month: "long" })} ${new Date(
                                            events[10].startDate
                                        ).toLocaleDateString("en-US", {
                                            day: "numeric"
                                        })}-${new Date(events[10].endDate).toLocaleDateString("en-US", {
                                            day: "numeric"
                                        })},${new Date(events[10].startDate).toLocaleDateString("en-US", {
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
    );
    

}


export default EventsPage
