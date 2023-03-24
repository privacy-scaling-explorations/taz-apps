import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createServerSupabaseClient({ req, res })
    try {
        const response = await supabase
            .from("sessions")
            .select("*, participants (*), favoritedSessions:favorited_sessions (*)")
            .eq("id", req.query.sessionId)
            .eq("participants.user_id", req.query.userId)
            .eq("favorited_sessions.user_id", req.query.userId)
            .single()
        if (response.error === null) res.status(200).send(response.data)
        else res.status(response.status).send(response.error)
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err })
    }
}
