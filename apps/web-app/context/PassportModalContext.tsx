import { createContext, ReactNode, useState, useContext } from "react"

type PassportModalContextData = {
    openPassportModal: boolean
    setOpenPassportModal: (b: boolean) => void
}

type PassportModalProviderProps = {
    children: ReactNode
}

export const PassportModalContext = createContext({} as PassportModalContextData)

export function PassportModalContextProvider({ children }: PassportModalProviderProps) {
    const [openPassportModal, setOpenPassportModal] = useState(false)

    return (
        <PassportModalContext.Provider value={{ openPassportModal, setOpenPassportModal }}>
            {children}
        </PassportModalContext.Provider>
    )
}

export const usePassportModalContext = () => useContext(PassportModalContext)
