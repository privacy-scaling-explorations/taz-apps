import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import NextImage from "next/image"
import Link from "next/link"

import { createClient } from "@supabase/supabase-js"
// import { getUserSession } from "../../hooks/getUserSession";
import { SessionsDTO, EventsDTO } from "../../types"
import BaseTemplate from "../Base"
import { getUserOnID } from "../../hooks/getUserOnID"
import AddSessionModal from "../../components/AddSessionModal"
import CalendarPageSessions from "../../components/Sessions/CalendarPageSessions"
import CalendarSessionModal from "../../components/CalendarSessionModal"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

type Props = {
    sessions: SessionsDTO[]
    events: EventsDTO[]
}

const CalendarPage = ({ sessions, events }: Props) => {
    const router = useRouter()
    const dateRef = useRef(null)
    const localtionRef = useRef(null)
    const { parentMessageId } = router.query
    const userObj = getUserOnID()

    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)
    const [selectedWeeks, setSelectedWeeks] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [locationsOptions, setLocationsOptions] = useState<string[]>([])

    const [openFilterOptions, setOpenFilterOptions] = useState(false)
    const [openLocationFilter, setOpenLocationFilter] = useState(false)
    const [session, setSession] = useState<any>(null)

    useEffect(() => {
        ;(async () => {
            const userSession = await supabase.auth.getUser()
            console.log("user object", userSession)
            setSession(userSession)
        })()
    }, [])

    const filterOptions = [
        {
            week: 1,
            month: "March",
            dates: [25, 31]
        },
        {
            week: 2,
            month: "April",
            dates: [1, 7]
        },
        {
            week: 3,
            month: "April",
            dates: [8, 14]
        },
        {
            week: 4,
            month: "April",
            dates: [15, 21]
        },
        {
            week: 5,
            month: "April",
            dates: [22, 28]
        }
    ]

    const handleClickOutside = (event: any) => {
        const { current: dateCurrent } = dateRef as { current: HTMLElement | null }
        const { current: locationCurrent } = localtionRef as {
            current: HTMLElement | null
        }
        if (dateCurrent && !dateCurrent.contains(event.target)) {
            setOpenFilterOptions(false)
        }
        if (locationCurrent && !locationCurrent.contains(event.target)) {
            setOpenLocationFilter(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const locations = Array.from(new Set(sessions.map((item) => item.location)))
        setLocationsOptions(locations)
    }, [])

    const handleCheckboxChangeDate = (week: string) => {
        if (selectedWeeks.includes(week)) {
            setSelectedWeeks(selectedWeeks.filter((selectedWeek) => selectedWeek !== week))
        } else {
            setSelectedWeeks([...selectedWeeks, week])
        }
    }

    const handleCheckboxChangeLocation = (location: string) => {
        if (selectedLocations.includes(location)) {
            setSelectedLocations(selectedLocations.filter((selectedWeek) => selectedWeek !== location))
        } else {
            setSelectedLocations([...selectedLocations, location])
        }
    }

    const filteredSessionsByLocation =
        selectedLocations.length !== 0 ? sessions.filter((item) => selectedLocations.includes(item.location)) : sessions

    const filteredSessionsByDate =
        selectedWeeks.length > 0
            ? filteredSessionsByLocation.filter((event) => {
                  const startDate = new Date(event.startDate)
                  const weekObj = filterOptions.find(
                      (week) =>
                          week.month.toLowerCase() ===
                              startDate.toLocaleString("default", { month: "long" }).toLowerCase() &&
                          startDate.getDate() >= week.dates[0] &&
                          startDate.getDate() <= week.dates[1]
                  )
                  return weekObj && selectedWeeks.includes(String(weekObj.week))
              })
            : filteredSessionsByLocation

    return (
        <BaseTemplate>
            <div className="flex flex-col border border-black p-5 bg-[#EEEEF0] gap-5 w-full h-full">
                <div className="flex gap-5 md:gap-0 flex-col md:flex-row justify-between p-5 bg-white rounded-[16px]">
                    <div className="flex items-center gap-2">
                        <h1 className={`text-[#1C292899]`}>Program</h1>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <h1 className={`text-black font-[600]`}>ZK Week</h1>
                    </div>
                    <div className="flex flex-row gap-[8px] justify-between items-center">
                        <button className="flex md:hidden bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]">
                            CONTACT
                        </button>
                        <button className="hidden md:flex bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]">
                            CONTACT ORGANIZERS
                        </button>
                        <Link href="events">
                            <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] gap-[8px] flex flex-row items-center justify-center">
                                <NextImage src={"/ticket.svg"} width={13} height={12} />
                                <p>TICKETS</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex h-full w-full items-center justify-center rounded-[8px]">
                    <NextImage
                        src="/calendar-image.png"
                        objectFit="contain"
                        alt="event-image"
                        style={{ borderRadius: "18px" }}
                        width="1400px"
                        height="245px"
                    />
                </div>
                <div className="flex flex-col items-center pt-[16px] md:px-[32px] px-[18px] pb-[40px] bg-white gap-[8px] rounded-[16px]">
                    <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center p-[16px] gap-[24px]">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-[32px]">
                            <h1 className="text-[40px] text-[#37352F] font-[600]">Week 1 | March 25-31</h1>
                            {session && session.data.user ? (
                                <>
                                    <button
                                        className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                                        onClick={() => setOpenAddSessionModal(true)}
                                    >
                                        CREATE SESSION
                                    </button>
                                    <CalendarSessionModal
                                        closeModal={setOpenAddSessionModal}
                                        isOpen={openAddSessionModal}
                                        events={events}
                                        sessions={sessions}
                                    />
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-start md:items-start gap-5">
                            <div className="flex flex-col relative w-[150px]" ref={localtionRef}>
                                <button
                                    onClick={() => setOpenLocationFilter(!openLocationFilter)}
                                    className="flex justify-between uppercase bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center"
                                >
                                    <p>Location</p>
                                    <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                                </button>

                                {openLocationFilter && (
                                    <div className="flex z-[10] flex-col gap-3 bg-white border w-full py-[8px] px-[16px] border-primary absolute top-[45px] text-zulalu-primary rounded-[8px]">
                                        {locationsOptions.map((item, index) => (
                                            <label key={index} className="flex w-full items-center gap-2 capitalize">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox"
                                                    value="value"
                                                    checked={selectedLocations.includes(item)}
                                                    onChange={() => handleCheckboxChangeLocation(item)}
                                                />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedLocations([])
                                    setSelectedWeeks([])
                                }}
                                className="bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center"
                            >
                                <p>ALL SESSIONS</p>
                                <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                            </button>
                            <div className="flex flex-col relative w-[auto]" ref={dateRef}>
                                <button
                                    onClick={() => setOpenFilterOptions(!openFilterOptions)}
                                    className="flex justify-between uppercase bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center"
                                >
                                    <p>WEEK 1 | March 25-31</p>
                                    <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                                </button>

                                {openFilterOptions && (
                                    <div className="flex z-[10] flex-col gap-3 bg-white border w-full py-[8px] px-[16px] border-primary absolute top-[45px] text-zulalu-primary rounded-[8px]">
                                        {filterOptions.map((week, index) => (
                                            <label key={index} className="flex w-full items-center gap-2 capitalize">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox"
                                                    value="value"
                                                    checked={selectedWeeks.includes(String(week.week))}
                                                    onChange={() => handleCheckboxChangeDate(String(week.week))}
                                                />
                                                {`${week.month} Week ${week.week} (${week.dates[0]} - ${week.dates[1]})`}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border border-black flex flex-col"></div>

                    <CalendarPageSessions sessions={filteredSessionsByDate} />
                </div>
                {/* <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                /> */}
            </div>
        </BaseTemplate>
    )
}

export default CalendarPage
