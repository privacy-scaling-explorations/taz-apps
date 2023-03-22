import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
// import fetch from "node-fetch"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = createServerSupabaseClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session)
      return res.status(401).json({
        error: "not_authenticated",
        description:
          "The user does not have an active session or is not authenticated",
      });

    if (session) {
      const {
        name,
        startDate,
        endDate,
        location,
        startTime,
        endTime,
        organizers,
        tags,
        info,
        eventId,
        hasTicket,
        type,
        format,
        equipment,
        team_members,
        track,
        subEventId,
      } = req.body;

      console.log("event_id", eventId);

      await supabase.from("sessions").insert({
        name,
        startDate,
        endDate,
        location,
        startTime,
        endTime,
        organizers,
        tags,
        info,
        event_id: eventId,
        hasTicket,
        type,
        format,
        team_members,
        track,
        equipment,
        subevent_id: subEventId,
      });
      // console.log("Response: ", response)

      res.status(201).json("Event created");
    }
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err });
  }
}
