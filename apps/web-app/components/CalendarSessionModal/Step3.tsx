import { useState } from "react"

import { IoMdArrowBack } from "react-icons/io"

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
    name: string
    startDate: Date
    startTime: string
    tags: string[]
    team_members: {
        name: string
        role: string
    }[]
    track: string
    custom_location: string
}

type Props = {
    setSteps: (step: number) => void
    amountTickets: string
    setAmountTickets: Function
    newSession: NewSessionState
    setNewSession: (newEvent: NewSessionState) => void
}

const Step3 = ({ setSteps, amountTickets, setAmountTickets, newSession, setNewSession }: Props) => {
    const handleSubmit = async () => {
        setSteps(4)
    }
    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex flex-col my-2 gap-5">
                <h1 className="text-[18px] font-[600]">How do you want people to show attendance?</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <input
                            type="radio"
                            id="ticket"
                            value="ticket"
                            className="w-[24px] h-[24px]"
                            checked={newSession.hasTicket}
                            onChange={() => setNewSession({ ...newSession, hasTicket: !newSession.hasTicket })}
                        />
                        <label htmlFor="ticket">Ticket</label>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="radio"
                            id="RSVP"
                            value="RSVP"
                            className="w-[24px] h-[24px]"
                            checked={!newSession.hasTicket}
                            onChange={() => setNewSession({ ...newSession, hasTicket: !newSession.hasTicket })}
                        />
                        <label htmlFor="RSVP">RSVP</label>
                    </div>
                </div>
            </div>
            {newSession.hasTicket ? (
                <div className="flex flex-col gap-1 my-1 w-full">
                    <label htmlFor="amount" className="font-[600]">
                        How many tickets?
                    </label>
                    <input
                        className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                        id="amount"
                        type="number"
                        min="0"
                        max="1000"
                        value={amountTickets}
                        onChange={(e) => setAmountTickets(e.target.value)}
                    />
                </div>
            ) : (
                ""
            )}
            <div className="flex flex-col my-2">
                <label htmlFor="equipment" className="font-[600]">
                    Do you need equipment?
                </label>
                <input
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px]"
                    id="equipment"
                    type="text"
                    value={newSession.equipment}
                    onChange={(e) => setNewSession({ ...newSession, equipment: e.target.value })}
                />
            </div>

            <div className="flex flex-col my-2">
                <label htmlFor="info" className="font-[600]">
                    Is there anything else we need to know?
                </label>
                <textarea
                    className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[150px]"
                    placeholder="Your answers will be shared with Zulalu Organizers"
                    name="info"
                    id="info"
                    rows={5}
                    maxLength={2000}
                    value={newSession.info}
                    onChange={(e) => setNewSession({ ...newSession, info: e.target.value })}
                />
                <div className="flex w-full justify-end">
                    <h1 className="text-[14px] text-[#AAAAAA]">Max 2000 characters</h1>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-full flex flex-row border-zulalu-primary border font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-white rounded-[8px] text-black text-[16px]"
                    onClick={() => setSteps(2)}
                >
                    <IoMdArrowBack size={20} />
                    BACK
                </button>
                <button
                    type="button"
                    className="w-full flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={handleSubmit}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}

export default Step3
