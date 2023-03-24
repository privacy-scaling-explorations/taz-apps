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
      slug,
      publicUrl,
    } = req.body;

    // const eventData = {
    //   "name": {"en": name},
    //   "active": false,
    //   "is_public": true,
    //   "date_from": startDate,
    //   "date_to": endDate,
    //   "date_admission": null,
    //   "presale_start": null,
    //   "presale_end": null,
    //   "location": null,
    //   "geo_lat": null,
    //   "geo_lon": null,
    //   "seating_plan": null,
    //   "seat_category_mapping": {},
    //   "variation_price_overrides": [],
    //   "meta_data": {}
    // };

    // const domain = "http://localhost:3000";
    // const apiUrl = '/api/pretix-create-subevent';
    // const responsePretix = await fetch(domain + apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(eventData)
    // });

    // console.log("response pretix", responsePretix)

    await supabase.from("events").insert({
      name,
      startDate,
      endDate,
      location,
      startTime,
      endTime,
      organizers,
      tags,
      slug,
      publicUrl,
      info,
    });
    // console.log("Response: ", response)

    res.status(201).json("Event created");
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
