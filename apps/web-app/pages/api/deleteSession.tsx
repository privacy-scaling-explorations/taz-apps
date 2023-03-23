import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
// import fetch from "node-fetch"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body

        const response = await supabase.from("sessions").delete().match({ id: id })

        console.log("Response: ", response)

        res.status(201).json("Event created")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
