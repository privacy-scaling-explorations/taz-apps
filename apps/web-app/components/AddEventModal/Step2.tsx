import { useState } from "react"

type TicketsState = {
    name: string
    price: string
    description: string
}

type Props = {
    setSteps: (step: number) => void
    newTickets: TicketsState[]
    setNewTickets: (newTickets: TicketsState[]) => void
    setHasVouchers: Function
    hasVouchers: boolean
    voucher: {
        code: string
        amount: number
        price: number
    }
    setVoucher: Function
    amountTickets: string
    setAmountTickets: Function
}

const Step2 = ({
    setSteps,
    newTickets,
    setNewTickets,
    hasVouchers,
    setHasVouchers,
    voucher,
    setVoucher,
    amountTickets,
    setAmountTickets
}: Props) => {
    const [pretixTicket, setPretixTicket] = useState<TicketsState>({
        name: "",
        price: "",
        description: ""
    })

    const handleAddTicket = () => {
        const isValid = pretixTicket.name && pretixTicket.price
        if (isValid) {
            setNewTickets([...newTickets, pretixTicket])
            setPretixTicket({
                description: "",
                name: "",
                price: ""
            })
        }
    }

    const handleRemoveTicket = (index: number) => {
        let newArr = [...newTickets]
        newArr.splice(index, 1)
        setNewTickets(newArr)
    }

    const handleSubmit = async () => {
        setSteps(3)
    }
    return (
        <div className="flex flex-col w-full overflow-scroll">
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="name">Ticket Name</label>
                <input
                    className="border border-2 p-1"
                    type="text"
                    id="name"
                    placeholder="ticket name"
                    value={pretixTicket.name}
                    onChange={(e) => setPretixTicket({ ...pretixTicket, name: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="price">Ticket Price</label>
                <input
                    className="border border-2 p-1"
                    type="number"
                    min="0"
                    id="price"
                    placeholder="ticket price"
                    value={pretixTicket.price}
                    onChange={(e) => setPretixTicket({ ...pretixTicket, price: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label htmlFor="startTime">Description</label>
                <input
                    className="border border-2 p-1"
                    type="text"
                    id="description"
                    placeholder="ticket description"
                    value={pretixTicket.description}
                    onChange={(e) => setPretixTicket({ ...pretixTicket, description: e.target.value })}
                />
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
            <div className="flex flex-col gap-1 my-1 w-full">
                <div>
                    Create vouchers?
                    <input checked={hasVouchers} type="checkbox" onChange={() => setHasVouchers(!hasVouchers)} />
                </div>
                {hasVouchers ? (
                    <div>
                        <div className="flex flex-col gap-1 my-1">
                            <label htmlFor="amount">Voucher code (has to be atleast 5 characters.)</label>
                            <input
                                className="border border-2 mx-2"
                                id="amount"
                                type="text"
                                value={voucher.code}
                                onChange={(e) => setVoucher({ ...voucher, code: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-1 my-1">
                            <label htmlFor="amount">Amount of Vouchers</label>
                            <input
                                className="border border-2 mx-2"
                                id="amount"
                                type="number"
                                min="0"
                                max="1000"
                                value={voucher.amount}
                                onChange={(e) => setVoucher({ ...voucher, amount: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-1 my-1">
                            <label htmlFor="amount">Voucher price</label>
                            <input
                                className="border border-2 mx-2"
                                id="amount"
                                type="number"
                                min="0"
                                max="1000"
                                value={voucher.price}
                                onChange={(e) => setVoucher({ ...voucher, price: e.target.value })}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center my-5">
                <button
                    type="button"
                    className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-12 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                    onClick={handleAddTicket}
                >
                    Add Ticket
                </button>
            </div>
            <div className="flex flex-col">
                <h1>Tickets to be add.</h1>
                <div className="flex flex-wrap mt-5 gap-2">
                    {newTickets ? (
                        newTickets.map((ticket, index) => (
                            <div
                                key={index}
                                className="relative border border-black rounded-md bg-brand-white w-[200px] flex flex-col justify-between"
                            >
                                <div className="flex flex-col p-2 justify-between h-full">
                                    <h1>Name:{ticket.name}</h1>
                                    <h1>${ticket.price}</h1>
                                    <h1>Desc:{ticket.description}</h1>
                                </div>
                                <div className="w-full bg-brand-yellow h-[30px] flex items-center">
                                    <button className="w-full" onClick={() => handleRemoveTicket(index)}>
                                        delete ticket
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1>No tickets to be add.</h1>
                        </div>
                    )}
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
