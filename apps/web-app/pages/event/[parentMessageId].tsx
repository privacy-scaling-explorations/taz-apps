import { GetServerSideProps } from "next"

import { EventsDTO, ParticipantsDTO, FavoritedEventsDTO } from "../../types"
import EventPage from "../../templates/EventPage"

type Props = {
    event: EventsDTO
    participants: ParticipantsDTO[]
    favoritedEvents: FavoritedEventsDTO[]
}

export default function Event({ event, participants, favoritedEvents }: Props) {
    return <EventPage event={event} participants={participants} favoritedEvents={favoritedEvents} />
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const response = await fetch(`${url}/api/fetchEvents/${query.parentMessageId}`)
        const participantsResponse = await fetch(`${url}/api/fetchParticipants`)
        const favoritedEventsResponse = await fetch(`${url}/api/fetchFavoritedEvents`)
        const event = await response.json()
        const participants = await participantsResponse.json()
        const favoritedEvents = await favoritedEventsResponse.json()

        return {
            props: { event, participants, favoritedEvents }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
