import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

const supabase = createBrowserSupabaseClient()

export default function getUserSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function sbUserSession() {
    setLoading(true)
    const currentSession = await supabase.auth.getSession();
    console.log("current session", currentSession);
    setSession(currentSession);
    setLoading(false)
  }

  useEffect(() => {
    sbUserSession();
  }, []);

  if (loading === false) {
    return session
  }

}
