import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { useSemaphorePassportProof } from "@pcd/passport-interface";
import { sha256 } from "js-sha256";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey as string, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("request body", req.body);
  const signInWithSemaphoreProof = async (proof: any) => {
    // IMPORTANT!!!! User Email must be changed
    // Validate Proof of user before interacting with DB
    const email = "anothertest3@test.com";
    const password = "123456";
    try {
      const findUser = await supabase
        .from("users")
        .select("id")
        .eq("email", email);

      if (findUser!.data!.length !== 0) {
        const signIn = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        console.log("Signed in:", signIn);
        res.status(200).json(findUser);
      }

      if (findUser!.data!.length === 0) {
        const createUser = await supabase.from("users").insert({
          email,
          userName: "Test name",
          password,
          uuid: 123,
        });

        const signUpResponse = await supabase.auth.signUp({
          email,
          password,
        });

        const findUserAfterCreate = await supabase
        .from("users")
        .select("id")
        .eq("email", email);


        console.log(createUser);
        res.status(200).json(findUserAfterCreate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  signInWithSemaphoreProof(req.body);
}
