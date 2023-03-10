import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userName, email, semaphoreId, code } = req.body
        const response = await supabase.from("users").insert({
            userName: userName,
            email: email,
            code: code,
            semaphoreId: semaphoreId
        })

        res.status(201).json("user created")
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
