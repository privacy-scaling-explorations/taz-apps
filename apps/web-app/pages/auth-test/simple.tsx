import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react"
import axios from "axios"

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
        const response = await axios.get(`http://localhost:3000/api/fetchSessions/1`);
        const sessions = await response.data.json()

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
