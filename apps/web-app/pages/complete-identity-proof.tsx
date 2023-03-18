import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useSemaphorePassportProof
} from "@pcd/passport-interface";
import { sha256} from 'js-sha256';
import { createClient } from "@supabase/supabase-js"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

const RedirectPage: React.FC = () => {
  const router = useRouter();

  const { semaphoreProof } = useSemaphorePassportProof("https://api.pcd-passport.com/semaphore/1");

  const signInWithSemaphoreProof = async (proof: any) => {
    //
    // IMPORTANT!!!! User Email must be changed
    try {
      // Check if a user with the Semaphore proof as the email already exists
      const { data, error } = await supabase.auth.signUp({
        email: "test1@test.com",
        password: await sha256(JSON.stringify(proof)),
      });
      console.log(data, error)
      if (error) {
        const  signIn  = await supabase.auth.signInWithPassword({
          email: "test1@test.com",
          password: await sha256(JSON.stringify(proof)),
        });
        console.log("Signed in:", signIn);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Do any necessary processing here
    signInWithSemaphoreProof(semaphoreProof)
    console.log("Redirecting to index...");
    router.push("/");
  }, [semaphoreProof]);

  return (
    <div>
      <h1>Redirecting to index...</h1>
    </div>
  );
};

export default RedirectPage;
