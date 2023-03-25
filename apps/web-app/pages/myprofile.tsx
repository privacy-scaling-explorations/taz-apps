import React from "react"

import { GetServerSideProps } from "next"

import axios from "axios"
import MyProfilePage from "../templates/MyProfilePage"

import { EventsDTO, SessionsDTO } from "../types"

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
}

export default function MyProfile({ events, sessions }: Props) {
    return <MyProfilePage events={events} sessions={sessions} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const eventsResponse = await fetch(`${url}/api/fetchEvents`)

        const events: EventsDTO[] = await eventsResponse.json()

        const sessionsResponse = await axios.get(`${url}/api/fetchSessions`, {
            headers: {
                Cookie: req.headers.cookie || "" // Pass cookies from the incoming request
            }
        })

        const sessions = await sessionsResponse.data

        return {
            props: { sessions, events }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
