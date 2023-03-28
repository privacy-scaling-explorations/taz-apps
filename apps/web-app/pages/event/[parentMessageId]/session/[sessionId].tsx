import { GetServerSideProps } from "next"
import axios from "axios"
import SessionPage from "../../../../templates/SessionPage"
import { SessionsDTO } from "../../../../types"

type Props = {
    session: SessionsDTO
    sessions: SessionsDTO[]
}

const Session = ({ session, sessions }: Props) => <SessionPage session={session} sessions={sessions} />

export default Session

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const responseSession = await axios.get(`${url}/api/fetchSession/${query.sessionId}`, {
            headers: {
                Cookie: req.headers.cookie || "" // Pass cookies from the incoming request
            }
        })

        const session = await responseSession.data
        console.log("found", session)
        const responseSessions = await axios.get(`${url}/api/fetchSessions`, {
            headers: {
                Cookie: req.headers.cookie || "" // Pass cookies from the incoming request
            }
        })

        const sessions = await responseSessions.data

        return {
            props: { session, sessions }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
