import React from "react"

import { GetServerSideProps } from "next"

import MyProfilePage from "../templates/MyProfilePage"

import { FavoritedEventsDTO, ParticipantsDTO, UserDTO } from "../types"

type Props = {
    pastEvents: ParticipantsDTO[]
    attendingEvents: ParticipantsDTO[]
    userEventsFavorited: FavoritedEventsDTO[]
    userInfo: UserDTO | undefined
}

export default function MyProfile({ pastEvents, attendingEvents, userEventsFavorited, userInfo }: Props) {
    return <MyProfilePage />
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    try {
        const url = process.env.URL_TO_FETCH
        const usersResult = await fetch(`${url}/api/fetchUsers`)
        const participantsResult = await fetch(`${url}/api/fetchParticipants`)
        const usersFavoriteEventsResult = await fetch(`${url}/api/fetchFavoritedEvents`)

        const usersData: UserDTO[] = await usersResult.json()
        const participantsData: ParticipantsDTO[] = await participantsResult.json()
        const usersFavoriteData: FavoritedEventsDTO[] = await usersFavoriteEventsResult.json()

        // mocked user for now (fetching user 1 from db)
        // since we implement user authentication in the server side, we need to fetch user dinamically
        const userEvents = participantsData.filter((item) => item.user_id === 1)
        const userEventsFavorited = usersFavoriteData.filter((item) => item.user_id === 1)
        const pastEvents = userEvents.filter((item) => {
            const todayDate = new Date().getTime()
            const eventDate = new Date(item.events.endDate).getTime()
            if (todayDate > eventDate) {
                return item
            }
        })
        const attendingEvents = userEvents.filter((item) => {
            const todayDate = new Date().getTime()
            const eventDate = new Date(item.events.endDate).getTime()
            if (todayDate < eventDate) {
                return item
            }
        })
        const userInfo = usersData.find((item) => item.id === 1)

        return {
            props: { pastEvents, attendingEvents, userEventsFavorited, userInfo }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
