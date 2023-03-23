import { GetServerSideProps } from "next"

import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO, SessionsDTO } from "../types"
import CalendarPage from "../templates/CalendarPage"

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
}

export default function Event({ sessions, events }: Props) {
    return <CalendarPage sessions={sessions} events={events} />
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const eventsResponse = await fetch(`${url}/api/fetchEvents`)

        const events: EventsDTO[] = await eventsResponse.json()

        const sessionsResponse = await fetch(`${url}/api/fetchSessions`)

        const sessions: SessionsDTO[] = await sessionsResponse.json()

        return {
            props: { sessions: sessions, events: events }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
