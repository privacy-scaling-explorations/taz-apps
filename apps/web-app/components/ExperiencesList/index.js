/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ExperiencesListComponent from "./View";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ExperiencesList = () => {
  const [identityUrl, setIdentityUrl] = useState("");
  const [signInModal, setSignInModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const router = useRouter();

  async function checkSession() {
    const user = await supabase.auth.getSession();
    console.log("user", user);
    user.data.session ? setUserLoggedIn(user.data) : setUserLoggedIn(null);
  }

  async function userSignOut() {
    await supabase.auth.signOut();
    setUserLoggedIn(null);
  }

  function initiateSignInModal() {
    setSignInModal(true);
  }

  function closeSignInModal() {
    setSignInModal(false);
  }

  const clearIdentity = () => {
    console.log("clear");
    window.localStorage.removeItem("identity");
    router.push("/");
  };

  useEffect(() => {
    const identity = window.localStorage.getItem("identity");
    checkSession();
    if (identity?.length > 3) {
      const identityUrlTemp = identity
        .replace('["', "")
        .replace('"]', "")
        .replace('","', "_");
      setIdentityUrl(identityUrlTemp);
      console.log("identity", identity);
      console.log("urlIdentity", identityUrlTemp);
    }
  }, []);
  return (
    <ExperiencesListComponent
      clearIdentity={clearIdentity}
      urlIdentity={identityUrl}
      initiateSignInModal={initiateSignInModal}
      signInModal={signInModal}
      closeSignInModal={closeSignInModal}
      userLoggedIn={userLoggedIn}
      userSignOut={userSignOut}
      checkSession={checkSession}
    />
  );
};

export default ExperiencesList;
