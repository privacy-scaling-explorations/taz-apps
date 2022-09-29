import { createContext, useContext } from 'react'

/**
 * This context factory creates a new context and a method to consume it
 */
export const contextFactory = <A extends unknown | null>() => {
  // Create new context
  const context = createContext<A | undefined>(undefined)
  // Create the context consumer method
  // If context value is undefined it means that either the context provider did not provide any value
  // or the consumer was used outside of the provider. In both cases, an error will be thrown to indicate
  // the the context is not consumer correctly
  const useCtx = () => {
    const ctx = useContext(context)
    if (ctx === undefined) {
      throw new Error(
        'useContext must be used inside of a Provider with a value.',
      )
    }
    return ctx
  }

  // Return a tuple with the method to consume the context and context
  return [useCtx, context] as const
}
