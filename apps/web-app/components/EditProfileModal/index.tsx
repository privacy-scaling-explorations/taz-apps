import { Dialog, Transition } from "@headlessui/react"
import { ToastContainer, toast } from "react-toastify"
import { Fragment, useRef, useState } from "react"
import axios from "axios"
import Loading from "../Loading"

type Props = {
    isOpen: boolean
    closeModal: (b: boolean) => void
    userProfile: { location: string; company: string; bio: string }
    reRender: boolean
    setRerender: Function
}

const EditProfileModal = ({ isOpen, closeModal, userProfile, reRender, setRerender }: Props) => {
    console.log("user profile: ", userProfile)
    const questionTextRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState({
        location: userProfile.location,
        company: userProfile.company,
        bio: userProfile.bio
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        await axios.post("/api/updateProfile", profile)
        setIsLoading(false)
        closeModal(false)
        setRerender(!reRender)
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
                                        <h1 className="text-[24px] font-[600]">Create Profile</h1>
                                        <div
                                            onClick={() => closeModal(false)}
                                            className="cursor-pointer flex items-center border-2 border-black justify-center w-[25px] h-[25px] rounded-full"
                                        >
                                            X
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <ToastContainer
                                            position="top-center"
                                            autoClose={3000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="light"
                                        />
                                        <div className="flex flex-col gap-1 my-1 w-full">
                                            <label htmlFor="name" className="font-[600]">
                                                Location
                                            </label>
                                            <input
                                                className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px]"
                                                type="text"
                                                id="name"
                                                placeholder="Location"
                                                value={profile.location}
                                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 my-1 w-full">
                                            <label htmlFor="name" className="font-[600]">
                                                Company
                                            </label>
                                            <input
                                                className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[42px]"
                                                type="text"
                                                id="name"
                                                placeholder="Company"
                                                value={profile.company}
                                                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 my-1 w-full">
                                            <label htmlFor="info" className="font-[600]">
                                                Bio
                                            </label>
                                            <textarea
                                                className="border-[#C3D0CF] border-2 p-1 rounded-[8px] h-[150px]"
                                                id="info"
                                                placeholder="Write a little bit about yourself"
                                                value={profile.bio}
                                                maxLength={2000}
                                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            />
                                            <div className="flex w-full justify-end">
                                                <h1 className="text-[14px] text-[#AAAAAA]">Max 2000 characters</h1>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col my-10 items-start">
                                            <button
                                                type="button"
                                                className="w-full lex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                                                onClick={() => handleSubmit()}
                                            >
                                                {isLoading ? <Loading size="xs" /> : "EDIT PROFILE"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditProfileModal
