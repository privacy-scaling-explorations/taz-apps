import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, startDate, endDate, organizers, location, startTime, endTime, tags, info, id } = req.body

        const response = await supabase
            .from("events")
            .update({
                name,
                startDate,
                endDate,
                organizers,
                location,
                startTime,
                endTime,
                tags,
                info
            })
            .eq("id", id)

        res.status(200).send(response.data)
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
