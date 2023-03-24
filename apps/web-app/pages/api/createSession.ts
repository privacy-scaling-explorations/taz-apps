import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
// import fetch from "node-fetch"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res })

    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session)
        return res.status(401).json({
            error: "not_authenticated",
            description: "The user does not have an active session or is not authenticated"
        })

    if (session) {
        try {
            const {
                name,
                description,
                startDate,
                endDate,
                location,
                startTime,
                endTime,
                organizers,
                tags,
                info,
                eventId,
                hasTicket,
                type,
                format,
                equipment,
                team_members,
                track,
                subEventId
            } = req.body

            console.log("event_id", eventId)

            await supabase.from("sessions").insert({
                name,
                description,
                startDate,
                endDate,
                location,
                startTime,
                endTime,
                organizers,
                tags,
                info,
                event_id: eventId,
                hasTicket,
                type,
                format,
                team_members,
                track,
                equipment,
                subevent_id: subEventId
            })
            // console.log("Response: ", response)

            res.status(201).json("Event created")
        } catch (error) {
            console.log("error: ", error)
            res.status(500).json({ statusCode: 500, message: error })
        }
    }
}
