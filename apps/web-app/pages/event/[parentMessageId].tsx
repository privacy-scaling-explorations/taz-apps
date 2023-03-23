import { GetServerSideProps } from "next"

import { EventsDTO, SessionsDTO } from "../../types"
import EventPage from "../../templates/EventPage"

type Props = {
    event: EventsDTO
    sessions: SessionsDTO[]
    sessionsByEventId: SessionsDTO[]
}

export default function Event({ event, sessions, sessionsByEventId }: Props) {
    return <EventPage event={event} sessions={sessions} />
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH
        const LOGGED_IN_USER_ID = 1

        const eventResponse = await fetch(`${url}/api/fetchEvents/${query.parentMessageId}`)
        const sessionsResponse = await fetch(
            `${url}/api/fetchSessionsByEvent/${query.parentMessageId}/${LOGGED_IN_USER_ID}`
        )

        const event = await eventResponse.json()
        const sessions: SessionsDTO[] = await sessionsResponse.json()

        const sessionsByEventId = sessions.filter((item) => item.event_id === parseInt(query.parentMessageId as string))
        return {
            props: { event, sessions, sessionsByEventId }
        }
    } catch (error: any) {
        console.error("Error fetching sessions:", error.message)
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
