/* eslint-disable prefer-const */

type Props = {
    setSteps: (step: number) => void
    newEvent: any
    newTicket: any
    handleSubmit: Function
}

const Step3 = ({ setSteps, newEvent, newTicket, handleSubmit }: Props) => (
    <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1 my-1 w-full">
            <h1 className="text-lg font-bold uppercase">Event Details:</h1>
            <div className="flex flex-col">
                <h1>Event Name: {newEvent.name}</h1>
                <h1>Event Date Start: {newEvent.startDate.toDateString()}</h1>
                <h1>Event Date Ends: {newEvent.endDate.toDateString()}</h1>
                <h1>Event Time Start: {newEvent.startTime}</h1>
                <h1>Event Time Ends: {newEvent.endTime}</h1>
                <h1>Location: {newEvent.location}</h1>
                <h1>
                    Organizers:{" "}
                    {newEvent.organizers.map((i: string) => (
                        <p key={i}>{i}</p>
                    ))}
                </h1>
                <h1>
                    Tags:{" "}
                    {newEvent.tags.map((i: string) => (
                        <p key={i}>{i}</p>
                    ))}
                </h1>
                <h1>Aditional Info.: {newEvent.info}</h1>
            </div>
        </div>
        <div className="flex flex-col gap-1 my-1 w-full">
            <h1 className="text-lg font-bold uppercase">Tickets Details:</h1>
            <div className="flex flex-col">
                <h1>Ticket Name: {newTicket.name}</h1>
                <h1>Ticker Price: {newTicket.price}</h1>
                <h1>Ticker Description: {newTicket.description}</h1>
                <h1>Amount: {newTicket.amount}</h1>
            </div>
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
                className="w-[200px] inline-flex justify-center rounded-full border border-transparent bg-brand-black px-10 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                onClick={() => handleSubmit()}
            >
                Confirm Event
            </button>
        </div>
    </div>
)

export default Step3
