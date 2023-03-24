import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  console.log("Body: ", req.body)
    try {
        const {
            id,
            description,
            name,
            startDate,
            location,
            startTime,
            tags,
            info,
            hasTicket,
            event_type,
            format,
            equipment,
            team_members,
            track,
            subEventId,
            quota_id
        } = req.body

        const response = await supabase
            .from("sessions")
            .update({
                name,
                description,
                startDate,
                location,
                startTime,
                tags,
                info,
                hasTicket,
                event_type,
                format,
                team_members,
                track,
                equipment,
                subevent_id: subEventId,
                quota_id: quota_id
            })
            .eq("id", id)
        console.log("Response: ", response)

        res.status(201).json("Event Updated")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err })
    }
}
