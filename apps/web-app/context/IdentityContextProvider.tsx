import React, { useCallback, useState } from 'react'
import { contextFactory } from './helpers/contextFactory'

export type Identity = string

const [useIdentityContext, IdentityContext] = contextFactory<Identity>()
const [useIdentityLoginContext, IdentityLoginContext] =
  contextFactory<(value: Identity) => void>()

export { useIdentityContext, useIdentityLoginContext }

export type IdentityContextProviderProps = {
  children: React.ReactNode
}

const getInitialIdentityValue = () => {
  try {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('identity') || ''
    }
    return ''
  } catch {
    return ''
  }
}

export function IdentityContextProvider({
  children,
}: IdentityContextProviderProps) {
  const [identity, setIdentity] = useState<Identity>(getInitialIdentityValue())

  const onSetIdentity = useCallback((value: Identity) => {
    setIdentity(value)
    window.localStorage.setItem('identity', value)
  }, [])

  return (
    <IdentityContext.Provider value={identity}>
      <IdentityLoginContext.Provider value={onSetIdentity}>
        {children}
      </IdentityLoginContext.Provider>
    </IdentityContext.Provider>
  )
}

// Context.Consumer and Context.Provider
