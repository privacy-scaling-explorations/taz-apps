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
    const { endDate, endTime, info, location, name, organizers, team_members, startDate, startTime, tags } =
        newSession

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
                <label htmlFor="name">Event Name</label>
                <input
                    className="border border-2 p-1"
                    type="text"
                    id="name"
                    placeholder="event name"
                    value={name}
                    onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
                />
            </div>
            <div className="flex flex-col md:flex-row justify-start gap-4 my-2">
                <div className="flex flex-col w-full">
                    <label>Event Start</label>
                    <DatePicker
                        className="border border-2 p-1 w-full"
                        selected={startDate}
                        onChange={(date) => setNewSession({ ...newSession, startDate: date as Date })}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="startTime">Time</label>
                    <input
                        className="border border-2 p-1"
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
                    <label>Event End</label>
                    <DatePicker
                        className="border border-2 p-1 w-full"
                        selected={endDate}
                        onChange={(date) => setNewSession({ ...newSession, endDate: date as Date })}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="endTime">Time</label>
                    <input
                        className="border border-2 p-1"
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="location">Location:</label>
                <select
                    id="location"
                    name="location"
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
            <div className="flex flex-col gap-1 my-2 w-full">
                <label htmlFor="team-members">Team Members:</label>
                <div className="flex flex-row gap-4">
                    <input
                        id="tags"
                        type="text"
                        className="border border-2 p-1 w-full"
                        placeholder="Add team member"
                        value={teamMember.name}
                        onChange={(e) => setTeamMember({ ...teamMember, name: e.target.value })}
                    />
                    <div>
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            onChange={(e) => setTeamMember({ ...teamMember, role: e.target.value })}
                        >
                            <option value="Speaker">Speaker</option>
                            <option value="Organizer">Organizer</option>
                            <option value="Facilitator">Facilitator</option>
                        </select>
                    </div>

                    <button
                        className="lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                        onClick={() => handleAddTeamMember()}
                    >
                        Add
                    </button>
                    <ul className="flex flex-row items-start">
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
            <div className="flex flex-col gap-1 my-2 w-full">
                <label htmlFor="tags">Tags</label>

                <div className="flex flex-row gap-4">
                    <input
                        id="tags"
                        type="text"
                        className="border border-2 p-1 w-full"
                        placeholder="add tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />

                    <button
                        className="lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                        onClick={() => handleAddTag()}
                    >
                        Add
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
            <div className="w-full flex flex-col items-center">
                <button
                    type="button"
                    className="w-[200px] lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => setSteps(2)}
                >
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default Step1
