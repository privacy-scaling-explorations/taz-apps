import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function getUserSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  (async function sbUserSession() {
    const currentSession = await supabase.auth.getSession();
    console.log("current session", currentSession);
    setSession(currentSession);

  })()

  return session
}
