import NextImage from "next/image"
import { useRouter } from "next/router"
import NextLink from "next/link"
import axios from "axios"
import { toast } from "react-toastify"
import { FavoritedEventsDTO, ParticipantsDTO, SessionsDTO, EventsDTO } from "../../types"

type Props = {
    event: EventsDTO
    sessions: SessionsDTO[]
    checkIfUserHaveAttended: ParticipantsDTO | undefined
    checkIfUserHadFavorited: FavoritedEventsDTO | undefined
}

const Sessions = ({ event, checkIfUserHadFavorited, checkIfUserHaveAttended, sessions }: Props) => {
    const router = useRouter()

    const handleClickAttend = async () => {
        if (checkIfUserHaveAttended) {
            await axios
                .post("/api/removeParticipant", {
                    id: checkIfUserHaveAttended.id
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("You are now not attending to this event anymore.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
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
                })
        } else {
            await axios
                .post("/api/addParticipant", {
                    event_id: event.id,
                    user_id: 1
                })
                .then((res) => {
                    if (res.data === "Participant added") {
                        toast.success("You are now attending to this event.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
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
                })
        }
    }

    const handleClickFavorite = async () => {
        if (checkIfUserHadFavorited) {
            await axios
                .post("/api/removeFavoriteEvent", {
                    id: checkIfUserHadFavorited.id
                })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("This event is not anymore favorite.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
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
                })
        } else {
            await axios
                .post("/api/addFavoriteEvent", {
                    event_id: event.id,
                    user_id: 1
                })
                .then((res) => {
                    if (res.data === "Event favorited") {
                        toast.success("You favorited this event.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                        router.push(router.asPath)
                    }
                })
                .catch((err) => {
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
                })
        }
    }
    return (
        <div className="w-full flex flex-col items-start py-[2px] gap-[16px] rounded-[16px]">
            {sessions.map((item, index) => (
                <div className="w-full" key={index}>
                    <div className="bg-[#1C2928] w-full flex flex-row items-center rounded-[8px]">
                        <p className="text-white py-[8px] px-[16px]">{item.startTime.slice(0, -3)}</p>
                    </div>

                    <div className="w-full flex flex-col items-start gap-[32px] bg-[#FCFFFE]] rounded-[16px] p-[16px]">
                        <div className="w-full flex flex-row justify-between items-center gap-[67px]]">
                            <div className="flex flex-row items-center gap-[16px]">
                                <NextLink href={`/event/${event.id}/session/${item.id}`}>
                                    <h3 className="text-lg text-[#424242] font-[600] text-[24px] border-b border-[#52B5A4] cursor-pointer">
                                        {item.name}
                                    </h3>
                                </NextLink>
                                <NextImage
                                    className="text-[#91A8A7] cursor-pointer"
                                    src={"/vector-bookmark.svg"}
                                    alt="vector-bookmark"
                                    width={24}
                                    height={24}
                                    onClick={() => handleClickFavorite()}
                                />
                            </div>
                            <button
                                className="bg-[#35655F] text-white py-[4px] px-[16px] text-[16px] rounded-[6px]"
                                onClick={() => handleClickAttend()}
                            >
                                RSVP
                            </button>
                        </div>
                        <div className="w-full flex flex-row gap-[32px] justify-between items-center">
                            <div className="flex flex-row items-start gap-[8px]">
                                {item.organizers.map((organizer, key) => (
                                    <div
                                        className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]"
                                        key={key}
                                    >
                                        <NextImage src={"/user-icon-6.svg"} alt="user-icon-6" width={24} height={24} />
                                        <p className="text-[#1C2928] font-[400] text-[16px]">
                                            Organizer: <span className="font-[600] capitalize">{organizer}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-row items-end gap-[32px] text-sm">
                                <div className="flex flex-row items-center gap-[8px]">
                                    <NextImage src={"/vector-clock.svg"} alt="vector-clock" width={16} height={16} />
                                    <p className="text-[#708E8C] text-[18px]">
                                        {item.startTime.slice(0, -3)}-{item.endTime.slice(0, -3)}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-[8px] border-b border-[#708E8C] text-[#708E8C]">
                                    <NextImage src={"/vector-location.svg"} alt="location" width={15} height={15} />
                                    <p className="text-[18px]">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Sessions
