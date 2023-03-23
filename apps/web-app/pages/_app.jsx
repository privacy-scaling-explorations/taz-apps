// import type { AppProps } from "next/app"
import { PassportModalContextProvider } from "../context/PassportModalContext"
import { UserIdentityProvider } from "../context/UserIdentityContext"

import "../styles/globals.css"
import "../styles/drawingComponent.css"
import "react-toastify/dist/ReactToastify.css"
import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"

const MyApp = ({ Component, pageProps }) => (
    <UserIdentityProvider>
        <PassportModalContextProvider>
            <Component {...pageProps} />
        </PassportModalContextProvider>
    </UserIdentityProvider>
)

export default MyApp
