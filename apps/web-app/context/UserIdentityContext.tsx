import { createContext, ReactNode, useState, useContext, useEffect, useMemo } from "react"
import axios from "axios"

import { SessionsDTO, UserDTO } from "../types"

type UserIdentityContextData = {
    userInfo: UserDTO | undefined
    setUserInfo: (userInfo: UserDTO) => void
    isAuthenticated: boolean
    userSessions: SessionsDTO[]
    userParticipatingSessions: SessionsDTO[]
}

type UserIdentityProviderProps = {
    children: ReactNode
}

export const UserIdentityContext = createContext({} as UserIdentityContextData)

export function UserIdentityProvider({ children }: UserIdentityProviderProps) {
    const [userInfo, setUserInfo] = useState<UserDTO>()
    const [userSessions, setUserSessions] = useState<SessionsDTO[]>([])
    const [userParticipatingSessions, setUserParticipatingSessions] = useState<SessionsDTO[]>([])

    const isAuthenticated = useMemo(() => Boolean(userInfo), [userInfo])

    const authUser = async () => {
        try {
            const userLocalStorageSession = localStorage.getItem("sb-polcxtixgqxfuvrqgthn-auth-token") as string
            const userUuid = JSON.parse(userLocalStorageSession)

            if (userLocalStorageSession && userUuid) {
                await axios
                    .get("/api/fetchUsers")
                    .then((res) => {
                        const findUser = res.data.find((item: any) => item.uui_auth === userUuid.user.id)
                        setUserInfo(findUser)
                    })
                    .catch((err) => console.log(err))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchEvents = async () => {
        if (userInfo) {
            await axios
                .get(`/api/fetchSessionsByUserId/${userInfo.id}`)
                .then((res) => {
                    const sessionsParticipanting = res.data.filter((item: any) => item.participants.length > 0)
                    const sessionsFavorited = res.data.filter((item: any) => item.favoritedSessions.length > 0)
                    const sessionsFilteredByUserId: SessionsDTO[] = [...sessionsFavorited, ...sessionsParticipanting]

                    setUserParticipatingSessions(sessionsParticipanting)
                    setUserSessions(sessionsFilteredByUserId)
                })
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        authUser()
    }, [])

    useEffect(() => {
        fetchEvents()
    }, [userInfo])

    return (
        <UserIdentityContext.Provider
            value={{ setUserInfo, userInfo, isAuthenticated, userSessions, userParticipatingSessions }}
        >
            {children}
        </UserIdentityContext.Provider>
    )
}

export const useUserIdentityContext = () => useContext(UserIdentityContext)
