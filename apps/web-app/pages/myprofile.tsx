import React from "react"

import { GetServerSideProps } from "next"

import MyProfilePage from "../templates/MyProfilePage"

import { EventsDTO, SessionsDTO } from "../types"

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
}

export default function MyProfile({ events, sessions }: Props) {
    return <MyProfilePage events={events} sessions={sessions} />
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const LOGGED_IN_USER_ID = 1
    try {
        const url = process.env.URL_TO_FETCH

        const eventsResponse = await fetch(`${url}/api/fetchEvents`)

        const events: EventsDTO[] = await eventsResponse.json()

        const sessionsResponse = await fetch(`${url}/api/fetchSessions/${LOGGED_IN_USER_ID}`)

        const sessions: SessionsDTO[] = await sessionsResponse.json()

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
