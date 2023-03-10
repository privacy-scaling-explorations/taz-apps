import React from "react"

const columns = ["Name", "Time", "Location", "Organizer", "Tags", "Additional Info"]

const events = [
    {
        name: "Meeting Call",
        startDate: "2020-01-01",
        endDate: "2020-01-02",
        time: "23:00:00",
        location: "Luštica Bay, Montenegro",
        organizer: ["Vincent", "Vitalik", "Milos", "Nicole", "Janine"],
        tags: ["Weekend"],
        additionalInfo: ""
    },
    {
        name: "Meeting Call",
        startDate: "2020-01-01",
        endDate: "2020-01-02",
        time: "23:00:00",
        location: "Luštica Bay, Montenegro",
        organizer: ["Vincent", "Vitalik", "Milos", "Nicole", "Janine"],
        tags: ["Weekend"],
        additionalInfo: ""
    }
]

const Calendar = () => (
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
                <h1 className="text-lg">Schedule</h1>
                <div className="grid grid-cols-6 w-full">
                    {columns.map((column, index) => (
                        <div key={index}>
                            <h1 className="border border-[#ccc] p-2">{column}</h1>
                        </div>
                    ))}
                    {events.map((event, index) => (
                        <>
                            <div className="border border-[#ccc] p-2">{event.name}</div>
                            <div className="border border-[#ccc] p-2">{`${event.startDate} -> ${event.endDate}, ${event.time}`}</div>
                            <div className="border border-[#ccc] p-2">{event.location}</div>
                            <div className="border border-[#ccc] p-2">
                                {event.organizer.map((item) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </div>
                            <div className="border border-[#ccc] p-2">
                                {event.tags.map((item) => (
                                    <div key={index}>{item}</div>
                                ))}
                            </div>
                            <div className="border border-[#ccc] p-2">{event.additionalInfo}</div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    </div>
)

export default Calendar
