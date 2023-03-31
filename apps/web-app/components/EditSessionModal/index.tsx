import { Dialog, Transition } from "@headlessui/react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { Fragment, useRef, useState } from "react"
import axios from "axios"
import moment from "moment"

import ModalSteps from "./ModalSteps"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { SessionsDTO } from "../../types"

type NewSessionState = {
    description: string
    equipment: string
    event_id: number
    event_type: string
    format: string
    hasTicket: boolean
    info: string
    level: string
    location: string
    name: string
    startDate: Date
    startTime: string
    subevent_id: number
    tags: string[]
    team_members: {
        name: string
        role: string
    }[]
    track: string
    event_slug: string
    event_item_id: number
    quota_id: number
}

type Props = {
    isOpen: boolean
    closeModal: (b: boolean) => void
    session: SessionsDTO
    sessions: SessionsDTO[]
}

const EditSessionModal = ({ isOpen, closeModal, session, sessions }: Props) => {
    const router = useRouter()
    const questionTextRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [steps, setSteps] = useState(1)
    const [newSession, setNewSession] = useState<NewSessionState>({
        name: session.name,
        team_members: session.team_members,
        startDate: moment.utc(session.startDate).toDate(),
        startTime: session.startTime,
        location: session.location,
        tags: session.tags,
        info: session.info,
        event_id: session.event_id,
        hasTicket: session.hasTicket,
        format: session.format,
        level: session.level,
        equipment: session.equipment,
        subevent_id: session.subevent_id,
        description: session.description,
        track: session.track,
        event_type: session.event_type,
        event_slug: session.event_slug,
        event_item_id: session.event_item_id,
        quota_id: session.quota_id
    })
    const [amountTickets, setAmountTickets] = useState("0")

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            if (newSession.hasTicket) {
                console.log("has ticket and subevent id")
                // Step 1 Update SubEvent

                const subEventRes = await axios.post(`/api/pretix-update-subevent`, {
                    name: newSession.name,
                    startDate: newSession.startDate,
                    slug: session.event_slug,
                    subEventId: session.subevent_id
                })

                console.log("Updated subEvent response: ", subEventRes.data)

                // Step 2 Update Quota for the subEvent

                const quotaUpdatedRes = await axios.post(`/api/pretix-update-quota/`, {
                    ticketAmount: amountTickets,
                    slug: session.event_slug,
                    quotaId: session.quota_id
                })
                console.log("Quota updated: ", quotaUpdatedRes.data)

                // Step 3 Update database
                const updateSessionDB = await axios.post("/api/updateSession", {
                    ...newSession,
                    id: session.id
                })
                console.log("DB response: ", updateSessionDB)
            } else {
                console.log("only DB update")
                const updateSessionDB = await axios.post("/api/updateSession", {
                    ...newSession,
                    id: session.id
                })
                console.log("DB response: ", updateSessionDB)
            }
        } catch (error) {
            toast.error("Failed to create an event", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }

        // refresh to see new event created
        router.push(router.asPath)

        // CLEAN EVERYTHING AFTER CREATING EVENT

        setIsLoading(false)
        setSteps(1)
        setNewSession({
            name: session.name,
            team_members: session.team_members,
            startDate: session.startDate,
            startTime: session.startTime,
            location: session.location,
            tags: session.tags,
            info: session.info,
            event_id: session.event_id,
            hasTicket: session.hasTicket,
            format: session.format,
            level: session.level,
            equipment: session.equipment,
            subevent_id: session.subevent_id,
            description: session.description,
            track: session.track,
            event_type: session.event_type,
            event_slug: session.event_slug,
            event_item_id: session.event_item_id,
            quota_id: session.quota_id
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
                                        <h1 className="text-[24px] font-[600]">
                                            {steps === 1
                                                ? "Session Info (for the public)"
                                                : steps === 2
                                                ? "Session Logistics (for organizers)"
                                                : "Review Session"}
                                        </h1>
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
                                            sessions={sessions}
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

export default EditSessionModal
