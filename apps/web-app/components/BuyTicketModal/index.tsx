import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Loading from "../Loading"

type Props = {
    isOpen: boolean
    closeModal: (b: boolean) => void
    handleBuyTicket: Function
}

const BuyTicketModal = ({ isOpen, closeModal, handleBuyTicket }: Props) => {
    const [step, setStep] = useState(1)

    const resetAndClose = (close: boolean) => {
        setStep(1)
        closeModal(close)
    }

    const handleYesClick = async () => {
        setStep(2)
        await handleBuyTicket()

        setTimeout(() => {
            setStep(3)
        }, 2000)
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 " onClose={resetAndClose}>
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
                            <Dialog.Panel className="flex flex-col min-h-[200px] h-full w-5/6 h-[100%] overflow-scroll md:overflow-hidden md:h-auto max-w-full transform rounded-lg border-[##424242] border-2 bg-white text-left align-middle shadow-xl transition-all">
                                <div className="p-4 bg-[#EEEEF0] border-b-2">
                                    <h1 className="text-[32px] text-[#37352F] font-[600] mx-auto">Ticketing</h1>
                                </div>
                                {/* Step 1 */}
                                {step === 1 && (
                                    <div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2 m-8">
                                                <p className="text-lg text-[#424242] font-[600] text-[24px] mb-6 mx-auto">
                                                    Are you sure you want to generate a ticket for this session?
                                                </p>
                                                <button
                                                    className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] mb-2"
                                                    onClick={handleYesClick}
                                                >
                                                    YES
                                                </button>
                                                <button
                                                    className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#1C2928] rounded-[8px] text-white text-[16px]"
                                                    onClick={() => resetAndClose(true)}
                                                >
                                                    NO
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/*  Step 2 */}
                                {step === 2 && (
                                    <div className="flex flex-col gap-4 items-center justify-center p-20">
                                        <Loading size="lg" />
                                    </div>
                                )}

                                {/*  Step 3  */}
                                {step === 3 && (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2 m-8">
                                            <p className="text-lg text-[#424242] font-[600] text-[24px] mb-6 mx-auto">
                                                Your ticket has been generated. Check your email inbox.
                                            </p>
                                            <button
                                                className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] mb-2"
                                                onClick={() => resetAndClose(true)}
                                            >
                                                CLOSE
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default BuyTicketModal
