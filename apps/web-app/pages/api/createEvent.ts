import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, startDate, endDate, location, time, organizer, tags } = req.body
        console.log(req.body)
        const response = await supabase
            .from("events")
            .insert({
                name: name,
                startDate: startDate,
                endDate: endDate,
                location: location,
                time: time,
                organizer: organizer,
                tags: tags
            })
        console.log("Response: ", response)

        res.status(201).json("Event created")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
