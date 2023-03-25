import { GetServerSideProps } from "next"

import axios from "axios"
import { EventsDTO, SessionsDTO } from "../../types"
import EventPage from "../../templates/EventPage"

type Props = {
    event: EventsDTO
    sessions: SessionsDTO[]
}

export default function Event({ event, sessions }: Props) {
    return <EventPage event={event} sessions={sessions} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const eventResponse = await fetch(`${url}/api/fetchEvents/${query.parentMessageId}`)

        const sessionsResponse = await axios.get(`${url}/api/fetchSessionsByEvent/${query.parentMessageId}`, {
            headers: {
                Cookie: req.headers.cookie || "" // Pass cookies from the incoming request
            }
        })

        const event = await eventResponse.json()
        const sessions: SessionsDTO[] = await sessionsResponse.data

        return {
            props: { event, sessions }
        }
    } catch (error: any) {
        console.error("Error fetching sessions:", error.message)
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
