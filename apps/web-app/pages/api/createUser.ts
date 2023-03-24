import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  try {
    const { userName, email, semaphoreId, code } = req.body;
    await supabase.from("users").insert({
      userName,
      email,
      code,
      semaphoreId,
    });

    res.status(201).json("user created");
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err });
  }
}
