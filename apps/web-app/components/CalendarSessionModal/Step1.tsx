/* eslint-disable prefer-const */
import { EventsDTO } from "../../types"

type Props = {
    setSteps: (steps: number) => void
    events: EventsDTO[]
    setSelectedEventParams: Function
}

const Step1 = ({ events, setSteps, setSelectedEventParams }: Props) => {
    const handleSelect = (index: number) => {
        const selectedEvent = events[index]
        setSelectedEventParams({
            eventId: selectedEvent.id,
            slug: selectedEvent.slug,
            itemId: selectedEvent.item_id
        })
    }

    return (
        <div className="flex flex-col w-full items-center justify-center h-[80%]">
            <div className="mt-4">
                <p className="text-lg text-[#424242] font-[600] text-[24px] mb-6 mx-auto text-center">
                    For which Sub Event do you want to create a session?
                </p>
                <select
                    id="location"
                    name="location"
                    className="border-[#C3D0CF] bg-white border-2 p-1 rounded-[8px] h-[42px] w-full my-2"
                    onChange={(e) => handleSelect(parseInt(e.target.value))}
                >
                    {events.map((item, index) => {
                        return (
                            <option key={item.id} value={index}>
                                {item.name}
                            </option>
                        )
                    })}
                </select>
                <button
                    type="button"
                    className="w-full lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => setSteps(2)}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}

export default Step1
