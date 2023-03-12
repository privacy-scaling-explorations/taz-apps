import React from "react"
import Link from "next/link"

import Loading from "../Loading"

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
            <div className="w-full my-10">
                <div>
                    <h1 className="text-lg px-2">Zulalu Oficial Events Schedule</h1>
                </div>
                <div className="py-5 flex justify-center">
                    <div className="">
                        <Loading />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full my-10">
            <h1 className="text-lg px-2">Zulalu Oficial Events Schedule</h1>
            <div className="py-5 w-full overflox-x-auto">
                <div className="w-full bg-green-300 mt-5 px-2">
                    <h1 className="text-lg">Week 1</h1>
                </div>
                <div className="bg-[#ccc] w-full h-[1px] my-2" />
                <h1 className="text-sm px-2">March 25-April 2, 2023</h1>
                <table className="my-10 table-auto w-full  table-fixed">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="border border-black w-[200px] px-2 text-start">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => {
                            const {
                                name,
                                endDate,
                                endTime,
                                id,
                                info,
                                location,
                                organizers,
                                startDate,
                                startTime,
                                tags
                            } = event
                            return (
                                <tr key={index} className="h-[80px] text-sm">
                                    <td className="border border-black p-2">
                                        {name}
                                        <Link href={`/answers/${id}`}>
                                            <h1
                                                className="bg-brand-yellow rounded-md p-1 text-[10px] w-[80px] cursor-pointer"
                                                onClick={() => console.log("event details", id)}
                                            >
                                                Event info.
                                            </h1>
                                        </Link>
                                    </td>
                                    <td className="border border-black p-2">
                                        {`${startDate} ${startTime}-> ${endDate} ${endTime}`}
                                    </td>
                                    <td className="border border-black p-2">{location}</td>
                                    <td className="border border-black p-2">
                                        <div className="flex gap-2 flex-wrap">
                                            {organizers &&
                                                organizers.map((item, i) => (
                                                    <div key={i} className="uppercase">
                                                        <h1 className="bg-green-200 p-1 rounded-md text-[12px] tracking-widest">
                                                            {item}
                                                        </h1>
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                    <td className="border border-black p-2">
                                        <div className="flex flex-wrap gap-2">
                                            {tags &&
                                                tags.map((item, i) => (
                                                    <div key={i} className="uppercase">
                                                        <h1 className="bg-green-200 p-1 rounded-md text-[12px] tracking-widest">
                                                            {item}
                                                        </h1>
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                    <td className="border border-black p-2">{info}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Calendar
