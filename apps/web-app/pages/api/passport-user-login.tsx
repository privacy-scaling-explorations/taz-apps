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
      // Check if email is registered
      const { data: users } = await supabase.from("auth.users").select("email").eq("email", email);

      // if (users && users.length > 0) {
        // If registered, try sign in
        console.log("signing in data", email, password)
        const signIn = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signIn.data.user) {
          res.status(200).json("User signed in!");
        } else {
          res.status(400).json("Error with sign in");
        }
      // } else {
      //   // If not registered, try sign up
      //   console.log("signing up data", email, password, uuid, commitment, email, name, role, residence, order_id)
      //   const signUpResponse = await supabase.auth.signUp({
      //     email,
      //     password,
      //     options: {
      //       data: {
      //         uuid,
      //         commitment,
      //         email,
      //         name,
      //         role,
      //         residence,
      //         order_id,
      //       },
      //     },
      //   });

      //   if (signUpResponse.data.user) {
      //     res.status(200).json("User signed up!");
      //   } else {
      //     res.status(400).json("Error with sign up");
      //   }
      // }
    } catch (error) {
      console.log(error);
      res.status(500).json("Error occurred");
    }
  };

  signInWithSemaphoreProof(req.body);
}
