import { useState } from "react"
import NextImage from "next/image"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { toast } from "react-toastify"
import axios from "axios"
import { SessionsDTO, EventsDTO } from "../../types"
import BuyTicketModal from "../BuyTicketModal"

type Props = {
    event: EventsDTO
    session: SessionsDTO
    isTallButton: boolean
}

const ParticipateButton = ({ event, session, isTallButton }: Props) => {
    const [openBuyTicketModal, setOpenBuyTicketModal] = useState(false)

    const router = useRouter()
    const LOGGED_IN_USER_ID = 1

    const makeToast = (isSuccess: boolean, message: string) => {
        if (isSuccess) {
            toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        } else {
            toast.error(message, {
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

    const handleBuyTicket = async () => {
        await axios.post("/api/pretix-create-order", {
            subEventId: session.subevent_id,
            slug: event.slug,
            itemId: event.item_id
        })
    }

    const handleClickAttend = async (sessionId: number) => {
        await axios
            .post("/api/addParticipant", {
                session_id: sessionId,
                user_id: LOGGED_IN_USER_ID
            })
            .then((res) => {
                if (res.data === "Participant added") {
                    makeToast(true, "You are now attending this event.")
                    router.push(router.asPath)
                }
            })
            .catch((err) => {
                console.log(err)
                makeToast(false, "Error")
            })
    }

    const closeTicketModal = (close = false) => {
        if (close) setOpenBuyTicketModal(false)
    }

    return (
        <>
            {session.participants.length > 0 ? (
                <button
                    className={`flex gap-2 items-center bg-white border border-primary text-zulalu-primary font-[600] py-[${
                        isTallButton ? 8 : 4
                    }px] px-[16px] rounded-[8px] cursor-default`}
                >
                    <NextImage src={"/vector-circle-check.svg"} width={16} height={16} />
                    SEE YOU THERE!
                </button>
            ) : session.hasTicket ? (
                <>
                    <button
                        className={`bg-[#35655F] text-white py-[${
                            isTallButton ? 8 : 4
                        }px] px-[16px] text-[16px] rounded-[6px]`}
                        onClick={() => {
                            setOpenBuyTicketModal(true)
                        }}
                    >
                        GET TICKET
                    </button>
                    <BuyTicketModal
                        closeModal={closeTicketModal}
                        isOpen={openBuyTicketModal}
                        handleBuyTicket={handleBuyTicket}
                    />
                </>
            ) : (
                <button
                    className={`bg-[#35655F] text-white py-[${
                        isTallButton ? 8 : 4
                    }px] px-[16px] text-[16px] rounded-[6px]`}
                    onClick={() => handleClickAttend(session.id)}
                >
                    RSVP
                </button>
            )}
        </>
    )
}
export default ParticipateButton
