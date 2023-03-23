import { GetServerSideProps } from "next"
import axios from "axios"
import SessionPage from "../../../../templates/SessionPage"

import { SessionsDTO, EventsDTO } from "../../../../types"

type Props = {
    session: SessionsDTO
    event: EventsDTO
}

const LOGGED_IN_USER_ID = 1

const Session = ({ session, event }: Props) => <SessionPage event={event} session={session} />

export default Session

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const response = await axios.get(`${url}/api/fetchSession/${query.sessionId}/${LOGGED_IN_USER_ID}`)
        const session = await response.data

        console.log("URL to fetch", `${url}/api/fetchSession/${query.sessionId}/${LOGGED_IN_USER_ID}`)

        const eventResponse = await axios.get(`${url}/api/fetchEvents/${query.parentMessageId}`)
        const event = await eventResponse.data

        return {
            props: { session, event }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
