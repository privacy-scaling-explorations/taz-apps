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

    try {
        const {
            name,
            startDate,
            endDate,
            location,
            startTime,
            endTime,
            tags,
            info,
            event_id,
            hasTicket,
            event_type,
            format,
            equipment,
            team_members,
            track,
            subEventId,
            event_slug,
            event_item_id
        } = req.body

        const response = await supabase.from("sessions").insert({
            name,
            startDate,
            endDate,
            location,
            startTime,
            endTime,
            tags,
            info,
            event_id: event_id,
            hasTicket,
            event_type: event_type,
            format,
            team_members,
            track,
            equipment,
            subevent_id: subEventId,
            event_slug,
            event_item_id
        })
        console.log("Response: ", response)

        res.status(201).json("Event created")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
