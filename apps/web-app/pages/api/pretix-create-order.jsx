// pages/api/create-order.js
import axios from "axios"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req, res) {

  const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("delete sesion 2", session)
    if (!session)
      return res.status(401).json({
        error: "not_authenticated",
        description:
          "The user does not have an active session or is not authenticated",
      });

      console.log(session.user.email, session.user.user_metadata.name)

    const { subEventId, slug, itemId, name, id } = req.body

    const user = await supabase.from("users").select().eq("uui_auth", session.user.id).single()

    // Will need user email as input, hard-coded for now
    const body = {
        email: `${session.user.email}`,
        locale: "en",
        sales_channel: "web",
        positions: [
            {
                positionid: 1,
                item: itemId,
                variation: null,
                price: "0",
                attendee_name_parts: {
                    full_name: `${session.user.user_metadata.name}`
                },
                attendee_email: `${session.user.email}`,
                addon_to: null,
                subevent: subEventId
            }
        ],
        send_email: true
    }
    console.log("slug", slug)
    try {
        const response = await axios.post(
            `https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/${slug}/orders/`,
            body,
            { headers }
        )

        console.log(response)
        const inputToSupabase = await supabase.from("tickets").insert({email: session.user.email, pdf_link: response.data.downloads[0].url, name: name, session_id: id, user_id: user.data.id})

        console.log(inputToSupabase)
        if (response.status == 201) {
            res.status(201).json("Ticket bought!")
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
