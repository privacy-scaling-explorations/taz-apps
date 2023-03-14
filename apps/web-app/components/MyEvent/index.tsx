import { useRouter } from "next/router"

import Link from "next/link"

import BackTAZ from "../ArrowNavigators/BackTAZ"
import Loading from "../Loading"

import { FavoritedEventsDTO, ParticipantsDTO, UserDTO } from "../../types"

type Props = {
    pastEvents: ParticipantsDTO[]
    attendingEvents: ParticipantsDTO[]
    favoritesEvents: FavoritedEventsDTO[]
    user: UserDTO | undefined
}

const MyEventsComponent = ({ user, favoritesEvents, attendingEvents, pastEvents }: Props) => {
    const router = useRouter()

    if (!user) {
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

    const goToEventPage = (id: number) => {
        router.push(`/event/${id}`)
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
                            pastEvents.map((item, index) => (
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
                            attendingEvents.map((item, index) => (
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
                        {favoritesEvents.length !== 0 ? (
                            favoritesEvents.map((item, index) => (
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
