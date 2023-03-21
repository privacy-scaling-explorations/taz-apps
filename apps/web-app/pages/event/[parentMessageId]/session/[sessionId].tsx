import { GetServerSideProps } from "next"

import SessionPage from "../../../../templates/SessionPage"

import { SessionsDTO, RsvpDTO } from "../../../../types"

type Props = {
    session: SessionsDTO
}

const LOGGED_IN_USER_ID = 1

const Session = ({ session }: Props) => {
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

    return <SessionPage session={session} createRsvp={createRsvp} deleteRsvp={deleteRsvp} />
}

export default Session

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const response = await fetch(`${url}/api/fetchSession/${query.sessionId}?userId=${LOGGED_IN_USER_ID}`)
        const session = await response.json()

        return {
            props: { session: session[0] }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
