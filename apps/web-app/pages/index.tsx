// pages/index.tsx
import { GetServerSideProps } from "next"
import { EventsDTO } from "../types"
import HomeTemplate from "../templates/Home"

type Props = {
    events: EventsDTO[]
}

const Home = ({ events }: Props) => <HomeTemplate events={events} />

export default Home

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