/* eslint-disable prefer-const */

type Props = {
    setSteps: (step: number) => void
}

const Step3 = ({ setSteps }: Props) => {
    const handleSubmit = () => {
        console.log("submit")
    }
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-1 my-1 w-full">
                <h1 className="text-lg font-bold uppercase">Event Details:</h1>
                <div className="flex flex-col">
                    <h1>Event Name: ZULALU</h1>
                    <h1>Event Date Start: 10/02/2023</h1>
                    <h1>Event Date Ends: 10/02/2023</h1>
                    <h1>Event Time Start: 09:00AM</h1>
                    <h1>Event Time Ends: 09:00PM</h1>
                    <h1>Location: São Paulo</h1>
                    <h1>Organizers: Falco, Samuel</h1>
                    <h1>Tags: web3</h1>
                    <h1>Aditional Info.: Coffe shop sao pauli brazil test</h1>
                </div>
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <h1 className="text-lg font-bold uppercase">Tickets Details:</h1>
                <div className="flex flex-col">
                    <h1>Ticket Name: Test</h1>
                    <h1>Ticker Price: $10.00</h1>
                    <h1>Ticker Description: SUPER TICKET</h1>
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
                    onClick={handleSubmit}
                >
                    Confirm Event
                </button>
            </div>
        </div>
    )
}

export default Step3
