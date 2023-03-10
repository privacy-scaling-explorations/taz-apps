import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, startDate, endDate, location, startTime, endTime, organizers, tags, info } = req.body
        console.log(req.body)
        const response = await supabase
            .from("events")
            .insert({
                name: name,
                start_date: startDate,
                end_date: endDate,
                location: location,
                start_time: startTime,
                end_time: endTime,
                organizers: organizers,
                tags: tags,
                info: info
            })
        console.log("Response: ", response)

        res.status(201).json("Event created")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
