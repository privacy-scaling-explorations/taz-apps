/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useRef, useState, useCallback } from "react"

import NextImage from "next/image"
import Link from "next/link"

import moment from "moment"
import DatePicker from "react-datepicker"
import AddSessionModal from "../../components/AddSessionModal"
import Sessions from "../../components/Sessions"
import { EventsDTO, SessionsDTO } from "../../types"
import BaseTemplate from "../Base"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import StyledDatePicker from "../../components/StyledDatePicker"

type Props = {
    event: EventsDTO
    sessions: SessionsDTO[]
}

const EventPage = ({ event, sessions }: Props) => {
    const wraperRef = useRef(null)
    const { isAuth, userRole } = useUserAuthenticationContext()
    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [speakers, setSpeakers] = useState<string[]>([])

    const localtionRef = useRef(null)
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [locationsOptions, setLocationsOptions] = useState<string[]>([])

    const [openLocationFilter, setOpenLocationFilter] = useState(false)

    const isOrganizer = userRole === "resident"

    const startDate = moment(new Date(event.startDate)).add(1, "day")
    const endDate = moment(new Date(event.endDate)).add(1, "day")
    const formattedDate = `${startDate.format("MMM D")}-${endDate.format("D, YYYY")}`

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
        console.log("selectedDates: ", selectedDates)
        const [start, end] = selectedDates
        setDatePickerStartDate(start)
        setDatePickerEndDate(end)
        const filtered = sessions.filter((session) => {
            const sessionDate = new Date(session.startDate)
            sessionDate.setHours(0, 0, 0, 0) // Remove time part for date comparison
            const endOfDay = end ? new Date(end) : null
            if (endOfDay) {
                endOfDay.setHours(23, 59, 59, 999) // Set end date to end of day
            }
            return (start === null || start <= sessionDate) && (endOfDay === null || sessionDate <= endOfDay)
        })
        setFilteredSessions(filtered)
    }

    // Update filter header description
    // (done in useEffect because start and end date must be done updating first)
    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (datePickerStartDate?.getTime() === today.getTime() && datePickerEndDate?.getTime() === today.getTime()) {
            setDatePickerDescription("TODAY")
        } else if (datePickerStartDate?.getTime() === today.getTime()) {
            setDatePickerDescription("TODAY ONWARD")
        } else if (datePickerStartDate && datePickerEndDate === null) {
            setDatePickerDescription(`${moment(datePickerStartDate).format("MMMM D")} ONWARD`)
        } else if (
            datePickerStartDate &&
            datePickerEndDate &&
            datePickerStartDate.getTime() === datePickerEndDate.getTime()
        ) {
            setDatePickerDescription(moment(datePickerStartDate).format("dddd MMMM D"))
        } else if (datePickerStartDate && datePickerEndDate) {
            setDatePickerDescription(
                `${moment(datePickerStartDate).format("MMMM D")} - ${moment(datePickerEndDate).format("D")}`
            )
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
    /* End DatePicker code */

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

    /* Begin DateList code */
    // const [openFilterOptions, setOpenFilterOptions] = useState(false)
    // const filterSince = new Date(event.startDate)
    // const filterAfter = new Date(event.endDate)
    // const dateOptions = []
    // for (let date = filterSince; date <= filterAfter; date.setDate(date.getDate() + 1)) {
    //     const option = moment(new Date(date)).add(1, "day").format("dddd, MMMM Do, YYYY")
    //     dateOptions.push(option)
    // }

    // const handleOptionChange = (option: string) => {
    //     if (selectedOptions.includes(option)) {
    //         setSelectedOptions(selectedOptions.filter((item) => item !== option))
    //     } else {
    //         setSelectedOptions([...selectedOptions, option])
    //     }
    // }

    // const filteredSessions =
    //     selectedOptions.length !== 0
    //         ? sessions.filter((item) => {
    //               const sessionDate = moment(new Date(item.startDate)).add(1, "day").format("dddd, MMMM Do, YYYY")

    //               return selectedOptions.includes(sessionDate)
    //           })
    //         : sessions

    // const handleClickOutside = (e: MouseEvent) => {
    //     const { current: wrap } = wraperRef as { current: HTMLElement | null }

    //     if (wrap && !wrap.contains(e.target as Node)) {
    //         setOpenFilterOptions(false)
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside)

    //     return () => {
    //         document.addEventListener("mousedown", handleClickOutside)
    //     }
    // }, [])
    /* End DateList code */

    const filterSpeakers = () => {
        const speakers = sessions.map((item) => {
            const sessionSpeakers = item.team_members.filter((item) => item.role === "Speaker").map((item) => item.name)
            return sessionSpeakers
        })
        const uniqueSpeakers = Array.from(new Set(speakers.flat()))
        setSpeakers(uniqueSpeakers)
    }

    useEffect(() => {
        filterSpeakers()
    }, [])

    return (
        <BaseTemplate>
            <div className="flex flex-col p-5 bg-[#EEEEF0] gap-5 w-full h-full">
                <div className="flex flex-col md:flex-row justify-between p-5 bg-white rounded-[16px]">
                    <div className="flex items-center gap-2 mb-5 md:mb-0 text-[12px] md:text-[14px]">
                        <Link href="/events">
                            <a className={`text-[#1C292899]`}>Events</a>
                        </Link>
                        <h1 className={`text-[#1C292899]`}>/</h1>
                        <h1 className={`text-black font-[600]`}>{`${event.name}`}</h1>
                    </div>
                    <div className="flex flex-col w-auto md:flex-row gap-4 md:gap-[8px] justify-end items-start md:items-center">
                        <a className="w-full md:w-auto" href={event.apply_form} target="_blank">
                            <div className="w-full md:w-auto justify-center text-center md:w-auto bg-white border border-primary py-[8px] px-[5px] md:px-[15px] text-zulalu-primary font-[600] rounded-[8px] text-[12px] md:text-[16px]">
                                <p>APPLY NOW</p>
                            </div>
                        </a>
                        <button className="w-full md:w-auto justify-center text-center bg-white border border-primary py-[8px] px-[5px] md:px-[15px] text-zulalu-primary font-[600] rounded-[8px] text-[12px] md:text-[16px]">
                            CONTACT ORGANIZERS
                        </button>
                        <button className="w-full md:w-auto justify-center text-center flex gap-1 items-center bg-zulalu-primary text-white py-[8px] px-[5px] md:px-[15px] font-[600] rounded-[8px] text-[12px] md:text-[16px]">
                            <NextImage src={"/ticket.svg"} width={13} height={12} />
                            TICKETS COMING SOON
                        </button>
                        {/* <a href={event.publicUrl} target="_blank">
                            <div className="bg-zulalu-primary text-white py-[8px] px-[16px] text-[12px] md:text-[16px] rounded-[8px] gap-[8px] flex flex-row items-center justify-center hover:bg-zulalu-primary-light cursor-pointer">
                                <NextImage src={"/ticket.svg"} width={13} height={12} />
                                <p>TICKETS</p>
                            </div>
                        </a> */}
                        {/* {session && session.data.user.user_metadata.event === event.name ? (
                            <button
                                className="text-[#F8FFFE] bg-[#35655F] rounded-[8px] flex flex-row justify-center items-center py-[8px] px-[16px] flex flex-row gap-[8px]"
                                onClick={() => setUpdateEventModal(true)}
                            >
                                <NextImage src={"/pencil.svg"} width={13} height={12} />
                                <p>EDIT</p>
                            </button>
                        ) : (
                            ""
                        )} */}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row w-full justify-start bg-white rounded-[16px] h-full">
                    <div className="hidden md:flex h-full max-w-[1014px] w-full rounded-l-[16px] overflow-hidden">
                        <NextImage
                            src={event.image_url}
                            objectFit="cover"
                            alt="event-image"
                            width="1014px"
                            height="682px"
                        />
                    </div>
                    <div className="flex flex-col w-full lg:w-2/6 pl-5 pr-20 md:mb-0 mb-10">
                        <div className="flex my-5 w-full">
                            <h1 className="text-black text-[52px] font-[600]">{`${event.name.substring(0, 30)}...`}</h1>
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex gap-1 items-center justify-start">
                                <NextImage src={"/vector-calendar.svg"} alt="calendar" width={15} height={15} />
                                <h1 className="text-zulalu-secondary">{formattedDate}</h1>
                            </div>
                            <h1>
                                Join us for presentations, workshops, and roundtables to discuss beginner ZK, ZK for
                                biohackers, new proving systems and more.
                            </h1>
                        </div>
                        <div className="flex flex-col mt-10 gap-5">
                            <h1 className="text-black text-[24px]">Speakers</h1>

                            <div className="flex flex-wrap gap-[24px]">
                                {speakers.map((speaker, idx) => (
                                    <div className="flex gap-2 bg-gray-200 rounded-[4px] px-3 py-1" key={idx}>
                                        <img src="/user-icon-4.svg" className="w-[24px] h-[24px]" />
                                        <h1 className="capitalize">{speaker}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:hidden h-full max-w-[1014px] w-full rounded-[16px] overflow-hidden">
                    <NextImage
                        src={event.image_url}
                        objectFit="cover"
                        alt="event-image"
                        width="1014px"
                        height="682px"
                    />
                </div>
                {isAuth && isOrganizer && (
                    <button
                        className="flex md:hidden flex-row font-[600] w-full justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                        onClick={() => setOpenAddSessionModal(true)}
                    >
                        CREATE SESSION
                    </button>
                )}
                <div className="flex flex-col items-center pt-[16px] px-[18px] md:px-[32px] pb-[40px] bg-white gap-[8px] rounded-[16px]">
                    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-0 md:p-[16px] gap-[24px]">
                        <h1 className="text-[24px] md:text-[40px] text-[#37352F] font-[600]">Sessions</h1>
                        {isAuth && isOrganizer && (
                            <button
                                className="hidden md:flex flex-row font-[600] w-[300px] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                                onClick={() => setOpenAddSessionModal(true)}
                            >
                                CREATE SESSION
                            </button>
                        )}
                        <AddSessionModal
                            closeModal={setOpenAddSessionModal}
                            isOpen={openAddSessionModal}
                            event={event}
                            sessions={sessions}
                        />
                        <div className="flex flex-col md:flex-row justify-center md:justify-end items:start md:items-center gap-2 md:gap-2 w-full">
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

                            {/* Begin DateList Filter */}
                            {/* <div className="flex flex-col relative w-[auto]" ref={datePickerWrapperRef}>
                                <button
                                    onClick={() => setOpenFilterOptions(!openFilterOptions)}
                                    className="flex justify-between uppercase bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center"
                                >
                                    <p>{formattedDate}</p>
                                    <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                                </button>
                                {openFilterOptions && (
                                    <div className="flex z-[10] flex-col gap-3 bg-white border w-full py-[8px] px-[16px] border-primary absolute top-[45px] text-zulalu-primary rounded-[8px]">
                                        {dateOptions.map((item, index) => (
                                            <label key={index} className="flex w-full items-center gap-2 capitalize">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox"
                                                    value="value"
                                                    checked={selectedOptions.includes(item)}
                                                    onChange={() => handleOptionChange(item)}
                                                />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div> */}
                            {/* End DateList Filter */}
                        </div>
                    </div>
                    <Sessions event={event} sessions={filteredSessionsByLocation} />
                </div>
            </div>
        </BaseTemplate>
    )
}

export default EventPage
