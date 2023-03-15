// import type { AppProps } from "next/app"

import { IdentityContextProvider } from "../context/IdentityContextProvider"
import { UserIdentityProvider } from "../context/UserIdentityContext"
import "../styles/globals.css"
import "../styles/drawingComponent.css"

const MyApp = ({ Component, pageProps }) => (
    <IdentityContextProvider>
        <UserIdentityProvider>
            <Component {...pageProps} />
        </UserIdentityProvider>
    </IdentityContextProvider>
)

export default MyApp
