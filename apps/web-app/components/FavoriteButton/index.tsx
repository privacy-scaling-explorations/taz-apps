import { useState } from "react"
import NextImage from "next/image"
import { useRouter } from "next/router"
import NextLink from "next/link"
import { toast } from "react-toastify"
import axios from "axios"
import { SessionsDTO } from "../../types"

type Props = {
    session: SessionsDTO
    favoritedSessionId: number | null
    isMiniButton: boolean
}

const ParticipateButton = ({ session, favoritedSessionId, isMiniButton }: Props) => {
    const [latestFavoritedSessionId, setLatestFavoritedSessionId] = useState<number | null>(favoritedSessionId)

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

    const handleAddFavorite = async () => {
        await axios
            .post("/api/addFavoriteSession", {
                session_id: session.id,
                user_id: LOGGED_IN_USER_ID
            })
            .then((res) => {
                if (res.status === 201) {
                    setLatestFavoritedSessionId(res.data.favoritedSession.id)
                    makeToast(true, "This session is now bookmarked.")
                }
            })
            .catch((err) => {
                console.log(err)
                makeToast(false, "Error")
            })
    }

    const handleRemoveFavorite = async () => {
        await axios
            .post("/api/removeFavoriteSession", {
                id: latestFavoritedSessionId
            })
            .then((res) => {
                if (res.status === 200) {
                    setLatestFavoritedSessionId(null)
                    makeToast(true, "This session is no longer bookmarked.")
                }
            })
            .catch((err) => {
                console.log(err)
                makeToast(false, "Error")
            })
    }

    return (
        <>
            <NextImage
                className="text-[#91A8A7] cursor-pointer"
                src={latestFavoritedSessionId !== null ? "/vector-bookmark2.svg" : "/vector-bookmark.svg"}
                alt="vector-bookmark"
                width={24}
                height={24}
                onClick={() => {
                    if (latestFavoritedSessionId !== null) {
                        handleRemoveFavorite()
                    } else {
                        handleAddFavorite()
                    }
                }}
            />
        </>
    )
}
export default ParticipateButton
