import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react"

export default function Simple() {
    const logStuff = async () => {
        const supabase = createBrowserSupabaseClient()
        supabase.auth.signInWithPassword({
            email: "richwarneriii2@gmail.com",
            password: "asdfasdf"
        })
        console.log("supabase.auth.getSession(): ", await supabase.auth.getSession())
        console.log("supabase.auth.getUser(): ", await supabase.auth.getUser())

        const url = process.env.URL_TO_FETCH
        const response = await fetch(`${url}/api/fetchSessions/1`, {
            method: "GET",
            credentials: "same-origin"
        })
        const sessions = await response.json()

        console.log("session: ", sessions)

        // const url = process.env.URL_TO_FETCH
        // const response = await fetch(`${url}/api/fetchSessions/1`)
        // const sessions = await response.json()

        // console.log("sessions: ", sessions)
    }

    useEffect(() => {
        logStuff()
    }, [])

    return <div> Done </div>
}
