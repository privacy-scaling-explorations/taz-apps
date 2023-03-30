/* eslint-disable prefer-const */

import { useEffect, useRef, useState } from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import NextImage from "next/image"
import { IoMdArrowBack } from "react-icons/io"

import { UserDTO, TracksDTO, FormatDTO, LevelDTO, LocationDTO, EventTypeDTO, SessionsDTO } from "../../types"

type NewSessionState = {
    description: string
    equipment: string
    event_id: number
    event_item_id: number
    event_slug: string
    event_type: string
    duration: string
    format: string
    hasTicket: boolean
    info: string
    level: string
    location: string
    custom_location: string
    name: string
    startDate: Date
    startTime: string
    tags: string[]
    team_members: {
        name: string
        role: string
    }[]
    track: string
}

type Props = {
    newSession: NewSessionState
    setNewSession: (newEvent: NewSessionState) => void
    setSteps: (steps: number) => void
    sessions: SessionsDTO[]
}

const Step2 = ({ newSession, setNewSession, setSteps, sessions }: Props) => {
    const { name, team_members, startDate, tags, description } = newSession
    const [teamMember, setTeamMember] = useState({ name: "", role: "Speaker" })
    const [tag, setTag] = useState("")
    const [rerender, setRerender] = useState(true)
    // const [suggestions, setSuggestions] = useState<UserDTO[]>([])
    const [display, setDisplay] = useState(false)
    const [tracksOpt, setTracksOpt] = useState<TracksDTO[]>()
    const [formatsOpt, setFormatsOpt] = useState<FormatDTO[]>()
    const [levelsOpt, setLevelsOpt] = useState<LevelDTO[]>()
    const [locationsOpt, setLocationsOpt] = useState<LocationDTO[]>()
    const [eventTypesOpt, setEventTypesOpt] = useState<EventTypeDTO[]>()

    const [durationsOpt, setDurationsOpt] = useState([
        {
            time: "15",
            disabled: false
        },
        {
            time: "30",
            disabled: false
        },
        {
            time: "45",
            disabled: false
        },
        {
            time: "60",
            disabled: false
        },
        {
            time: "75",
            disabled: false
        },
        {
            time: "90",
            disabled: false
        },
        {
            time: "105",
            disabled: false
        },
        {
            time: "120",
            disabled: false
        }
    ])

    const [slotsUnavailable, setSlotsUnavailable] = useState(
        Array.from(Array(45), (_, index) => {
            const hour = Math.floor(index / 4) + 9
            const minute = (index % 4) * 15
            return {
                time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
                disabled: false
            }
        })
    )

    const wraperRef = useRef(null)

    const handleAddTeamMember = () => {
        setNewSession({ ...newSession, team_members: [...newSession.team_members, teamMember] })
        setTeamMember({ name: "", role: "Speaker" })
        setDisplay(false)
    }

    const handleRemoveTeamMember = (index: number) => {
        team_members.splice(index, 1)
        setRerender(!rerender)
    }

    const handleAddTag = () => {
        setNewSession({ ...newSession, tags: [...newSession.tags, tag] })
        setTag("")
    }

    const handleRemoveTag = (e: any, index: number) => {
        e.preventDefault()
        tags.splice(index, 1)
        setRerender(!rerender)
    }

    const handleClickOutside = (event: MouseEvent) => {
        const { current: wrap } = wraperRef as { current: HTMLElement | null }

        if (wrap && !wrap.contains(event.target as Node)) {
            setDisplay(false)
        }
    }

    const fetchTraks = async () => {
        await axios
            .get("/api/fetchTracks")
            .then((res) => {
                setTracksOpt(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchLevels = async () => {
        await axios
            .get("/api/fetchLevels")
            .then((res) => {
                setLevelsOpt(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchEventTypes = async () => {
        await axios
            .get("/api/fetchEventTypes")
            .then((res) => {
                setEventTypesOpt(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchFormats = async () => {
        await axios
            .get("/api/fetchFormats")
            .then((res) => {
                setFormatsOpt(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchLocations = async () => {
        await axios
            .get("/api/fetchLocations")
            .then((res) => {
                setLocationsOpt(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        Promise.all([fetchLevels(), fetchEventTypes(), fetchFormats(), fetchLocations(), fetchTraks()])
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const selectedLocation = newSession.location.toLocaleLowerCase()

        const filteredSession = sessions
            .filter((item) => item.location.toLocaleLowerCase() === selectedLocation)
            .filter((item) => {
                const selectedDate = moment(new Date(newSession.startDate)).format("MMM d, yyyy")
                const newSessionStartDate = moment(new Date(item.startDate)).add(1, "day").format("MMM d, yyyy")

                return selectedDate === newSessionStartDate
            })

        if (filteredSession.length > 0) {
            const intervals: string[] = []
            filteredSession.forEach((item) => {
                const [hours, minutes] = item.startTime.split(":").map(Number)

                const startTimeFormatted = moment({ hours, minutes })

                const endTime = moment({ hours, minutes }).add(parseInt(item.duration), "minute")

                let current = startTimeFormatted.clone()
                while (current.isSameOrBefore(endTime)) {
                    intervals.push(current.format("HH:mm"))
                    current.add(15, "minutes")
                }
            })

            const newSlots = slotsUnavailable.map((i) => {
                if (intervals.includes(i.time)) {
                    return {
                        ...i,
                        disabled: true
                    }
                }

                return i
            })

            setSlotsUnavailable(newSlots)
        } else {
            setSlotsUnavailable((prevState) =>
                prevState.map((slot) => ({
                    ...slot,
                    disabled: false
                }))
            )
        }
    }, [newSession])

    const handleNextStep = () => {
        if (
            newSession.name.length === 0 ||
            newSession.description.length === 0 ||
            newSession.location === "" ||
            newSession.team_members.length === 0 ||
            newSession.startTime === "00"
        ) {
            return toast.error("Please fill all inputs required.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }

        if (newSession.duration === "0") {
            return toast.error("Please fill duration time field.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
        const [hours, minutes] = newSession.startTime.split(":").map(Number)
        const startTimeFormatted = moment({ hours, minutes })
        const endTime = moment(startTimeFormatted).add(parseInt(newSession.duration), "minute")

        let current = startTimeFormatted.clone()
        let interval: string[] = []
        while (current.isBefore(endTime)) {
            slotsUnavailable.map((i) => {
                if (i.time === current.format("HH:mm") && i.disabled === true) {
                    return interval.push(i.time)
                }
            })
            current.add(15, "minutes")
        }

        if (interval.length > 0) {
            return toast.error("Session is already booked. Decrease time duration", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }

        setSteps(3)
    }

    return (
        <div className="flex flex-col w-full">
            <ToastContainer
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
            />
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="name" className="font-[600]">
                    Title*
                </label>
                <input
                    className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px]"
                    type="text"
                    id="name"
                    placeholder="Event name"
                    value={name}
                    onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="info" className="font-[600]">
                    Description*
                </label>
                <textarea
                    className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[150px]"
                    id="info"
                    placeholder="What will be covered during the session ?"
                    value={description}
                    maxLength={2000}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                />
                <div className="flex w-full justify-end">
                    <h1 className="text-[14px] text-[#AAAAAA]">Max 2000 characters</h1>
                </div>
            </div>
            {newSession.event_id != 101 ? (
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="location" className="font-[600]">
                        Location*
                    </label>
                    <select
                        id="location"
                        name="location"
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                        onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                    >
                        <option value="Select Location">Select Location</option>
                        {locationsOpt &&
                            locationsOpt.map((item, index) => (
                                <option key={index} value={item.location}>
                                    {item.location}
                                </option>
                            ))}
                    </select>
                </div>
            ) : (
                ""
            )}

            {newSession.location == "Other" ? (
                <div className="flex flex-col gap-1 w-full mt-2">
                    <label htmlFor="custom_location" className="font-[600]">
                        Specify location
                    </label>
                    <input
                        type="text"
                        placeholder="Specify Location"
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                        value={newSession.custom_location}
                        onChange={(e) => setNewSession({ ...newSession, custom_location: e.target.value })}
                    />
                </div>
            ) : (
                ""
            )}

            <div className="flex flex-col gap-1 w-full mt-2">
                <label htmlFor="location" className="font-[600]">
                    Duration*
                </label>
                <select
                    id="location"
                    name="location"
                    value={newSession.duration}
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                    onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                >
                    <option value="0">Select Duration</option>
                    {durationsOpt.map((duration, index) => {
                        const formatted = moment.duration(duration.time, "minutes")
                        const hours = formatted.hours()
                        const mins = formatted.minutes()
                        return (
                            <option key={index} value={duration.time} disabled={duration.disabled}>{`${`${
                                hours === 0 ? "" : `${hours}h`
                            }${mins}m`}`}</option>
                        )
                    })}
                </select>
            </div>
            <div className="flex flex-col justify-start my-2">
                <label className="font-[600]">Start Date*</label>
                <DatePicker
                    className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px] w-full"
                    selected={startDate}
                    onChange={(e) => setNewSession({ ...newSession, startDate: e as Date })}
                    minDate={moment().toDate()}
                />
            </div>

            {newSession.location !== "Select Location" && newSession.location !== "" && (
                <div className="flex flex-col justify-start my-2">
                    <label className="font-[600]">Time Slot*</label>
                    <select
                        id="location"
                        name="location"
                        value={newSession.startTime}
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                        onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                    >
                        <option value="00">Select Slot</option>
                        {slotsUnavailable.map((slot, index) => (
                            <option key={index} value={slot.time} disabled={slot.disabled}>{`${slot.time}:00-${
                                slot.time > "12" ? "PM" : "AM"
                            }`}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex flex-col gap-4 w-full my-8">
                <div className="flex flex-col md:flex-row w-full gap-4">
                    <div className="flex flex-col md:w-3/6 w-full">
                        <label htmlFor="team-members" className="font-[600]">
                            Organizers*
                        </label>
                        <input
                            id="tags"
                            type="text"
                            className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                            placeholder="Add team member"
                            value={teamMember.name}
                            onChange={(e) => setTeamMember({ ...teamMember, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-3/6">
                        <label htmlFor="role" className="font-[600]">
                            Role*
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                            onChange={(e) => setTeamMember({ ...teamMember, role: e.target.value })}
                        >
                            <option value="Speaker">Speaker</option>
                            <option value="Organizer">Organizer</option>
                            <option value="Facilitator">Facilitator</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <button
                        className="flex flex-row font-[600] w-full justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                        onClick={() => handleAddTeamMember()}
                    >
                        ADD
                    </button>
                    <ul className="flex flex-row items-center">
                        {team_members.map((item, index) => (
                            <div
                                className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px] mr-[8px] cursor-pointer"
                                key={index}
                                onClick={() => handleRemoveTeamMember(index)}
                            >
                                {item.role === "Speaker" && (
                                    <NextImage src={"/user-icon-6.svg"} alt="user-icon-6" width={24} height={24} />
                                )}
                                {item.role === "Organizer" && (
                                    <NextImage src={"/user-icon-4.svg"} alt="user-icon-6" width={24} height={24} />
                                )}
                                {item.role === "Facilitator" && (
                                    <NextImage src={"/user-icon-5.svg"} alt="user-icon-6" width={24} height={24} />
                                )}
                                <p className="text-[#1C2928] font-[400] text-[16px]">
                                    {item.role}: <span className="font-[600] capitalize">{item.name}</span>
                                </p>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full mb-8">
                <div className="flex flex-col gap-4">
                    <label htmlFor="tags" className="font-[600]">
                        Tags
                    </label>
                    <input
                        id="tags"
                        type="text"
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                        placeholder="add tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />

                    <button
                        className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                        onClick={() => handleAddTag()}
                    >
                        ADD
                    </button>
                </div>
                <ul className="flex flex-row items-center">
                    {newSession.tags.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#E4EAEA] py-[4px] px-[8px] text-sm rounded-[4px] cursor-pointe mr-[8px] cursor-pointer"
                            onClick={(e) => handleRemoveTag(e, index)}
                        >
                            {item}
                        </div>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="tags">Format:</label>
                <select
                    id="format"
                    name="format"
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                    onChange={(e) => setNewSession({ ...newSession, format: e.target.value })}
                >
                    {formatsOpt &&
                        formatsOpt.map((item, index) => (
                            <option key={index} value={item.format}>
                                {item.format}
                            </option>
                        ))}
                </select>
            </div>
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                    onChange={(e) => setNewSession({ ...newSession, event_type: e.target.value })}
                >
                    {eventTypesOpt &&
                        eventTypesOpt.map((item, index) => (
                            <option key={index} value={item.type}>
                                {item.type}
                            </option>
                        ))}
                    <option value="Workshop">Workshop</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="level">Experience Level:</label>
                <select
                    id="level"
                    name="level"
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                    onChange={(e) => setNewSession({ ...newSession, level: e.target.value })}
                >
                    {levelsOpt &&
                        levelsOpt.map((item, index) => (
                            <option key={index} value={item.level}>
                                {item.level}
                            </option>
                        ))}
                </select>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-full flex flex-row border-zulalu-primary border font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-white rounded-[8px] text-black text-[16px] mb-5"
                    onClick={() => setSteps(1)}
                >
                    <IoMdArrowBack size={20} />
                    BACK
                </button>
                <button
                    type="button"
                    className="w-full lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => handleNextStep()}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}

export default Step2
