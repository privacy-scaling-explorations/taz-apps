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
    const { user_id, event_id } = req.body;
    await supabase.from("favorited_events").insert({
      user_id,
      event_id,
    });

    res.status(200).send("Event favorited");
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
