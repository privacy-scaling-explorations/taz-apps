import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
// import fetch from "node-fetch"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            eventId,
            hasTicket,
            type,
            format,
            equipment,
            team_members,
            track,
            subEventId,
            event_slug,
            event_item_id
        } = req.body

        console.log("event_id", eventId)

        const response = await supabase.from("sessions").insert({
            name,
            startDate,
            endDate,
            location,
            startTime,
            endTime,
            tags,
            info,
            event_id: eventId,
            hasTicket,
            event_type: type,
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
