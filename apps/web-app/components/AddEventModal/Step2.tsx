import { useState } from "react"

type NewTicketsState = {
    name: string
    price: string
    description: string
    amount: string
}

type Props = {
    setSteps: (step: number) => void
    newTickets: NewTicketsState[]
    setNewTickets: (newTickets: NewTicketsState[]) => void
}

const Step2 = ({ setSteps, newTickets, setNewTickets }: Props) => {
    const [pretixTickets, setPretixTickets] = useState({
        name: "",
        price: "",
        description: "",
        amount: "0"
    })

    const handleSubmit = async () => {
        const newArr = [...newTickets]
        newArr.push(pretixTickets)

        setNewTickets(newArr)
        // setSteps(3)
    }

    const handleRemoveTicket = (idx: number) => {
        const newArr = [...newTickets]
        newArr.splice(idx, 1)

        setNewTickets(newArr)
    }

    return (
        <div className="gap-20 flex flex-col overflow-y-scroll">
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-1 my-1 w-full">
                    <label htmlFor="name">Ticket Name</label>
                    <input
                        className="border border-2 p-1"
                        type="text"
                        id="name"
                        placeholder="ticket name"
                        value={pretixTickets.name}
                        onChange={(e) => setPretixTickets({ ...pretixTickets, name: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-1 my-1 w-full">
                    <label htmlFor="price">Ticket Price</label>
                    <input
                        className="border border-2 p-1"
                        type="number"
                        id="price"
                        placeholder="ticket price"
                        value={pretixTickets.price}
                        onChange={(e) => setPretixTickets({ ...pretixTickets, price: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-1 my-1 w-full">
                    <label htmlFor="startTime">Description</label>
                    <input
                        className="border border-2 p-1"
                        type="text"
                        id="description"
                        placeholder="ticket description"
                        value={pretixTickets.description}
                        onChange={(e) => setPretixTickets({ ...pretixTickets, description: e.target.value })}
                    />
                    <div className="flex flex-col gap-1 my-1">
                        <label htmlFor="amount">Amount of seats</label>
                        <input
                            className="border border-2 mx-2"
                            id="amount"
                            type="number"
                            min="0"
                            max="1000"
                            value={pretixTickets.amount}
                            onChange={(e) => setPretixTickets({ ...pretixTickets, amount: e.target.value })}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                    <button
                        type="button"
                        className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-12 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Add Ticket
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1>Tickets to be Add</h1>
                <div className="py-5 flex flex-wrap gap-2 justify-center w-full">
                    {newTickets.length > 0 ? (
                        newTickets.map((ticket, index) => (
                            <div
                                className="relative bg-brand-beige2 p-5 rounded-md w-[200px] border border-brand-blue"
                                key={index}
                            >
                                <h1>{ticket.name}</h1>
                                <h1>${ticket.price}</h1>
                                <h1>{ticket.description}</h1>
                                <h1>{ticket.amount} Tickets</h1>
                                <button className="absolute top-0 right-2" onClick={() => handleRemoveTicket(index)}>
                                    x
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            <h1>No tickets to be add</h1>
                        </div>
                    )}
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
                        onClick={() => setSteps(3)}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Step2
