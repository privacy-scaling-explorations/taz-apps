import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// eslint-disable-next-line import/prefer-default-export
export const getUserOnID = () => {
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    (async () => {
      const id = window.localStorage.getItem("id")
      const userData = await supabase.from('users').select("*").eq("id", id)
      if (!userData.error) {
        setUserObj(userData)
      }

    })()
  }, []);

  return userObj;
};
