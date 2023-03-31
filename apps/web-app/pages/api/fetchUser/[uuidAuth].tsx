import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Create authenticated Supabase Client

    const supabase = createServerSupabaseClient({ req, res })
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
        return res.status(401).json({
            error: "not_authenticated",
            description: "The user does not have an active session or is not authenticated"
        })
    }

    try {
        const response = await supabase.from("users").select("*").eq("uui_auth", req.query.uuidAuth).single()

        res.status(200).send(response.data)
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err })
    }
}
