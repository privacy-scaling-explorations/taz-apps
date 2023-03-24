import { GetServerSideProps } from "next"
import axios from "axios"

import { parseCookies } from "nookies"

import { EventsDTO, SessionsDTO } from "../types"
import CalendarPage from "../templates/CalendarPage"

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
}

export default function Event({ sessions, events }: Props) {
    return <CalendarPage sessions={sessions} events={events} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const eventsResponse = await fetch(`${url}/api/fetchEvents`)

        const events: EventsDTO[] = await eventsResponse.json()

        let sessionsRes: SessionsDTO[] = []

        await axios
            .get(`${url}/api/fetchSessions`, {
                headers: {
                    Cookie: req.headers.cookie || "" // Pass cookies from the incoming request
                }
            })
            .then((response: any) => {
                sessionsRes = response.data
            })

        return {
            props: { sessions: sessionsRes, events }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
