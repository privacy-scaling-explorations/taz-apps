import Loading from "../Loading"

type TicketsState = {
    name: string
    price: string
    description: string
}

type Props = {
    setSteps: (step: number) => void
    newEvent: any
    newTickets: TicketsState[]
    handleSubmit: Function
    isLoading: boolean
    amountTickets: string
}

const Step3 = ({ setSteps, newEvent, newTickets, handleSubmit, isLoading, amountTickets }: Props) => (
    <div className="flex flex-col w-full gap-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold uppercase ">Event Details:</h1>
            <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <h2 className="font-bold">
                        Name: <span className="font-normal">{newEvent.name}</span>
                    </h2>
                    <h2 className="font-bold">
                        From:{" "}
                        <span className="font-normal">
                            {newEvent.startDate.toDateString()} at {newEvent.startTime}
                        </span>
                    </h2>
                    <h2 className="font-bold">
                        To:{" "}
                        <span className="font-normal">
                            {newEvent.endDate.toDateString()} by {newEvent.endTime}
                        </span>
                    </h2>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto pr-40">
                    <h2 className="font-bold">
                        Location: <span className="font-normal">{newEvent.location}</span>
                    </h2>
                    <h2 className="font-bold">Organizers:</h2>
                    <ul className="list-disc list-inside ml-10">
                        {newEvent.organizers.map((i: string) => (
                            <li key={i}>{i}</li>
                        ))}
                    </ul>
                    <h2 className="font-bold">Tags:</h2>
                    <ul className="flex flex-wrap gap-2">
                        {newEvent.tags.map((i: string) => (
                            <li key={i} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full">
                <h2 className="font-bold">
                    Aditional Info.: <span className="font-normal">{newEvent.info}</span>
                </h2>
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold uppercase">Tickets Details:</h1>
            {newTickets.map((item, index) => (
                <div className="flex flex-col gap-2" key={index}>
                    <h2 className="font-bold">
                        Name: <span className="font-normal">{item.name}</span>
                    </h2>
                    <h2 className="font-bold">
                        Price: <span className="font-normal">{item.price}</span>
                    </h2>
                    <h2 className="font-bold">
                        Description: <span className="font-normal">{item.description}</span>
                    </h2>
                    <h2 className="font-bold">
                        Amount: <span className="font-normal">{amountTickets}</span>
                    </h2>
                </div>
            ))}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
            <button
                type="button"
                className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-12 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                onClick={() => setSteps(2)}
            >
                Back
            </button>
            <button
                type="button"
                disabled={isLoading}
                className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-10 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                onClick={() => handleSubmit()}
            >
                {isLoading ? <Loading size="xs" /> : "Confirm Event"}
            </button>
        </div>
    </div>
)

export default Step3
