import React from "react"
import Link from "next/link"

const columns = ["Name", "Time", "Location", "Organizers", "Tags", "Additional Info"]

interface EventsProps {
    events: {
        created_at: Date
        endDate: Date
        endTime: string
        id: number
        info: string
        location: string
        name: string
        organizers: string[]
        startDate: Date
        startTime: string
        tags: string[]
    }[]
}

const Calendar = (props: EventsProps) => {
    const { events } = props

    if (events.length === 0) {
        return (
            <div className="border border-black w-full my-10">
                <div>
                    <h1 className="text-lg">Zulalu Oficial Events Schedule</h1>
                </div>
                <div className="border border-black py-5">
                    <div className="w-full bg-green-300 mt-5">
                        <h1 className="text-lg">Week 1</h1>
                    </div>
                    <div className="bg-[#ccc] w-full h-[1px] my-2" />
                    <h1 className="text-sm">March 25-April 2, 2023</h1>
                    <div className="border border-black my-10 w-full">
                        <h1 className="text-lg">Fetching Data...</h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="border border-black w-full my-10">
            <h1 className="text-lg px-2">Zulalu Oficial Events Schedule</h1>
            <div className="border border-black py-5">
                <div className="w-full bg-green-300 mt-5 px-2">
                    <h1 className="text-lg">Week 1</h1>
                </div>
                <div className="bg-[#ccc] w-full h-[1px] my-2" />
                <h1 className="text-sm px-2">March 25-April 2, 2023</h1>
                <div className="my-10 w-full">
                    <h1 className="text-lg px-2">Schedule</h1>
                    <div className="grid grid-cols-6 w-full">
                        {columns.map((column, index) => (
                            <div key={index}>
                                <h1 className="border border-[#ccc] p-2">{column}</h1>
                            </div>
                        ))}
                        <div className="grid grid-col-1">
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-start justify-between border border-[#ccc] p-2 h-[100px]"
                                >
                                    <h1>{event.name}</h1>
                                    <Link href={`/answers/${event.id}`}>
                                        <h1
                                            className="bg-brand-yellow rounded-md p-1 text-[10px] cursor-pointer"
                                            onClick={() => console.log("event details", event.id)}
                                        >
                                            Event info.
                                        </h1>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-col-1">
                            {events.map((event, index) => (
                                <div key={index} className="border border-[#ccc] p-2 h-[100px]">
                                    {`${event.startDate} ${event.startTime}-> ${event.endDate} ${event.endTime}`}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-col-1">
                            {events.map((event, index) => (
                                <div key={index} className="border border-[#ccc] p-2 h-[100px]">
                                    {event.location}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-col-1">
                            {events.map((event, index) => (
                                <div key={index} className="flex gap-4 border border-[#ccc] p-2 h-[100px]">
                                    {event.organizers.map((item, i) => (
                                        <div key={i} className="uppercase">
                                            <h1 className="bg-green-200 p-1 rounded-md text-sm">{item}</h1>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-col-1">
                            {events.map((event, index) => (
                                <div key={index} className="flex gap-4 border border-[#ccc] p-2 h-[100px]">
                                    {event.tags.map((item, i) => (
                                        <div key={i} className="uppercase">
                                            <h1 className="bg-green-200 p-1 rounded-md text-sm">{item}</h1>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-col-1">
                            {events.map((event, index) => (
                                <div key={index} className="border border-[#ccc] p-2 h-[100px]">
                                    {event.info}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
