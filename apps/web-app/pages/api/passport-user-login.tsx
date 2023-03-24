import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
import { useSemaphorePassportProof } from "@pcd/passport-interface"
import { sha256 } from "js-sha256"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("request body", req.body)
    const supabase = createServerSupabaseClient({ req, res })
    const signInWithSemaphoreProof = async (identity: any) => {
        // IMPORTANT!!!! User Email must be changed
        // Validate Proof of user before interacting with DB
        const { uuid, commitment, email, name, role, residence, order_id } = identity
        const password: any = process.env.SINGLE_KEY_LOGIN
        try {
            const signIn = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (signIn.data.user) {
                res.status(200).json("User signed in!")
            }
            if (signIn.error) {
                res.status(400).json(`Error with sign in: ${signIn.error.message}`)

                // const signUpResponse = await supabase.auth.signUp({
                //     email,
                //     password,
                //     options: {
                //         data: {
                //             uuid,
                //             commitment,
                //             email,
                //             name,
                //             role,
                //             residence,
                //             order_id
                //         }
                //     }
                // })

                // console.log("sign up", signUpResponse)
                // if (signUpResponse.data.user) {
                //     res.status(200).json("User signed up!")
                // } else {
                //     res.status(400).json("Error with sign up")
                // }
            }
        } catch (error) {
            // console.log(error)
            res.status(500).json(`General error: ${error}`)
        }
    }
    signInWithSemaphoreProof(req.body)
}
