import { GetServerSideProps } from "next"

import { EventsDTO } from "../types"
import EventsPage from "../templates/EventsPage"

type Props = {
    events: EventsDTO[]
}

export default function Events({ events }: Props) {
    return <EventsPage events={events} />
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const eventsResponse = await fetch(`${url}/api/fetchEvents`)
        const events = await eventsResponse.json()
        return {
            props: { events }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
