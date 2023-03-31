import React, { useEffect, useRef, useState } from "react"
import NextImage from "next/image"
import moment from "moment"

import { SessionsDTO, EventsDTO } from "../../types"
import BaseTemplate from "../Base"
import CalendarPageSessions from "../../components/Sessions/CalendarPageSessions"
import CalendarSessionModal from "../../components/CalendarSessionModal"
import TicketsModal from "../../components/TicketsModal"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import StyledDatePicker from "../../components/StyledDatePicker"
import ContactModal from "../../components/ContactModal"

type Props = {
    sessions: SessionsDTO[]
    events: EventsDTO[]
}

const CalendarPage = ({ sessions, events }: Props) => {
    const localtionRef = useRef(null)
    const { userRole, userInfo } = useUserAuthenticationContext()

    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)
    const [openAddTicketsModal, setOpenAddTicketsModal] = useState(false)
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [locationsOptions, setLocationsOptions] = useState<string[]>([])
    const [openContactModal, setOpenContactModal] = useState(false)

    const [openLocationFilter, setOpenLocationFilter] = useState(false)
    const isOrganizer = userRole === "resident"

    /* Begin DatePicker code */
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [datePickerDescription, setDatePickerDescription] = useState("FULL PROGRAM")
    const [filteredSessions, setFilteredSessions] = useState<SessionsDTO[]>(sessions)
    const [datePickerStartDate, setDatePickerStartDate] = useState<Date | null>(null)
    const [datePickerEndDate, setDatePickerEndDate] = useState<Date | null>(null)
    const datePickerWrapperRef = useRef(null)

    const toggleDatePicker = () => {
        setOpenDatePicker(!openDatePicker)
    }

    const handleDateSelection = (selectedDates: [Date | null, Date | null]) => {
        // Filter sessions
        const [start, end] = selectedDates.map((date) => (date ? moment.utc(date).startOf("day").toDate() : null))
        setDatePickerStartDate(start)
        setDatePickerEndDate(end)
        const filtered = sessions.filter((session) => {
            const sessionDate = moment.utc(session.startDate).startOf("day").toDate() // Remove time part for date comparison
            const sessionEndDate = end ? moment.utc(end) : null
            let endOfDay = null
            if (sessionEndDate) {
                endOfDay = sessionEndDate.endOf("day").toDate()
            }
            return (start === null || start <= sessionDate) && (endOfDay === null || sessionDate <= endOfDay)
        })
        setFilteredSessions(filtered)
    }

    // Update filter header description
    // (done in useEffect because start and end date must be done updating first)
    useEffect(() => {
        const today = moment.utc().startOf("day")
        const start = datePickerStartDate ? moment.utc(datePickerStartDate) : null
        const end = datePickerEndDate ? moment.utc(datePickerEndDate) : null

        if (start?.isSame(today) && end?.isSame(today)) {
            setDatePickerDescription("TODAY")
        } else if (start?.isSame(today)) {
            setDatePickerDescription("TODAY ONWARD")
        } else if (start && end === null) {
            setDatePickerDescription(`${start.format("MMMM D")} ONWARD`)
        } else if (start && end && start.isSame(end)) {
            setDatePickerDescription(start.format("dddd MMMM D"))
        } else if (start && end) {
            setDatePickerDescription(`${start.format("MMMM D")} - ${end.format("D")}`)
        }
    }, [datePickerStartDate, datePickerEndDate])

    const handleDatePickerClickOutside = (e: MouseEvent) => {
        const { current: wrap } = datePickerWrapperRef as { current: HTMLElement | null }

        if (wrap && !wrap.contains(e.target as Node)) {
            setOpenDatePicker(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleDatePickerClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleDatePickerClickOutside)
        }
    }, [])

    const handleClickOutside = (event: any) => {
        const { current: locationCurrent } = localtionRef as {
            current: HTMLElement | null
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

    const handleCheckboxChangeLocation = (location: string) => {
        if (selectedLocations.includes(location)) {
            setSelectedLocations(selectedLocations.filter((selectedWeek) => selectedWeek !== location))
        } else {
            setSelectedLocations([...selectedLocations, location])
        }
    }

    const filteredSessionsByLocation =
        selectedLocations.length !== 0
            ? filteredSessions.filter((item) => selectedLocations.includes(item.location))
            : filteredSessions

    const handleClickToFilterByTodayDate = () => {
        const filtered = sessions.filter((session) => {
            const sessionDate = moment.utc(session.startDate).format("MMMM Do")
            const todayDate = moment().format("MMMM Do")

            return sessionDate === todayDate
        })
        setFilteredSessions(filtered)
    }

    return (
        <BaseTemplate>
            <div className="flex flex-col border border-black p-5 bg-[#EEEEF0] gap-5 w-full h-full">
                <div className="flex gap-5 md:gap-0 flex-col md:flex-row justify-between p-5 bg-white rounded-[16px]">
                    <div className="flex items-center gap-2 text-[12px] md:text-[14px]">
                        <h1 className={`text-black font-[600]`}>Program</h1>
                    </div>
                    <div className="flex flex-row gap-[8px] justify-between items-center">
                        <button
                            className="flex md:hidden bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]"
                            onClick={() => setOpenContactModal(true)}
                        >
                            CONTACT
                        </button>
                        <button
                            className="hidden md:flex bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]"
                            onClick={() => setOpenContactModal(true)}
                        >
                            CONTACT ORGANIZERS
                        </button>

                        <button
                            onClick={() => setOpenAddTicketsModal(true)}
                            className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] gap-[8px] flex flex-row items-center justify-center"
                        >
                            <NextImage src={"/ticket.svg"} width={13} height={12} />
                            <p>TICKETS</p>
                        </button>

                        <TicketsModal
                            isOpen={openAddTicketsModal}
                            closeModal={setOpenAddTicketsModal}
                            checkSession={undefined}
                            userInfo={userInfo}
                        />
                    </div>
                </div>

                {userInfo ? (
                    <>
                        <button
                            className="flex md:hidden w-full flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
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
                <div className="flex md:hidden h-full w-full items-center justify-center rounded-[8px]">
                    <NextImage
                        src="https://polcxtixgqxfuvrqgthn.supabase.co/storage/v1/object/public/zulalu-images/Tag%20(1).png"
                        objectFit="fill"
                        alt="event-image"
                        style={{ borderRadius: "18px" }}
                        width="600px"
                        height="345px"
                    />
                </div>
                <div className="hidden md:flex h-full w-full items-center justify-center rounded-[8px]">
                    <NextImage
                        src="https://polcxtixgqxfuvrqgthn.supabase.co/storage/v1/object/public/zulalu-images/Tag.png"
                        objectFit="fill"
                        alt="event-image"
                        style={{ borderRadius: "18px" }}
                        width="1900px"
                        height="245px"
                    />
                </div>
                <div className="flex flex-col items-center pt-[16px] md:px-[32px] px-[18px] pb-[40px] bg-white gap-[8px] rounded-[16px]">
                    <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center p-[16px] gap-[24px]">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-[32px]">
                            <h1 className="text-[24px] md:text-[40px] text-[#37352F] font-[600]">Sessions</h1>

                            {userInfo ? (
                                <>
                                    <button
                                        className="hidden md:flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
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
                        {userInfo && (
                            <div className="flex flex-col md:flex-row justify-center items-start md:items-start gap-5 w-full md:w-auto">
                                <div className="flex flex-col relative w-full md:w-[150px]" ref={localtionRef}>
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
                                                <label
                                                    key={index}
                                                    className="flex w-full items-center gap-2 capitalize"
                                                >
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
                                        setFilteredSessions(sessions)
                                        setDatePickerDescription("FULL PROGRAM")
                                    }}
                                    className="bg-white border w-full md:w-auto border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-between md:justify-center items-center"
                                >
                                    <p>CLEAR FILTER</p>
                                    {/* <NextImage src={"/arrow-down.svg"} width={8} height={4} /> */}
                                </button>
                                {/* Begin DatePicker Filter */}
                                <div className="flex flex-col w-auto min-w-[200px]" ref={datePickerWrapperRef}>
                                    <button
                                        onClick={toggleDatePicker}
                                        className="flex justify-between uppercase bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center"
                                    >
                                        <p>{datePickerDescription}</p>
                                        <NextImage src="/arrow-down.svg" width={8} height={4} />
                                    </button>

                                    {openDatePicker && (
                                        <div className="relative">
                                            <div className="absolute right-0 top-2 z-10 p-0">
                                                <StyledDatePicker
                                                    onChange={handleDateSelection}
                                                    startDate={datePickerStartDate}
                                                    endDate={datePickerEndDate}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* End DatePicker Filter */}
                                <button
                                    onClick={() => {
                                        handleClickToFilterByTodayDate()
                                    }}
                                    className="bg-[#D3DDDC] w-full md:w-auto text-[#1C2928] font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-between md:justify-center items-center"
                                >
                                    <p>TODAY</p>
                                </button>
                            </div>
                        )}
                    </div>

                    {userInfo && <CalendarPageSessions sessions={filteredSessionsByLocation} />}

                    {/* {!userInfo && (
                        <div className="flex flex-col items-center justify-center w-full h-full mb-10">
                            You need to be connected to see the sessions.
                        </div>
                    )} */}

                    {!userInfo && (
                        <div className="bg-gray-200 px-5 py-6 rounded-md">
                            <p className="text-center">You need to connect your Passport to see the sessions.</p>
                        </div>
                    )}

                    <ContactModal isOpen={openContactModal} closeModal={setOpenContactModal} />
                </div>
            </div>
        </BaseTemplate>
    )
}

export default CalendarPage
