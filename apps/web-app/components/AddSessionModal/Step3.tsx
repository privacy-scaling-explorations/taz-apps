import Loading from "../Loading"

type Props = {
    setSteps: (step: number) => void
    newSession: any
    handleSubmit: Function
    isLoading: boolean
    amountTickets: string
}

const Step3 = ({ setSteps, newSession, handleSubmit, isLoading, amountTickets }: Props) => (
    <div className="flex flex-col w-full gap-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold uppercase ">Session Details:</h1>
            <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <h2 className="font-bold">
                        Name: <span className="font-normal">{newSession.name}</span>
                    </h2>
                    <h2 className="font-bold">
                        From:{" "}
                        <span className="font-normal">
                            {newSession.startDate.toDateString()} at {newSession.startTime}
                        </span>
                    </h2>
                    <h2 className="font-bold">
                        To:{" "}
                        <span className="font-normal">
                            {newSession.endDate.toDateString()} by {newSession.endTime}
                        </span>
                    </h2>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto pr-40">
                    <h2 className="font-bold">
                        Location: <span className="font-normal">{newSession.location}</span>
                    </h2>
                    <h2 className="font-bold">Organizers:</h2>
                    <ul className="list-disc list-inside ml-10">
                        {newSession.organizers.map((i: string) => (
                            <li key={i}>{i}</li>
                        ))}
                    </ul>
                    <h2 className="font-bold">Tags:</h2>
                    <ul className="flex flex-wrap gap-2">
                        {newSession.tags.map((i: string) => (
                            <li key={i} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full">
                <h2 className="font-bold">
                    Aditional Info.: <span className="font-normal">{newSession.info}</span>
                </h2>
            </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
            <button
                type="button"
                className="w-[200px] flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                onClick={() => setSteps(2)}
            >
                Back
            </button>
            <button
                type="button"
                disabled={isLoading}
                className="w-[200px] flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                onClick={() => handleSubmit()}
            >
                {isLoading ? <Loading size="xs" /> : "Confirm Event"}
            </button>
        </div>
    </div>
)

export default Step3
