/* eslint-disable prefer-const */
import { ComponentType, useEffect, useRef, useState } from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import NextImage from "next/image"
import { stateToHTML } from "draft-js-export-html"
import { EditorState } from "draft-js"
import MaskedInput from "react-text-mask"
import { EditorProps } from "react-draft-wysiwyg"
import dynamic from "next/dynamic"

import { TracksDTO, FormatDTO, LevelDTO, LocationDTO, EventTypeDTO, SessionsDTO } from "../../types"

type NewSessionState = {
    description: string
    equipment: string
    event_id: number
    event_item_id: number
    event_slug: string
    event_type: string
    format: string
    hasTicket: boolean
    info: string
    duration: string
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

// @ts-ignore
const DynamicEditor = dynamic<EditorProps>(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
    ssr: false,
    loading: () => <div>Loading Editor...</div>
})

const Step1 = ({ newSession, setNewSession, setSteps, sessions }: Props) => {
    const { name, team_members, startDate, tags, startTime, duration, custom_location, location } = newSession
    const [teamMember, setTeamMember] = useState({ name: "", role: "Speaker" })
    const [tag, setTag] = useState("")
    const [rerender, setRerender] = useState(true)
    const [display, setDisplay] = useState(false)
    const [tracksOpt, setTracksOpt] = useState<TracksDTO[]>()
    const [formatsOpt, setFormatsOpt] = useState<FormatDTO[]>()
    const [levelsOpt, setLevelsOpt] = useState<LevelDTO[]>()
    const [locationsOpt, setLocationsOpt] = useState<LocationDTO[]>()
    const [eventTypesOpt, setEventTypesOpt] = useState<EventTypeDTO[]>()

    const wraperRef = useRef(null)

    const [richTextEditor, setRichTextEditor] = useState<EditorState>(EditorState.createEmpty())

    const onEditorStateChange = (editorState: EditorState) => {
        setRichTextEditor(editorState)
        const html = stateToHTML(editorState.getCurrentContent())

        setNewSession({ ...newSession, description: html })
    }

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

    const isOverlapping = ({ filteredSeshs }: { filteredSeshs: SessionsDTO[] }) => {
        const formatDate = moment.utc(newSession.startDate).format("YYYY-MM-DD")
        const newSessionStart = moment.utc(`${formatDate}T${newSession.startTime}`)
        const newSessionEnd = newSessionStart.clone().add(newSession.duration, "minutes")

        for (const idx of filteredSeshs) {
            const sessionStart = moment.utc(`${idx.startDate}T${idx.startTime}`)
            const sessionEnd = sessionStart.clone().add(idx.duration, "minutes")

            if (
                (newSessionStart.isSameOrAfter(sessionStart) && newSessionStart.isBefore(sessionEnd)) ||
                (newSessionEnd.isAfter(sessionStart) && newSessionEnd.isSameOrBefore(sessionEnd)) ||
                (newSessionStart.isSameOrBefore(sessionStart) && newSessionEnd.isSameOrAfter(sessionEnd))
            ) {
                return true
            }
        }

        return false
    }

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

        const selectedLocation = newSession.location.toLocaleLowerCase()

        const filteredSeshs = sessions
            .filter((item) => item.location.toLocaleLowerCase() === selectedLocation)
            .filter((item) => {
                const formatDate = moment.utc(newSession.startDate).format("YYYY-MM-DD")

                const selectedDate = moment.utc(formatDate)
                const newSessionStartDate = moment.utc(item.startDate)

                return selectedDate.isSame(newSessionStartDate)
            })

        if (isOverlapping({ filteredSeshs })) {
            return toast.error("Session already booked on that Date and Time.", {
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
        setSteps(2)
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
                <div className="w-full h-[400px] p-4 border border-gray-300 rounded overflow-scroll">
                    {richTextEditor && (
                        // @ts-ignore
                        <DynamicEditor
                            editorState={richTextEditor}
                            onEditorStateChange={onEditorStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full mt-5">
                <label htmlFor="location" className="font-[600]">
                    Location*
                </label>
                <select
                    id="location"
                    value={location}
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
                {location === "Other" ? (
                    <div className="flex flex-col gap-1 w-full mt-2">
                        <label htmlFor="custom_location" className="font-[600]">
                            Specify location
                        </label>
                        <input
                            type="text"
                            placeholder="Specify Location"
                            className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                            value={custom_location}
                            onChange={(e) => setNewSession({ ...newSession, custom_location: e.target.value })}
                        />
                    </div>
                ) : (
                    ""
                )}
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

            <div className="flex flex-row w-full gap-5 my-2">
                <div className="flex flex-col w-3/6">
                    <label htmlFor="startTime" className="font-[600]">
                        Start Time* (24h format)
                    </label>
                    <MaskedInput
                        id="startTime"
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                        mask={[/\d/, /\d/, ":", /\d/, /\d/]}
                        value={startTime}
                        onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                        placeholder="18:00"
                    />
                </div>
                <div className="flex flex-col w-3/6">
                    <label htmlFor="duration" className="font-[600]">
                        Duration* (Minutes)
                    </label>
                    <input
                        type="text"
                        id="duration"
                        placeholder="60m"
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full"
                        value={duration}
                        onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                    />
                </div>
            </div>

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
                <label htmlFor="tags">Track:</label>
                <select
                    id="track"
                    name="track"
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                    onChange={(e) => setNewSession({ ...newSession, track: e.target.value })}
                    value={newSession.track}
                >
                    {tracksOpt &&
                        tracksOpt.map((item, index) => (
                            <option key={index} value={item.type}>
                                {item.type}
                            </option>
                        ))}
                </select>
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
            <div className="w-full flex flex-col my-10 items-start">
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

export default Step1
