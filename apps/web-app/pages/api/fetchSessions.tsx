import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const userId = req.query.userId === undefined ? 0 : (req.query.userId as unknown as number)

        const response = await supabase
            .from("sessions")
            .select("*, participants (*), favorited_sessions (*)")
            .eq("participants.user_id", userId)
            .eq("favorited_sessions.user_id", userId)
        if (response.error === null) res.status(200).send(response.data)
        else res.status(response.status).send(response.error)
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
