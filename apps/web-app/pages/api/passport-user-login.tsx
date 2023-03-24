import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { useSemaphorePassportProof } from "@pcd/passport-interface";
import { sha256 } from "js-sha256";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("request body", req.body);
  const supabase = createServerSupabaseClient({ req, res })
  const signInWithSemaphoreProof = async (identity: any) => {
    // IMPORTANT!!!! User Email must be changed
    // Validate Proof of user before interacting with DB
    console.log("Login identity", identity)
    const {
      uuid,
      commitment,
      email,
      name,
      role,
      residence,
      order_id,
    } = identity;

    console.log("Login email", email)
    const password: any = process.env.SINGLE_KEY_LOGIN;
    console.log("Login password", password)
    try {
      const signIn = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signIn.data.user) {
        res.status(200).json("User signed in!");
      }

      if (signIn.error) {
        console.log("Sign in error", signIn.error)
        console.log("sign up error Email and Password", email, password)
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
              order_id,
            },
          },
        });

        console.log("sign up", signUpResponse)
        if (signUpResponse.data.user) {
          res.status(200).json("User signed up!");
        } else {
          res.status(400).json("Error with sign up");
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  signInWithSemaphoreProof(req.body);
}
