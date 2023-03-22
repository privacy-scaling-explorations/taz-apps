import { GetServerSideProps } from "next"
import { createClient } from "@supabase/supabase-js"
import { SessionsDTO } from "../../types"

type Props = {
    sessions: SessionsDTO[]
}

export default function AuthTest({ sessions }: Props) {
    const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey as string)
    supabase.auth.signInWithPassword({
        email: "test123@test123.com",
        password: "asdfasdf"
    })

    // if (error) {
    //     console.log({ error })
    // }
    return <div> {JSON.stringify(sessions)} </div>
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    // try {
    // const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
    // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
    // const supabase = createClient(supabaseUrl, supabaseKey as string)

    // const userSession = await supabase.auth.getUser()
    // console.log("userSession: ", userSession)

    const url = process.env.URL_TO_FETCH

    const response = await fetch(`${url}/api/fetchSessions/1`)
    const sessions = await response.json()
    return {
        props: { sessions }
    }
    // } catch (error) {
    //     res.statusCode = 404
    //     return {
    //         props: {}
    //     }
    // }
}
