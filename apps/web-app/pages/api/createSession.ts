import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
// import fetch from "node-fetch"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res })

    //Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
        return res.status(401).json({
            error: "not_authenticated",
            description: "The user does not have an active session or is not authenticated"
        })
    }

    const user = await supabase.from("users").select().eq("uui_auth", session.user.id).single()

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
                event_id,
                hasTicket,
                event_type,
                level,
                format,
                equipment,
                team_members,
                track,
                subEventId,
                event_slug,
                event_item_id,
                quota_id,
                duration,
                custom_location
            } = req.body

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
                event_id,
                hasTicket,
                event_type,
                level,
                format,
                team_members,
                track,
                equipment,
                subevent_id: subEventId,
                event_slug,
                event_item_id,
                quota_id,
                creator_id: user.data!.id,
                duration,
                custom_location
            })

            res.status(201).json("Sesson created")
        } catch (error) {
            console.log("error: ", error)
            res.status(500).json({ statusCode: 500, message: error })
        }
    }
}
