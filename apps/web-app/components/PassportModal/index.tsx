import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react"
import { requestZuzaluMembershipProof } from "@pcd/passport-interface"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

const supabase = createBrowserSupabaseClient()

// 1. urlToPassportWebsite
// 2. returnUrl
// 3. urlToSemaphoreGroup
// 4. navigate

type Props = {
    openPassportModal: boolean
    setOpenPassportModal: (value: boolean) => void
}

const PassportModal = ({ openPassportModal, setOpenPassportModal }: Props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (event: any) => setEmail(event.target.value)
    const handlePasswordChange = (event: any) => setPassword(event.target.value)
    const inputRef = useRef(null)

    async function zuzaluMembershipProof() {
        const proof = await requestZuzaluMembershipProof(
            "https://pcd-passport.com/",
            "https://bed8-2806-107e-13-6229-d584-c0de-219e-7dcd.ngrok.io/complete-identity-proof/",
            "https://api.pcd-passport.com/semaphore/1",
            // eslint-disable-next-line no-return-assign
            (url) => (window.location.href = url)
        )
        console.log(proof)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.error(error)
        } else {
            console.log(data)
        }
        setOpenPassportModal(false)
    }
    return (
        <Transition.Root show={openPassportModal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[20]"
                initialFocus={inputRef}
                onClose={() => setOpenPassportModal(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0">
                    <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="flex p-5 bg-gradient-radial h-full md:h-[900px] w-[400px]">
                                <div className="flex relative flex-col w-full justify-center items-center ">
                                    <h1 className="uppercase text-[42px] text-zulalu-yellow font-light">PASSPORT</h1>
                                    <div className="w-full h-[200px]" />
                                    <h1 className="uppercase text-[24px] text-zulalu-yellow mb-[50px]">ZULALU</h1>
                                    <h1 className="uppercase text-[16px] text-white w-[260px]">
                                        This experimental passport uses zero-knowledge proofs to prove Zuzalu
                                        citizenship without revealing who you are.
                                    </h1>
                                    <div className="flex flex-col gap-5 mt-10 w-full items-center">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                className="bg-[#19473F] text-white text-center rounded-[58px] h-[45px] w-5/6 border border-[#ffffff4d] focus:outline-none focus:ring-0"
                                                type="email"
                                                placeholder="email address"
                                                value={email}
                                                onChange={handleEmailChange}
                                            />

                                            <input
                                                className="bg-[#19473F] mt-4 text-white text-center rounded-[58px] h-[45px] w-5/6 border border-[#ffffff4d] focus:outline-none focus:ring-0"
                                                type="password"
                                                value={password}
                                                placeholder="password"
                                                onChange={handlePasswordChange}
                                            />
                                            <div className="w-full my-4 h-[0px] border-t border-[#ffffff4d]" />
                                            <button
                                                onClick={handleSubmit}
                                                className="bg-zulalu-yellow text-center rounded-[58px] h-[45px] w-5/6 border border-[#ffffff4d]"
                                            >
                                                Verify Passport
                                            </button>
                                        </form>
                                        {/* <input
                      className="bg-[#19473F] text-white text-center rounded-[58px] h-[45px] w-5/6 border border-[#ffffff4d] focus:outline-none focus:ring-0"
                      placeholder="email address"
                    />
                    <input
                      className="bg-[#19473F] text-white text-center rounded-[58px] h-[45px] w-5/6 border border-[#ffffff4d] focus:outline-none focus:ring-0"
                      placeholder="password"
                    /> */}

                                        {/* <button className="bg-zulalu-yellow text-center rounded-[58px] h-[45px] w-5/6 border border-[#ffffff4d]">
                      Generate Pass
                    </button> */}
                                    </div>
                                    <div
                                        onClick={() => setOpenPassportModal(false)}
                                        className="absolute bottom-0 w-[200px] h-[5px] bg-white rounded-[2.5px] cursor-pointer"
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default PassportModal
