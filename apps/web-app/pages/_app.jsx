// import type { AppProps } from "next/app"

import { IdentityContextProvider } from "../context/IdentityContextProvider"
import { PassportModalContextProvider } from "../context/PassportModalContext"
import "../styles/globals.css"
import "../styles/drawingComponent.css"
import "react-toastify/dist/ReactToastify.css"
import "react-autocomplete-input/dist/bundle.css"
import "react-datepicker/dist/react-datepicker.css"


const MyApp = ({ Component, pageProps }) => (
    <IdentityContextProvider>
        <PassportModalContextProvider>
            <Component {...pageProps} />
        </PassportModalContextProvider>
    </IdentityContextProvider>
)

export default MyApp
