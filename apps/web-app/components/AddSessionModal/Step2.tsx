import { useState } from "react"

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
    setSteps: (step: number) => void
    amountTickets: string
    setAmountTickets: Function
    newSession: NewSessionState
    setNewSession: (newEvent: NewSessionState) => void
}

const Step2 = ({ setSteps, amountTickets, setAmountTickets, newSession, setNewSession }: Props) => {
    const handleSubmit = async () => {
        setSteps(3)
    }
    return (
        <div className="flex flex-col w-full overflow-scroll">
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="tags">Track:</label>
                <select
                    id="track"
                    name="track"
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
                    onChange={(e) => setNewSession({ ...newSession, level: e.target.value })}
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="">How do you want people to show attendance?</label>
                <div>
                    <label htmlFor="ticket">Ticket</label>
                    <input
                        type="radio"
                        id="ticket"
                        value="ticket"
                        checked={newSession.hasTicket}
                        onChange={() => setNewSession({ ...newSession, hasTicket: !newSession.hasTicket })}
                    />
                    <label htmlFor="RSVP">RSVP</label>
                    <input
                        type="radio"
                        id="RSVP"
                        value="RSVP"
                        checked={!newSession.hasTicket}
                        onChange={() => setNewSession({ ...newSession, hasTicket: !newSession.hasTicket })}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="amount">Amount of tickets</label>
                <input
                    className="border border-2 mx-2"
                    id="amount"
                    type="number"
                    min="0"
                    max="1000"
                    value={amountTickets}
                    onChange={(e) => setAmountTickets(e.target.value)}
                />
            </div>

            <div className="flex flex-col my-2">
                <label htmlFor="info">Additional Information</label>
                <textarea
                    className="border border-2 p-1 w-full"
                    placeholder="Additional info"
                    name="info"
                    id="info"
                    rows={5}
                    value={newSession.info}
                    onChange={(e) => setNewSession({ ...newSession, info: e.target.value })}
                />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-[200px] flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => setSteps(1)}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="w-[200px] flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={handleSubmit}
                >
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default Step2
