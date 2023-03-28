import { createContext, ReactNode, useState, useContext, useEffect, useMemo } from "react"
import axios from "axios"

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionsDTO, UserDTO } from "../types"

type UserAuthenticationContextData = {
    userInfo: UserDTO | undefined
    setUserInfo: (b: UserDTO) => void
    isAuth: boolean
    userRole: string
    userSessions: SessionsDTO[]
    userParticipatingSessions: SessionsDTO[]
}

type UserAuthenticationProviderProps = {
    children: ReactNode
}

export const UserAuthenticationContext = createContext({} as UserAuthenticationContextData)

export function UserAuthenticationProvider({ children }: UserAuthenticationProviderProps) {
    const [userInfo, setUserInfo] = useState<UserDTO>()
    const [userSessions, setUserSessions] = useState<SessionsDTO[]>([])
    const [userRole, setUserRole] = useState("")

    const [userParticipatingSessions, setUserParticipatingSessions] = useState<SessionsDTO[]>([])

    const isAuth = useMemo(() => Boolean(userInfo), [userInfo])

    const supabase = createBrowserSupabaseClient()

    const fetchUser = async () => {
        const {
            data: { session }
        } = await supabase.auth.getSession()

        if (!session) {
            return setUserInfo(undefined)
        }

        await axios
            .get(`${window.location.href}/api/fetchUser/${session.user.id}/`)
            .then((res) => {

                setUserRole(session.user.user_metadata.role)
                setUserInfo(res.data)
            })
            .catch((error) => {
                console.log("USER AUTH CONTEXT FAILED TO FETCH USER ID", error)
            })
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
        fetchUser()
    }, [])

    useEffect(() => {
        fetchEvents()
    }, [userInfo])

    return (
        <UserAuthenticationContext.Provider
            value={{ userInfo, isAuth, setUserInfo, userParticipatingSessions, userRole, userSessions }}
        >
            {children}
        </UserAuthenticationContext.Provider>
    )
}

export const useUserAuthenticationContext = () => useContext(UserAuthenticationContext)
