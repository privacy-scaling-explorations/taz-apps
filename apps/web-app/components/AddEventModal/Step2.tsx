/* eslint-disable prefer-const */

// import { useState } from "react"

type Props = {
    setSteps: (step: number) => void
    newTicket: {
        name: string
        price: string
        description: string
    }
    setNewTicket: (newTicket: { name: string; price: string; description: string }) => void
    ticketAmount: number
    setTicketAmount: Function
}

const Step2 = ({ setSteps, newTicket, setNewTicket, ticketAmount, setTicketAmount }: Props) => {
    const { name, price, description } = newTicket
    // const [pretixTickets, setPretixTickets] = useState([])
    const handleSubmit = async () => {
        console.log(newTicket)
        setSteps(3)
    }
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="name">Ticket Name</label>
                <input
                    className="border border-2 p-1"
                    type="text"
                    id="name"
                    placeholder="ticket name"
                    value={name}
                    onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="price">Ticket Price</label>
                <input
                    className="border border-2 p-1"
                    type="text"
                    id="price"
                    placeholder="ticket price"
                    value={price}
                    onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="startTime">Description</label>
                <input
                    className="border border-2 p-1"
                    type="text"
                    id="description"
                    placeholder="ticket description"
                    value={description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                />
                <div className="flex flex-col gap-1 my-1">
                    <label htmlFor="amount">Amount of seats</label>
                    <input
                        className="border border-2 mx-2"
                        id="amount"
                        type="number"
                        min="0"
                        max="1000"
                        value={ticketAmount}
                        onChange={(e) => setTicketAmount(e.target.value)}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-12 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                    onClick={() => setSteps(1)}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-12 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                    onClick={handleSubmit}
                >
                    Next Step
                </button>
            </div>
        </div>
    )
}

export default Step2
