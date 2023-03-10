import React from "react"

const columns = ["Name", "Time", "Location", "Organizers", "Tags", "Additional Info"]

const Calendar = (props: any) => {
    const { events } = props

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
                    <h1 className="text-lg">Schedule</h1>
                    <div className="grid grid-cols-6 w-full">
                        {columns.map((column, index) => (
                            <div key={index}>
                                <h1 className="border border-[#ccc] p-2">{column}</h1>
                            </div>
                        ))}
                        {events
                            ? events.map((event, index) => (
                                  <>
                                      <div className="border border-[#ccc] p-2">{event.name}</div>
                                      <div className="border border-[#ccc] p-2">{`${event.start_date} ${event.start_time}-> ${event.end_date} ${event.end_time}`}</div>
                                      <div className="border border-[#ccc] p-2">{event.location}</div>
                                      <div className="border border-[#ccc] p-2">
                                          {event.organizers.map((item) => (
                                              <div key={index}>{item}</div>
                                          ))}
                                      </div>
                                      <div className="border border-[#ccc] p-2">
                                          {event.tags.map((item) => (
                                              <div key={index}>{item}</div>
                                          ))}
                                      </div>
                                      <div className="border border-[#ccc] p-2">{event.info}</div>
                                  </>
                              ))
                            : "Fetching events"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
