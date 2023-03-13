import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import Link from "next/link"

import axios from "axios"

import BackTAZ from "../ArrowNavigators/BackTAZ"
import Loading from "../Loading"

type UserDTO = {
    code: string
    created_at: Date
    email: string
    id: number
    semaphoreId: string
    userName: string
}

type EventsDTO = {
    created_at: Date
    endDate: Date
    endTime: string
    id: 21
    info: string
    location: string
    name: string
    organizers: string[]
    startDate: Date
    startTime: string
    tags: string[]
}

type ParticipantsDTO = {
    created_at: Date
    event_id: number
    user_id: number
    events: EventsDTO
    users: UserDTO[]
}

type FavoritedEventsDTO = {
    created_at: Date
    event_id: number
    user_id: number
    events: EventsDTO
    users: UserDTO[]
}

const MyEventsComponent = () => {
    const router = useRouter()
    const [user, setUser] = useState<UserDTO>()
    const [participants, setParticipants] = useState<ParticipantsDTO[]>()
    const [favoritedEvents, setFavoritedEvents] = useState<FavoritedEventsDTO[]>()

    const fetchUsers = async () => {
        await axios
            .get("/api/fetchUsers")
            .then((res) => {
                const sempahoreId = localStorage.getItem("semaphore-id")
                const userWithSameSemaphoreId = res.data.find((item: UserDTO) => item.semaphoreId === sempahoreId)
                if (userWithSameSemaphoreId) {
                    setUser(userWithSameSemaphoreId)
                }
            })
            .catch((err) => console.log(err))
    }

    const fetchParticipants = async () => {
        await axios
            .get("/api/fetchParticipants")
            .then((res) => {
                setParticipants(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchFavoritedEvents = async () => {
        await axios
            .get("/api/fetchFavoritedEvents")
            .then((res) => {
                setFavoritedEvents(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchUsers()
        fetchParticipants()
        fetchFavoritedEvents()
    }, [])

    if (!user || !participants || !favoritedEvents) {
        return (
            <div className="mx-6 my-8">
                <Link href="/experiences-page">
                    <div className="flex max-w-[76px] max-h-[32px] bg-black mb-7 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
                        <BackTAZ />
                        <h1>TAZ</h1>
                    </div>
                </Link>
                <div className="py-5 flex justify-center">
                    <div className="">
                        <Loading />
                    </div>
                </div>
            </div>
        )
    }

    const userEvents = participants.filter((item: ParticipantsDTO) => item.user_id === user.id)
    const userEventsFavorited = favoritedEvents.filter((item: ParticipantsDTO) => item.user_id === user.id)
    const pastEvents = userEvents.filter((item: ParticipantsDTO) => {
        const todayDate = new Date().getTime()
        const eventDate = new Date(item.events.endDate).getTime()
        if (todayDate > eventDate) {
            return item
        }
    })
    const attendingEvents = userEvents.filter((item: ParticipantsDTO) => {
        const todayDate = new Date().getTime()
        const eventDate = new Date(item.events.endDate).getTime()
        if (todayDate < eventDate) {
            return item
        }
    })

    const goToEventPage = (id: number) => {
        router.push(`/answers/${id}`)
    }

    return (
        <div className="mx-6 my-8">
            <Link href="/experiences-page">
                <div className="flex max-w-[76px] max-h-[32px] bg-black mb-7 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
                    <BackTAZ />
                    <h1>TAZ</h1>
                </div>
            </Link>
            <div className="flex flex-col w-3/6">
                <h2 className="relative inline-block bg-black mb-12 text-4xl text-brand-beige2">
                    Hello, {user.userName.toLocaleUpperCase()} !
                </h2>
                <h2 className="relative inline-block bg-black mb-12 text-4xl text-brand-beige2">
                    Take a look at YOUR EVENTS.
                </h2>
            </div>
            <div className="flex flex-col gap-4 py-20">
                <div className="flex-grow text-center md:text-start text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                    <h1>Past Events</h1>
                    <div className="flex flex-wrap py-10 gap-5 justify-center md:justify-start">
                        {pastEvents.length !== 0 ? (
                            pastEvents.map((item: ParticipantsDTO, index) => (
                                <div key={index} className="h-[150px] flex flex-col justify-between">
                                    <div className="flex flex-col items-center justify-center w-full h-full gap-4 ring-2 ring-brand-black rounded-t-md">
                                        <h1>{item.events.name}</h1>
                                        <h1>Start: {item.events.startDate.getMonth()}</h1>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => goToEventPage(item.event_id)}
                                            className="w-full bg-brand-yellow ring-2 rounded-b-md ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                                        >
                                            Go to event
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No Events</h1>
                        )}
                    </div>
                </div>
                <div className="flex-grow text-center md:text-start text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                    <h1>Attending Events</h1>
                    <div className="flex flex-wrap py-10 gap-5 justify-center md:justify-start">
                        {attendingEvents.length !== 0 ? (
                            attendingEvents.map((item: ParticipantsDTO, index) => (
                                <div key={index} className="h-[150px] flex flex-col justify-between w-[200px]">
                                    <div className="flex flex-col items-center justify-center w-full h-full gap-4 ring-2 ring-brand-black rounded-t-md">
                                        <h1>{item.events.name}</h1>
                                        <h1>
                                            {new Date(item.events.startDate).toLocaleString("default", {
                                                month: "long"
                                            })}{" "}
                                            {new Date(item.events.startDate).getDate()}
                                        </h1>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => goToEventPage(item.event_id)}
                                            className="w-full bg-brand-yellow ring-2 rounded-b-md ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                                        >
                                            Go to event
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No Events</h1>
                        )}
                    </div>
                </div>
                <div className="flex-grow text-center md:text-start text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                    <h1>Favorites Events</h1>
                    <div className="flex flex-wrap py-10 gap-5 justify-center md:justify-start">
                        {userEventsFavorited.length !== 0 ? (
                            userEventsFavorited.map((item: FavoritedEventsDTO, index) => (
                                <div key={index} className="h-[150px] flex flex-col justify-between w-[200px]">
                                    <div className="flex flex-col items-center justify-center w-full h-full gap-4 ring-2 ring-brand-black rounded-t-md">
                                        <h1>{item.events.name}</h1>
                                        <h1>
                                            {new Date(item.events.startDate).toLocaleString("default", {
                                                month: "long"
                                            })}{" "}
                                            {new Date(item.events.startDate).getDate()}
                                        </h1>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => goToEventPage(item.event_id)}
                                            className="w-full bg-brand-yellow ring-2 rounded-b-md ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                                        >
                                            Go to event
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No Events</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyEventsComponent
