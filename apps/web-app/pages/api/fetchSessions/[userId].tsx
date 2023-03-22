import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

// import { getToken } from "next-auth/jwt"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res })
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession()

    console.log("session: ", session)
    console.log("req.rawHeaders: ", req.rawHeaders)

    // console.log("req", req)

    // if (!session)
    //     return res.status(401).json({
    //         error: "not_authenticated",
    //         description: "The user does not have an active session or is not authenticated"
    //     })

    // Run queries
    try {
        const response = await supabase
            .from("sessions")
            .select("*, participants (*), favoritedSessions:favorited_sessions (*)")
            .eq("participants.user_id", req.query.userId)
            .eq("favoritedSessions.user_id", req.query.userId)
        if (response.error === null) res.status(200).send(response.data)
        else res.status(response.status).send(response.error)
    } catch (err: any) {
        console.log("error: ", err)
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}

const ProtectedRoute = async (req:any, res:any) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient({ req, res })
    // Check if we have a session
    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session)
        return res.status(401).json({
            error: "not_authenticated",
            description: "The user does not have an active session or is not authenticated"
        })

    // Run queries with RLS on the server
    const { data } = await supabase.from("test").select("*")
    res.json(data)
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
//     const token = await getToken({ req })
//     if (token) {
//         // Signed in
//         console.log("JSON Web Token", JSON.stringify(token, null, 2))

//         try {
//             const response = await supabase
//                 .from("sessions")
//                 .select("*, participants (*), favoritedSessions:favorited_sessions (*)")
//                 .eq("participants.user_id", req.query.userId)
//                 .eq("favoritedSessions.user_id", req.query.userId)
//             if (response.error === null) res.status(200).send(response.data)
//             else res.status(response.status).send(response.error)
//         } catch (err: any) {
//             console.log("error: ", err)
//             res.status(500).json({ statusCode: 500, message: err.message })
//         }
//     } else {
//         // Not Signed in
//         res.status(401)
//     }
//     res.end()
// }
