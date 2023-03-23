import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if we have a session
  const supabase = createServerSupabaseClient({ req, res })
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
    const { userName, email, semaphoreId, id } = req.body;

    const response = await supabase
      .from("users")
      .update({
        userName,
        email,
        semaphoreId,
      })
      .eq("id", id);

    res.revalidate("/myprofile");
    res.status(200).send(response.data);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
