// import type { AppProps } from "next/app"

import { IdentityContextProvider } from "../context/IdentityContextProvider"
import { PassportModalContextProvider } from "../context/PassportModalContext"
import "../styles/globals.css"
import "../styles/drawingComponent.css"
import "react-toastify/dist/ReactToastify.css"
import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"

<<<<<<< HEAD
const MyApp = ({ Component, pageProps }) => {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <IdentityContextProvider>
            <PassportModalContextProvider>
                <Component {...pageProps} />
            </PassportModalContextProvider>
            </IdentityContextProvider>
        </SessionContextProvider>
    )
}
=======

const MyApp = ({ Component, pageProps }) => (
    <IdentityContextProvider>
        <PassportModalContextProvider>
            <Component {...pageProps} />
        </PassportModalContextProvider>
    </IdentityContextProvider>
)
>>>>>>> acaaf056ea0574acf648c785ff8478ab1018ffaf

export default MyApp
