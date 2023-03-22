import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"
import { Dialog, Transition } from "@headlessui/react"
import { useRouter } from "next/router"
import { Fragment, useRef, useState } from "react"
import axios from "axios"

import ModalSteps from "./ModalSteps"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { EventsDTO } from "../../types"

type NewSessionState = {
    team_members: { name: string; role: string }[]
    date: Date
    location: string
    tags: string[]
    info: string
    description: string
    eventId: number
    hasTicket: boolean
    format: string
    level: string
    equipment: string
    track: string
    type: string
    name: string
}

type Props = {
    isOpen: boolean
    closeModal: (b: boolean) => void
    event: EventsDTO
}

const AddSessionModal = ({ isOpen, closeModal, event }: Props) => {
    const router = useRouter()
    const questionTextRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [steps, setSteps] = useState(1)
    const [newSession, setNewSession] = useState<NewSessionState>({
        name: "",
        team_members: [],
        date: new Date(),
        location: "Amphitheatre",
        tags: [],
        info: "",
        eventId: event.id,
        hasTicket: false,
        format: "live",
        level: "beginner",
        equipment: "",
        description: "",
        track: "ZK Week",
        type: "Workshop"
    })
    const [amountTickets, setAmountTickets] = useState("0")

    const handleSubmit = async () => {
        setIsLoading(true)

        // Step 1 Create SubEvent

        const subEventRes = await axios.post(`/api/pretix-create-subevent`, {
            name: newSession.name,
            startDate: newSession.date,
            endDate: newSession.date,
            slug: event.slug,
            itemId: event.item_id
        })

        console.log("Created subEvent response: ", subEventRes.data)

        // // Step 3 Create Quota for the subEvent

        const quotaCreatedRes = await axios.post(`/api/pretix-create-quota/`, {
            ticketAmount: amountTickets,
            subEventId: subEventRes.data.id,
            slug: event.slug,
            itemId: event.item_id
        })

        console.log("Quota creatd: ", quotaCreatedRes.data)

        // Step 5 Add to database
        const createEventDB = await axios.post("/api/createSession", {
            ...newSession,
            subEventId: subEventRes.data.id
            // publicUrl: clonedEventRes.data.public_url,
            // slug: clonedEventRes.data.slug
        })

        console.log("DB response: ", createEventDB)

        // refresh to see new event created
        router.push(router.asPath)

        // CLEAN EVERYTHING AFTER CREATING EVENT

        setIsLoading(false)
        setSteps(1)
        setNewSession({
            name: "",
            team_members: [],
            date: new Date(),
            location: "Amphitheatre",
            tags: [],
            info: "",
            eventId: event.id,
            description: "",
            hasTicket: false,
            track: "ZK Week",
            equipment: "",
            format: "Live",
            type: "Workshop",
            level: "Beginner"
        })
        closeModal(false)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" initialFocus={questionTextRef} className="relative z-40 " onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 h-full ">
                    <div className="flex h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex flex-col h-full w-5/6 overflow-y-scroll max-w-full transform rounded-lg bg-white text-left align-middle  transition-all">
                                <div className="w-full h-full py-5 px-10">
                                    <div className="flex w-full justify-between items-center">
                                        <h1 className="text-[24px] font-[600]">Session Info (for the public)</h1>
                                        <div
                                            onClick={() => closeModal(false)}
                                            className="cursor-pointer flex items-center border-2 border-black justify-center w-[25px] h-[25px] rounded-full"
                                        >
                                            X
                                        </div>
                                    </div>
                                    <ModalSteps steps={steps} />
                                    {steps === 1 && (
                                        <Step1
                                            newSession={newSession}
                                            setNewSession={setNewSession}
                                            setSteps={setSteps}
                                        />
                                    )}

                                    {steps === 2 && (
                                        <Step2
                                            setSteps={setSteps}
                                            setAmountTickets={setAmountTickets}
                                            amountTickets={amountTickets}
                                            newSession={newSession}
                                            setNewSession={setNewSession}
                                        />
                                    )}

                                    {steps === 3 && (
                                        <Step3
                                            setSteps={setSteps}
                                            newSession={newSession}
                                            handleSubmit={handleSubmit}
                                            isLoading={isLoading}
                                            amountTickets={amountTickets}
                                        />
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddSessionModal
