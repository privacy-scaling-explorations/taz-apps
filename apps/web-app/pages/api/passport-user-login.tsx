import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

interface Identity {
    uuid: string
    commitment: string
    email: string
    name: string
    role: string
    residence: string
    order_id: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("request body", req.body)
    const supabase = createServerSupabaseClient({ req, res })
    const signInWithSemaphoreProof = async (identity: Identity) => {
        // Validate Proof of user before interacting with DB
        const { uuid, commitment, email, name, role, residence, order_id } = identity
        const password: any = process.env.SINGLE_KEY_LOGIN

        try {
            // Try to log the user in
            const signIn = await supabase.auth.signInWithPassword({
                email,
                password
            })

            // If sign in was successful, we're done
            if (signIn.data?.user) {
                res.status(200).json("User signed in!")
                return
            }

            // If use sign in was not successful, we need to create the user and then sign them in
            if (signIn.error) {
                console.log("Sign in error received (this is expected if first time signing in): ", signIn.error)
                const signUpResponse = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            uuid,
                            commitment,
                            email,
                            name,
                            role,
                            residence,
                            order_id
                        }
                    }
                })

                console.log("sign up", signUpResponse)

                if (signUpResponse.data?.user) {
                    // Now that the user has been signed in signed in, we need to make sure that the user's
                    // profile in the public DB is exists and is updated with the latest passport uuid.

                    // Check to see if user already exists in public DB
                    const publicUserResponse = await supabase.from("users").select("id").eq("email", email)

                    // If user profile exists, do an update of the uui_auth field
                    if ((publicUserResponse.data?.length || 0) > 0) {
                        const updatePublicUser = await supabase
                            .from("users")
                            .update({ uui_auth: signUpResponse.data.user.id })
                            .eq("email", email)
                        console.log("Updated existing user", updatePublicUser)
                    }
                    // Otherwise, add the user profile
                    else {
                        const addPublicUser = await supabase
                            .from("users")
                            .insert({ userName: name, email, uui_auth: signUpResponse.data.user.id })
                        console.log("Added new user", addPublicUser)
                    }

                    res.status(200).json("User signed up!")
                } else {
                    res.status(400).json("Error with sign up")
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json("Server error")
        }
    }

    if (req.body) {
        signInWithSemaphoreProof(req.body)
    } else {
        res.status(400).json("Request body is empty.")
    }
}
