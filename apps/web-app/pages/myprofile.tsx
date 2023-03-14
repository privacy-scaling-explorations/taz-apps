import React from "react"

import { GetServerSideProps } from "next"
import axios from "axios"

import MyProfileComponent from "../components/MyProfile"

import { FavoritedEventsDTO, ParticipantsDTO, UserDTO } from "../types"

type Props = {
    pastEvents: ParticipantsDTO[]
    attendingEvents: ParticipantsDTO[]
    userEventsFavorited: FavoritedEventsDTO[]
    userInfo: UserDTO | undefined
}

export default function MyProfile({ pastEvents, attendingEvents, userEventsFavorited, userInfo }: Props) {
    return (
        <MyProfileComponent
            pastEvents={pastEvents}
            attendingEvents={attendingEvents}
            userEventsFavorited={userEventsFavorited}
            userInfo={userInfo}
        />
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    try {
        const usersResult = await axios.get('/api/fetchUsers')
        const participantsResult = await axios.get('/api/fetchParticipants')
        const usersFavoriteEventsResult = await axios.get('/api/fetchFavoritedEvents')

        const usersData: any = usersResult.data
        const participantsData: any = participantsResult.data
        const usersFavoriteData: any = await usersFavoriteEventsResult.data

        // mocked user for now (fetching user 1 from db)
        // since we implement user authentication in the server side, we need to fetch user dinamically
        const userEvents = participantsData.filter((item : any) => item.user_id === 1)
        const userEventsFavorited = usersFavoriteData.filter((item : any) => item.user_id === 1)
        const pastEvents = userEvents.filter((item : any) => {
            const todayDate = new Date().getTime()
            const eventDate = new Date(item.events.endDate).getTime()
            if (todayDate > eventDate) {
                return item
            }
        })
        const attendingEvents = userEvents.filter((item : any) => {
            const todayDate = new Date().getTime()
            const eventDate = new Date(item.events.endDate).getTime()
            if (todayDate < eventDate) {
                return item
            }
        })
        const userInfo = usersData.find((item : any) => item.id === 1)

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
