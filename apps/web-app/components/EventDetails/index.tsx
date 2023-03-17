import "react-toastify/dist/ReactToastify.css"

import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { RiArrowLeftLine } from "react-icons/ri"
import dynamic from "next/dynamic"
import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO } from "../../types"

const PretixWidget = dynamic(() => import("../PretixWidget"), {
    ssr: false
})

type Props = {
    event: EventsDTO
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
    setUpdateEventModal: (b: boolean) => void
}

const EventDetails = ({ event, participants, favoritedEvents, setUpdateEventModal }: Props) => {
    const router = useRouter()

    const checkIfUserHaveAttended = participants
        .filter((item) => item.user_id === 1)
        .find((item) => item.event_id === event.id)

    const checkIfUserHadFavorited = favoritedEvents
        .filter((item) => item.user_id === 1)
        .find((item) => item.event_id === event.id)

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
        <div className="flex-grow mx-6 my-8 text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
            <div onClick={() => router.back()}>
                <RiArrowLeftLine className="fill-brand-gray50 cursor-pointer mb-4 border-0" />
            </div>

            <div className="border border-black relative">
                <div
                    className="absolute top-5 left-5 rounded-full bg-brand-yellow ring-2 ring-brand-black px-5"
                    onClick={() => setUpdateEventModal(true)}
                >
                    <h1>Edit Event</h1>
                </div>
                <div className="border border-brand-blue rounded-md p-4 text-center">
                    <h1 className="text-4xl font-bold mt-10">{event.name}</h1>
                    <div className="flex flex-col w-full justify-center my-5">
                        <h1>{`${event.startDate} -> ${event.endDate} , ${event.startTime}`}</h1>
                        <h1>{event.location}</h1>
                    </div>
                    <div className="flex w-full justify-center gap-2 mb-2">
                        <h1 className="font-bold">Organizers:</h1>
                        {event.organizers.map((item, index) => (
                            <h1 key={index} className="bg-green-200 p-1 rounded-md text-sm uppercase">
                                {item}
                            </h1>
                        ))}
                    </div>

                    <div className="flex w-full justify-center gap-2 mb-2">
                        <h1>Tags:</h1>
                        {event.tags.map((item, index) => (
                            <h1 key={index} className="bg-green-200 p-1 rounded-md text-sm uppercase">
                                {item}
                            </h1>
                        ))}
                    </div>

                    <div className="flex w-full justify-center gap-2 mb-5">
                        <h1>Additional Information:</h1>
                        <h1>{event.info}</h1>
                    </div>

                    <div className="w-full flex justify-center gap-5 my-5">
                        <button
                            type="button"
                            onClick={() => handleClickAttend()}
                            className={`rounded-full ${
                                checkIfUserHaveAttended ? "bg-green-200" : "bg-brand-yellow"
                            } ring-2 ring-brand-black px-4 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25`}
                        >
                            {checkIfUserHaveAttended ? "Attending" : "Attend"}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleClickFavorite()}
                            className={`rounded-full ${
                                checkIfUserHadFavorited ? "bg-green-200" : "bg-brand-yellow"
                            } ring-2 ring-brand-black px-4 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25`}
                        >
                            {checkIfUserHadFavorited ? "Favorited" : "Favorite"}
                        </button>
                    </div>

                    {/* <div className="w-full flex justify-center gap-5 my-5">
                        <button
                            type="button"
                            onClick={() => handleClickRegister()}
                            className="rounded-full bg-brand-yellow ring-2 ring-brand-black px-4 py-1 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                        >
                            Register
                        </button>
                    </div> */}
                    <div>
                        <PretixWidget event={event.publicUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetails
