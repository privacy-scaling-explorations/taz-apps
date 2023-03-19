import { GetServerSideProps } from "next"

import SessionPage from "../../../../templates/SessionPage"

import { SessionsDTO } from "../../../../types"

type Props = {
    session: SessionsDTO
}

const Session = ({ session }: Props) => <SessionPage session={session} />

export default Session

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const response = await fetch(`${url}/api/fetchSession/${query.sessionId}`)
        const session = await response.json()

        return {
            props: { session }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
