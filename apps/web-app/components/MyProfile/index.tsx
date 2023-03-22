import { useState } from "react"

import axios from "axios"

import Link from "next/link"

import { useRouter } from "next/router"

import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai"

import { ToastContainer, toast } from "react-toastify"

import Footer from "../Footer"
import BackTAZ from "../ArrowNavigators/BackTAZ"
import Loading from "../Loading"
import MyProfileUpdate from "./MyProfileUpdate"
import { FavoritedEventsDTO, ParticipantsDTO, UserDTO } from "../../types"

type FormDTO = {
    userName: string
    email: string
    semaphoreId: string
}

type Props = {
    pastEvents: ParticipantsDTO[]
    attendingEvents: ParticipantsDTO[]
    userEventsFavorited: FavoritedEventsDTO[]
    userInfo: UserDTO | undefined
}

const MyProfileComponent = ({ attendingEvents, pastEvents, userEventsFavorited, userInfo }: Props) => {
    const router = useRouter()

    const [updateUser, setUpdateUser] = useState(false)

    if (!userInfo) {
        return (
            <div className="grid">
                <div className="z-10 col-start-1 row-start-1 text-brand-brown">
                    <div className="flex flex-col max-w-full w-full m-auto md:max-w-[1280px] my-10 max-h-full md:max-h-[60vh] h-full relative">
                        <Link href="/experiences-page">
                            <div className="flex max-w-[76px] max-h-[32px] bg-black mb-7 px-1 text-xl text-brand-beige2 cursor-pointer absolute top-5 left-5 z-10">
                                <BackTAZ />
                                <h1>TAZ</h1>
                            </div>
                        </Link>
                        <div className="flex absolute top-5 right-5 cursor-pointer z-10">
                            <AiOutlineEdit size={25} />
                        </div>
                        <div className="flex flex-col items-center gap-5 md:py-10 py-20 relative border border-[#ccc] rounded-t-md">
                            <div className="py-5 flex justify-center">
                                <div className="">
                                    <Loading />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex items-left flex-col bg-black text-brand-yellow pt-8 mt-12">
                        <div className="py-10 px-14 flex items-end justify-between bg-black">
                            <div className="transform -ml-6 text-xl tracking-widest text-brand-beige">
                                <h1>TEMP_RARY</h1>
                                <h1 className="bg-brand-beige px-1 text-brand-black">AN_NYMOUS</h1>
                                <h1>Z_NE</h1>
                            </div>
                        </div>

                        <a
                            href="https://appliedzkp.org/"
                            target="_blank"
                            className="pl-9 pb-12 underline"
                            rel="noreferrer"
                        >
                            Privacy & Scaling Explorations
                        </a>
                        <button
                            className="w-[300px] ml-9 mb-4 bg-brand-yellow text-brand-body text-black px-3 py-3 rounded-full"
                            // onClick={clearIdentity}
                        >
                            Disconnect ID
                        </button>
                        <p className="pl-9 ml-12 mb-5 text-brand-info">
                            <span>
                                <button className="text-brand-info underline cursor-pointer">Save ID</button>
                            </span>{" "}
                            before disconnecting!
                        </p>

                        <div className="flex w-full justify-center bg-black pb-3 pt-9">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const [form, setForm] = useState<FormDTO>({
        email: userInfo.email,
        userName: userInfo.userName,
        semaphoreId: userInfo.semaphoreId
    })

    const handleUpdateUser = async () => {
        if (!form) {
            return
        }
        try {
            await axios.post("/api/updateUser", {
                userName: form.userName,
                email: form.email,
                semaphoreId: form.semaphoreId,
                id: userInfo.id
            })
            toast.success("Updated Successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
            setUpdateUser(false)
            router.replace(router.asPath)
        } catch (err) {
            console.log(err)
            toast.error("Error", {
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
    }

    return (
        <div className="grid">
            <div className="z-10 col-start-1 row-start-1 text-brand-brown">
                <div className="flex flex-col max-w-full w-full m-auto md:max-w-[1280px] my-10 h-full relative">
                    <Link href="/experiences-page">
                        <div className="flex max-w-[76px] max-h-[32px] bg-black mb-7 px-1 text-xl text-brand-beige2 cursor-pointer absolute top-5 left-5 z-10">
                            <BackTAZ />
                            <h1>TAZ</h1>
                        </div>
                    </Link>
                    <div
                        className="flex absolute top-5 right-5 cursor-pointer z-10"
                        onClick={() => setUpdateUser(!updateUser)}
                    >
                        <AiOutlineEdit size={25} />
                    </div>
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
                    <div className="flex flex-col items-center gap-5 md:py-10 py-20 relative border border-[#ccc] border-b-transparent rounded-t-md">
                        <div className="border border-black w-auto rounded-full p-5 cursor-pointer">
                            <AiOutlineUser size={70} />
                        </div>
                        <h1 className="text-2xl uppercase">{userInfo.userName}</h1>
                        <div
                            onClick={() => router.push("/myevents")}
                            className="grid grid-cols-2 md:grid-cols-4  text-[12px] md:text-[16px] gap-5 absolute bottom-[-60px] md:bottom-[-40px] rounded-md bg-white py-2 shadow-xl z-10 hover:bg-gray-200 transition-[2s] cursor-pointer"
                        >
                            <div className="flex flex-col items-center w-[150px] md:w-[200px] ">
                                <h1>MY EVENTS</h1>
                                <h1>0</h1>
                            </div>
                            <div className="flex flex-col items-center w-[150px] md:w-[200px] ">
                                <h1>FAVORITES EVENTS</h1>
                                <h1>{userEventsFavorited.length}</h1>
                            </div>
                            <div className="flex flex-col items-center w-[150px] md:w-[200px] ">
                                <h1>ATTENDING EVENTS</h1>
                                <h1>{attendingEvents.length}</h1>
                            </div>
                            <div className="flex flex-col items-center w-[150px] md:w-[200px] ">
                                <h1>PAST EVENTS</h1>
                                <h1>{pastEvents.length}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 py-5 md:py-20 relative bg-white rounded-b-md h-full px-5 md:px-0">
                        {updateUser && form ? (
                            <MyProfileUpdate
                                user={userInfo}
                                setUpdateUser={setUpdateUser}
                                setForm={setForm}
                                form={form}
                                handleUpdateUser={handleUpdateUser}
                            />
                        ) : (
                            <div className="flex flex-col gap-5 w-full md:w-[850px]">
                                <div className="flex gap-4">
                                    <h1 className="text-md">NAME:</h1>
                                    <h1 className="text-md uppercase text-gray-400">{userInfo.userName}</h1>
                                </div>
                                <div className="flex gap-4">
                                    <h1 className="text-md">EMAIL:</h1>
                                    <h1 className="text-md uppercase text-gray-400">{userInfo.email}</h1>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <h1 className="text-md">SEMAPHORE ID:</h1>
                                    <h1
                                        className="text-md uppercase bg-black p-1 text-brand-beige2 rounded-md cursor-pointer"
                                        onClick={() => navigator.clipboard.writeText(userInfo.semaphoreId)}
                                    >{`${userInfo.semaphoreId.substring(0, 10)}...`}</h1>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative flex items-left flex-col bg-black text-brand-yellow pt-8 mt-12">
                    <div className="py-10 px-14 flex items-end justify-between bg-black">
                        <div className="transform -ml-6 text-xl tracking-widest text-brand-beige">
                            <h1>TEMP_RARY</h1>
                            <h1 className="bg-brand-beige px-1 text-brand-black">AN_NYMOUS</h1>
                            <h1>Z_NE</h1>
                        </div>
                    </div>

                    <a href="https://appliedzkp.org/" target="_blank" className="pl-9 pb-12 underline" rel="noreferrer">
                        Privacy & Scaling Explorations
                    </a>
                    <button
                        className="w-[300px] ml-9 mb-4 bg-brand-yellow text-brand-body text-black px-3 py-3 rounded-full"
                        // onClick={clearIdentity}
                    >
                        Disconnect ID
                    </button>
                    <p className="pl-9 ml-12 mb-5 text-brand-info">
                        <span>
                            <button className="text-brand-info underline cursor-pointer">Save ID</button>
                        </span>{" "}
                        before disconnecting!
                    </p>

                    <div className="flex w-full justify-center bg-black pb-3 pt-9">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfileComponent
