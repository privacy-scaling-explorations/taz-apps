// import type { AppProps } from "next/app"

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { useState } from "react"

import { IdentityContextProvider } from "../context/IdentityContextProvider"
import { PassportModalContextProvider } from "../context/PassportModalContext"

import "../styles/globals.css"
import "../styles/drawingComponent.css"

const MyApp = ({ Component, pageProps }) => {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            {/* <IdentityContextProvider> */}
            <PassportModalContextProvider>
                <Component {...pageProps} />
            </PassportModalContextProvider>
            {/* </IdentityContextProvider> */}
        </SessionContextProvider>
    )
}

export default MyApp
