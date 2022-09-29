import type { AppProps } from 'next/app'

import { IdentityContextProvider } from '../context/IdentityContextProvider'
import '../styles/globals.css'
import '../styles/drawingComponent.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <IdentityContextProvider>
    <Component {...pageProps} />
  </IdentityContextProvider>
  
)

export default MyApp
