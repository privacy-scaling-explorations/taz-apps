/* eslint-disable prefer-const */
import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useRef, useState } from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import { UserDTO } from "../../types"

type NewSessionState = {
    name: string
    organizers: string[]
    team_members: { name: string; role: string }[]
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
    location: string
    tags: string[]
    info: string
    eventId: number
    hasTicket: boolean
    format: string
    level: string
    equipment: string
    track: string
    type: string
}

type Props = {
    newSession: NewSessionState
    setNewSession: (newEvent: NewSessionState) => void
    setSteps: (steps: number) => void
}

const Step1 = ({ newSession, setNewSession, setSteps }: Props) => {
    const [teamMember, setTeamMember] = useState({ name: "", role: "Speaker" })
    const [tag, setTag] = useState("")
    const [rerender, setRerender] = useState(true)
    const [suggestions, setSuggestions] = useState<UserDTO[]>([])
    const [display, setDisplay] = useState(false)
    const wraperRef = useRef(null)
    const { endDate, endTime, info, location, name, organizers, team_members, startDate, startTime, tags } = newSession

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

    const handleRemoveTag = (index: number) => {
        tags.splice(index, 1)
        setRerender(!rerender)
    }

    const handleClickOutside = (event: MouseEvent) => {
        const { current: wrap } = wraperRef as { current: HTMLElement | null }

        if (wrap && !wrap.contains(event.target as Node)) {
            setDisplay(false)
        }
    }

    const fetchUsers = async () => {
        await axios
            .get("/api/fetchUsers")
            .then((res) => {
                setSuggestions(res.data)
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // const checkIfAnyOtherSuggestion =
    //     suggestions
    //         .filter((item) => !organizers.includes(item.userName))
    //         .filter(({ userName }) => userName.toLowerCase().indexOf(organizer.toLowerCase()) > -1).length !== 0

    return (
        <div className="flex flex-col w-full">
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
                    value={info}
                    maxLength={2000}
                    onChange={(e) => setNewSession({ ...newSession, info: e.target.value })}
                />
                <div className="flex w-full justify-end">
                    <h1 className="text-[14px] text-[#AAAAAA]">Max 2000 characters</h1>
                </div>
            </div>
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
                    <option value="Amphitheatre">Amphitheatre</option>
                    <option value="Almara Beach">Almara beach</option>
                    <option value="Ballroom">Ballroom</option>
                    <option value="Board Room">Board Room</option>
                    <option value="Dome">Dome</option>
                    <option value="Kiki's Restaurant inside">Kiki's Restaurant inside</option>
                    <option value="Kiki's Restaurant outside">Kiki's Restaurant outside</option>
                    <option value="Lighthouse">Lighthouse</option>
                    <option value="Gym">Outdoor Gym Deck</option>
                    <option value="Rock Bar">Rock Bar</option>
                    <option value="Tony's Bar">Tony's Bar</option>
                </select>
            </div>
            <div className="flex flex-col md:flex-row justify-start gap-4 my-2">
                <div className="flex flex-col w-full">
                    <label className="font-[600]">Event Start*</label>
                    <DatePicker
                        className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px] w-full"
                        selected={startDate}
                        onChange={(date) => setNewSession({ ...newSession, startDate: date as Date })}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="startTime" className="font-[600]">
                        Time*
                    </label>
                    <input
                        className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px]"
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-start gap-4 my-2">
                <div className="flex flex-col w-full">
                    <label className="font-[600]">Event End*</label>
                    <DatePicker
                        className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px] w-full"
                        selected={endDate}
                        onChange={(date) => setNewSession({ ...newSession, endDate: date as Date })}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="endTime" className="font-[600]">
                        Time*
                    </label>
                    <input
                        className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px]"
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
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
                        <label htmlFor="role">Role:</label>
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
                            <li key={index} className="relative mx-1 bg-gray-200 p-1 rounded text-sm">
                                {item.role}: {item.name}
                                <button
                                    className="absolute top-0 right-0"
                                    onClick={() => handleRemoveTeamMember(index)}
                                >
                                    x
                                </button>
                            </li>
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
                <ul className="flex flex-row items-start">
                    {newSession.tags.map((item, index) => (
                        <li key={index} className="relative mx-1 bg-gray-200 p-1 rounded text-sm">
                            {item}
                            <button className="absolute top-0" onClick={() => handleRemoveTag(index)}>
                                X
                            </button>
                        </li>
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
                >
                    <option value="Zk Week">ZK Week</option>
                    <option value="Public Goods">Public Goods</option>
                    <option value="New Cities & Network States">New Cities & Network States</option>
                    <option value="Longevity 0-1">Longevity 0-1</option>
                    <option value="Synthetic Biology">Synthetic Biology</option>
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
                    <option value="live">Live</option>
                    <option value="online">Online</option>
                    <option value="live-online">Live + Online</option>
                </select>
            </div>
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    name="type"
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                    onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                >
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
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
            <div className="w-full flex flex-col my-10 items-center">
                <button
                    type="button"
                    className="w-full lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => setSteps(2)}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}

export default Step1
