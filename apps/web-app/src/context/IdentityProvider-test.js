import React, { useContext, useState } from 'react'

export const IdentityContext = React.createContext()
export const IdentityLoginContext = React.createContext()

export function useIdentity() {
  return useContext(IdentityContext)
}

export function useIdentityLogin() {
  return useContext(IdentityLoginContext)
}

export function IdentityProvider({ children }) {
  const [identity, setIdentity] = useState('')

  function loginIdentity(value) {
    window.localStorage.setItem('identity', value)
    setIdentity(value)
  }

  // const loginIdentity = useCallback((value) => {
  //   setIdentity(value)
  //   window.localStorage.setItem('identity', value)
  // }, [])

  return (
    <IdentityContext.Provider value={identity}>
      <IdentityLoginContext.Provider value={loginIdentity}>
        {children}
      </IdentityLoginContext.Provider>
    </IdentityContext.Provider>
  )
}

// Context.Consumer and Context.Provider
