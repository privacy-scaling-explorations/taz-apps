import { GetServerSideProps } from "next"

import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO } from "../../types"
import EventPage from "../../templates/EventPage"

type Props = {
    event: EventsDTO
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
}

export default function Event({ event, sessions }: Props) {
    return <EventPage event={event} sessions={sessions} />
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    const LOGGED_IN_USER_ID = 1
    try {
        const url = process.env.URL_TO_FETCH

        const response = await fetch(`${url}/api/fetchEvents/${query.parentMessageId}`)
        const sessionsResponse = await fetch(
            `${url}/api/fetchSessionsByEvent/?eventId=${query.parentMessageId}&userId=${LOGGED_IN_USER_ID}`
        )
        const event = await response.json()
        const sessions = await sessionsResponse.json()

        return {
            props: { event, sessions }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
