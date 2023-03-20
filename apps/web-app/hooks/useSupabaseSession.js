import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// eslint-disable-next-line import/prefer-default-export
export const useSession = () => {
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      setSessionToken(session);
      console.log(sessionToken);
      const { data: authListener } = supabase.auth.onAuthStateChange(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (event, session) => {
          setSessionToken(session);
        }
      );

      return () => {
        authListener.unsubscribe();
      };
    })()
  }, []);

  return sessionToken;
};
