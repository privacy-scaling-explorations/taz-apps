import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  useSemaphorePassportProof
} from "@pcd/passport-interface";

const RedirectPage: React.FC = () => {
  const router = useRouter();

  const { semaphoreProof } = useSemaphorePassportProof("https://api.pcd-passport.com/semaphore/1");

  useEffect(() => {
    // Do any necessary processing here
    console.log(semaphoreProof);
    console.log("Redirecting to index...");
    // router.push("/");
  }, [semaphoreProof]);

  return (
    <div>
      <h1>Redirecting to index...</h1>
      <p>You will be redirected in 5 seconds.</p>
    </div>
  );
};

export default RedirectPage;
