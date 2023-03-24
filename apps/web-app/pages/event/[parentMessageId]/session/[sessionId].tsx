
import { GetServerSideProps } from "next"
import axios from "axios"
import SessionPage from "../../../../templates/SessionPage"
import { SessionsDTO} from "../../../../types"

type Props = {
    session: SessionsDTO
    sessions: SessionsDTO[]
}


const Session = ({ session, sessions}: Props) => <SessionPage session={session} sessions={sessions} />

export default Session

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    const LOGGED_IN_USER_ID = 2
    try {
        const url = process.env.URL_TO_FETCH

        const response = await axios.get(`${url}/api/fetchSession/${query.sessionId}/${LOGGED_IN_USER_ID}`)
        const session = await response.data

        console.log("URL to fetch", `${url}/api/fetchSession/${query.sessionId}`)
        const sessionsResponse = await axios.get(`${url}/api/fetchSessions/${LOGGED_IN_USER_ID}`)
        const sessions = sessionsResponse.data

        return {
            props: { session, sessions}
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}