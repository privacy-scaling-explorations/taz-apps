import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"

import { BiError } from "react-icons/bi"
import { AiOutlineCheckCircle } from "react-icons/ai"

import Loading from "../Loading"

type Props = {
    loadingPassport: {
        step: number
        text: string
    }
    errorPassport: boolean
}

const PassportLoadingModal = ({ loadingPassport, errorPassport }: Props) => {
    const router = useRouter()
    const [steps, setSteps] = useState(0)

    const fadeInOut = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
        exit: { opacity: 0, transition: { duration: 1 } }
    }

    useEffect(() => {
        setSteps(loadingPassport.step)
    }, [loadingPassport])

    if (errorPassport) {
        return (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[30]">
                <div className="flex w-[500px] h-[400px] flex-col items-center justify-center bg-zulalu-primary text-white rounded-[16px] p-6">
                    <div className="flex w-full align-center justify-center">
                        <BiError size={50} className="text-red-500" />
                    </div>
                    <div className="flex w-full font-[600] text-center justify-center uppercase align-center my-10">
                        FAILED ATTEMPT TO LOG IN
                        <br />
                        TRY AGAIN LATER
                    </div>
                    <button
                        className="bg-zulalu-secondary p-3 w-[200px] rounded-[8px] font-[600]"
                        onClick={() => {
                            router.push("/").then(() => {
                                router.reload()
                            })
                        }}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[30]">
            <div className="flex w-[500px] h-[400px] flex-col align-center justify-center bg-zulalu-primary text-white rounded-[16px] p-6">
                <div className="flex w-full align-center justify-center">
                    {loadingPassport.step === 4 ? (
                        <AiOutlineCheckCircle size={40} className="text-zulalu-secondary" />
                    ) : (
                        <Loading />
                    )}
                </div>
                <div className="flex w-full font-[600] justify-center uppercase align-center my-10">
                    {loadingPassport.step === steps && (
                        <motion.h1
                            className={`${steps === 4 && "text-color-secondary"}`}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={fadeInOut}
                            key="step1"
                        >
                            {loadingPassport.text}
                        </motion.h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PassportLoadingModal
