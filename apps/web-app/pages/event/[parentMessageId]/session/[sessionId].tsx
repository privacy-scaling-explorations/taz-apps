import { GetServerSideProps } from "next"

import SessionPage from "../../../../templates/SessionPage"

import { SessionsDTO, RsvpDTO } from "../../../../types"

type Props = {
    session: SessionsDTO
    sessions: SessionsDTO[]
}

const LOGGED_IN_USER_ID = 1

const Session = ({ session, sessions }: Props) => {
    const createRsvp = async (userId: number, sessionId: number) => {
        let newRsvp: RsvpDTO | null = null
        try {
            const response = await fetch(`/api/createRsvp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, sessionId })
            })
            newRsvp = await response.json()
        } catch (error) {
            console.log(error)
        }
        return newRsvp
    }

    const deleteRsvp = async (id: number) => {
        const url = process.env.URL_TO_FETCH
        try {
            await fetch(`/api/deleteRsvp/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            console.log(error)
            return false
        }
        return true
    }

    return <SessionPage session={session} sessions={sessions} createRsvp={createRsvp} deleteRsvp={deleteRsvp} />
}

export default Session

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const sessionResponse = await fetch(`${url}/api/fetchSession/${query.sessionId}?userId=${LOGGED_IN_USER_ID}`)
        const session = await sessionResponse.json()

        const sessionsResponse = await fetch(`${url}/api/fetchSessions/`)
        const sessions = await sessionsResponse.json()

        return {
            props: { session: session[0], sessions }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
