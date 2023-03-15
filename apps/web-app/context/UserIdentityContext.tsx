import { createContext, ReactNode, useState, useContext, useEffect } from "react"
import axios from "axios"

type UserIdentityContextData = {
    userInfo: string[]
    setUserInfo: (userInfo: string[]) => void
}

type UserIdentityProviderProps = {
    children: ReactNode
}

export const UserIdentityContext = createContext({} as UserIdentityContextData)

export function UserIdentityProvider({ children }: UserIdentityProviderProps) {
    const [userInfo, setUserInfo] = useState([""])

    const fetchUsers = async () => {
        await axios
            .get("/api/fetchUsers")
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    useEffect(() => {}, [])

    return <UserIdentityContext.Provider value={{ setUserInfo, userInfo }}>{children}</UserIdentityContext.Provider>
}

export const useUserIdentityContext = () => useContext(UserIdentityContext)
