// import type { AppProps } from "next/app"
import { PassportModalContextProvider } from "../context/PassportModalContext"
import { UserAuthenticationProvider } from "../context/UserAuthenticationContext"

import "../styles/globals.css"
import "../styles/drawingComponent.css"
import "react-toastify/dist/ReactToastify.css"
import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"

const MyApp = ({ Component, pageProps }) => (
    <UserAuthenticationProvider>
        <PassportModalContextProvider>
            <Component {...pageProps} />
        </PassportModalContextProvider>
    </UserAuthenticationProvider>
)

export default MyApp
