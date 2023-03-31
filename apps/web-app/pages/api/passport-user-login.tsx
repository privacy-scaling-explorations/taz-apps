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
    const supabase = createServerSupabaseClient({ req, res })
    const signInWithSemaphoreProof = async (identity: Identity) => {
        // Validate Proof of user before interacting with DB
        const { uuid, commitment, email, name, role, residence, order_id } = identity
        const password: string = (process.env.SINGLE_KEY_LOGIN as string).trim()

        try {
            // Try to log the user in
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            // If sign in was successful, we're done
            if (data && data.user) {
                const {
                    data: updatePubUserData,
                    error: updatePubUserError,
                    status,
                    statusText
                } = await supabase.from("users").update({ uui_auth: data.user.id, role }).eq("email", email)

                if (updatePubUserError) {
                    res.status(400).json("Error with updating public user")
                }
                console.log("update pub", updatePubUserData)
                console.log("update pub status", status)
                console.log("update pub statusText", statusText)
                res.status(200).json("User signed in!")
            }

            // If use sign in was not successful, we need to create the user and then sign them in
            if (error) {
                console.log("Sign in error received (this is expected if first time signing in): ", error)
                const { data: signupData, error: signupError } = await supabase.auth.signUp({
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

                if (signupError) {
                    res.status(400).json("Error with sign up")
                }

                if (signupData && signupData.user) {
                    // Now that the user has been signed up signed in, we need to make sure that the user's
                    // profile in the public DB is exists and is updated with the latest passport uuid.

                    // Check to see if user already exists in public DB
                    const { data: publicUserData, error: publicUserError } = await supabase
                        .from("users")
                        .select("id")
                        .eq("email", email)
                        .single()

                    if (publicUserError) {
                        res.status(400).json("Error fetching public user")
                    }

                    // If user profile exists, do an update of the uui_auth field
                    if (publicUserData !== null) {
                        const updatePublicUser = await supabase
                            .from("users")
                            .update({ uui_auth: signupData.user.id, role })
                            .eq("email", email)
                        console.log("Updated existing user", updatePublicUser)
                    }
                    // Otherwise, add the user profile
                    else {
                        const { data: addUserData, error: addUserError } = await supabase.from("users").insert({
                            userName: name,
                            email,
                            uui_auth: signupData.user.id,
                            role
                        })

                        if (addUserError) {
                            res.status(400).json("Error fetching public user")
                        }

                        console.log("User don't exist on db and added user", addUserData)
                    }

                    res.status(200).json("User signed up!")
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
