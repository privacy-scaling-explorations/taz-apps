import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react"

import ModalSteps from "./ModalSteps"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"

type NewEventState = {
    name: string
    organizers: string[]
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
    location: string
    tags: string[]
    info: string
}

type Props = {
    isOpen: boolean
    closeModal: (b: boolean) => void
}

const AddEventModal = ({ isOpen, closeModal }: Props) => {
    const questionTextRef = useRef(null)
    const [steps, setSteps] = useState(1)
    const [newEvent, setNewEvent] = useState<NewEventState>({
        name: "",
        organizers: [],
        startDate: new Date(),
        endDate: new Date(),
        startTime: "09:00",
        endTime: "18:00",
        location: "",
        tags: [],
        info: ""
    })

    const [newTicket, setNewTicket] = useState({
        name: "",
        price: "",
        description: ""
    })

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

                <div className="fixed inset-0 h-full">
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
                            <Dialog.Panel className="flex flex-col w-5/6 h-[100%] overflow-scroll md:overflow-hidden md:h-auto max-w-full transform rounded-lg border-brand-blue border-2 bg-white text-left align-middle shadow-xl transition-all">
                                <div className="p-4 bg-brand-beige border-b-2 border-brand-blue">
                                    <button
                                        type="button"
                                        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige2"
                                        onClick={() => closeModal(false)}
                                    >
                                        <svg
                                            className="mr-2"
                                            width="18"
                                            height="17"
                                            viewBox="0 0 18 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                transform="translate(5,5)"
                                                d="M7.25467 1.49196C7.55767 1.20954 7.57439 0.73496 7.29194 0.431952C7.00957 0.128937 6.53497 0.112242 6.23197 0.394655L4.03739 2.44007L1.99196 0.24548C1.70954 -0.0575276 1.23496 -0.0742224 0.931952 0.20819C0.628937 0.490603 0.612242 0.96518 0.894655 1.2682L2.94007 3.46277L0.74548 5.50824C0.442472 5.79062 0.425778 6.26522 0.70819 6.56822C0.990603 6.87122 1.46518 6.88794 1.7682 6.60549L3.96277 4.56009L6.00824 6.75467C6.29062 7.05767 6.76522 7.07439 7.06822 6.79194C7.37122 6.50957 7.38794 6.03497 7.10549 5.73197L5.06009 3.53739L7.25467 1.49196Z"
                                                fill="#435C6C"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.75 8.5C0.75 3.94365 4.44365 0.25 9 0.25C13.5563 0.25 17.25 3.94365 17.25 8.5C17.25 13.0563 13.5563 16.75 9 16.75C4.44365 16.75 0.75 13.0563 0.75 8.5ZM9 15.25C5.27208 15.25 2.25 12.228 2.25 8.5C2.25 4.77208 5.27208 1.75 9 1.75C12.728 1.75 15.75 4.77208 15.75 8.5C15.75 12.228 12.728 15.25 9 15.25Z"
                                                fill="#435C6C"
                                            />
                                        </svg>
                                        cancel
                                    </button>
                                </div>
                                <div className="flex flex-col h-full md:h-[900px]  p-5 ">
                                    <ModalSteps steps={steps} />
                                    {steps === 1 && (
                                        <Step1 newEvent={newEvent} setNewEvent={setNewEvent} setSteps={setSteps} />
                                    )}
                                    {steps === 2 && (
                                        <Step2 setSteps={setSteps} newTicket={newTicket} setNewTicket={setNewTicket} />
                                    )}
                                    {steps === 3 && <Step3 setSteps={setSteps} />}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddEventModal
