import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await supabase.from("formats").select("*")
        if (response.error === null) res.status(200).send(response.data)
        else res.status(response.status).send(response.error)
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
