import { useState, useEffect } from "react"
import NextImage from "next/image"
import { toast } from "react-toastify"
import axios from "axios"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import { SessionsDTO } from "../../types"

type Props = {
    session: SessionsDTO
    isMiniButton: boolean
}

const FavoriteButton = ({ session, isMiniButton }: Props) => {
    const { userInfo, isAuth } = useUserAuthenticationContext()
    const [latestFavoritedSessionId, setLatestFavoritedSessionId] = useState<number | null>(
        session.favoritedSessions.length > 0 ? session.favoritedSessions[0].id : null
    )

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
        if (userInfo) {
            await axios
                .post("/api/addFavoriteSession", {
                    session_id: session.id,
                    user_id: userInfo.id
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
            {userInfo &&
                (isMiniButton ? (
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
                ) : (
                    <button
                        className="flex w-full md:w-auto justify-center gap-2 items-center bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] rounded-[8px]"
                        onClick={() => {
                            if (latestFavoritedSessionId !== null) {
                                handleRemoveFavorite()
                            } else {
                                handleAddFavorite()
                            }
                        }}
                    >
                        <NextImage
                            src={latestFavoritedSessionId !== null ? "/vector-bookmark2.svg" : "/vector-bookmark.svg"}
                            width={12}
                            height={16}
                        />
                        {latestFavoritedSessionId !== null ? "BOOKMARKED" : "BOOKMARK"}
                    </button>
                ))}
        </>
    )
}
export default FavoriteButton
