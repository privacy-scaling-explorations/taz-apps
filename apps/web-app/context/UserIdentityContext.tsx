import { createContext, ReactNode, useState, useContext, useEffect, useMemo } from "react"
import axios from "axios"

import { EventsDTO, FavoritedEventsDTO, ParticipantsDTO, SessionsDTO, UserDTO } from "../types"

type UserIdentityContextData = {
    userInfo: UserDTO | undefined
    setUserInfo: (userInfo: UserDTO) => void
    isAuthenticated: boolean
}

type UserIdentityProviderProps = {
    children: ReactNode
}

export const UserIdentityContext = createContext({} as UserIdentityContextData)

export function UserIdentityProvider({ children }: UserIdentityProviderProps) {
    const [userInfo, setUserInfo] = useState<UserDTO>()
    const [userEvents, setUserEvents] = useState<EventsDTO[]>()
    const [userSessions, setUserSessions] = useState<SessionsDTO[]>()
    const [userRSVP, setUserRSVP] = useState<ParticipantsDTO[]>()
    const [userBookmarks, setUserBookmarks] = useState<FavoritedEventsDTO[]>()

    const isAuthenticated = useMemo(() => Boolean(userInfo), [userInfo])

    const authUser = async () => {
        const userLocalStorageSession = localStorage.getItem("sb-polcxtixgqxfuvrqgthn-auth-token") as string
        const userUuid = JSON.parse(userLocalStorageSession).user.id

        if (userUuid) {
            await axios
                .get("/api/fetchUsers")
                .then((res) => {
                    const findUser = res.data.find((item: any) => item.uui_auth === userUuid)
                    setUserInfo(findUser)
                })
                .catch((err) => console.log(err))
        }
    }

    const fetchEvents = async () => {
        if (userInfo) {
            await axios
                .get(`/api/fetchFavoritedByUserId/${userInfo.id}`)
                .then((res) => {
                    // setUserInfo(findUser)
                    console.log(res)
                })
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        authUser()
        fetchEvents()
    }, [])

    return (
        <UserIdentityContext.Provider value={{ setUserInfo, userInfo, isAuthenticated }}>
            {children}
        </UserIdentityContext.Provider>
    )
}

export const useUserIdentityContext = () => useContext(UserIdentityContext)
