import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
// import fetch from "node-fetch"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
            track
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
                equipment
            })
            .eq("id", id)
        console.log("Response: ", response)

        res.status(201).json("Event Updated")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
