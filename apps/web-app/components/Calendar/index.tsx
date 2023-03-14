import React, { useState} from "react"
import Link from "next/link"
import MapModal from "../MapModal"
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

const Accordian = (props: any) => {

  function handleActive(event: any) {
    props.setActive(event.target.id)

      if (props.active === props.week) {
      props.setActive("")
    }
  }

  return (
    <>
    <div id="accordion-flush" data-accordion="collapse" className="mb-1" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
              <h2 id="accordion-flush-heading-1">
                <button type="button" id={props.week} onClick={(event) => handleActive(event)} className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 bg-green-300 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="false" aria-controls="accordion-flush-body-1">
                  <span className="px-2 text-lg text-black">{props.week}</span>
                  <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </h2>
              <div id="accordion-flush-body-1" className={props.week === props.active ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">

                <h1 className="text-sm px-2 mt-2">{props.date}</h1>
                <table className="my-10 table-auto w-full table-fixed">
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
                        {props.events.map((event, index) => {
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

                            if (Date.parse(startDate) >= Date.parse(props.startingDate) && Date.parse(startDate) < Date.parse(props.endingDate)) {
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
                            }
                        })}
                    </tbody>
                </table>
              </div>
            </div>
    </>
  )

                      }

const Calendar = (props: EventsProps) => {
  const [active, setActive] = useState("Week 1");
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const { events } = props

  function openMapModal() {
    setMapModalOpen(true);
  }

  function closeMapModal() {
    setMapModalOpen(false)
  }


    if (events.length === 0) {
        return (
            <div className="w-full my-10">
                <div>
                    <h1 className="text-lg">Zulalu Oficial Events Schedule</h1>
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

            <div className="ml-2 flex items-center flex-row">
            <h1 className="text-lg px-2 align-self:center">Zulalu Oficial Events Schedule</h1>
                <button
                    type="button"
                    className="mr-4 ml-4 align-self:center bg-brand-yellow ring-2 ring-slate-100 py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                    onClick={openMapModal}
                >
                    Event Map
                </button>
            </div>
            <MapModal
                isOpen={mapModalOpen}
                closeModal={closeMapModal}
            />
            <div className="py-5 w-full overflox-x-auto">
            {/* When inputting dates make sure to append a zero on single digit days */}
            <Accordian events={events} week={"Week 1"} date={"March 25-April 2, 2023"} startingDate={"2023-03-25"} endingDate={"2023-04-02"} active={active} setActive={setActive}  />
            <Accordian events={events} week={"Week 2"} date={"April 3-9, 2023"} startingDate={"2023-04-03"} endingDate={"2023-04-09"} active={active} setActive={setActive} />

            </div>
        </div>
    )
}

export default Calendar
