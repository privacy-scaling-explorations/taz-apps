// pages/api/create-order.js
import axios from "axios"

export default async function handler(req, res) {
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const { subEventId, slug, itemId } = req.body

    // Will need user email as input, hard-coded for now
    const body = {
        email: "falcorodenburg@gmail.com",
        locale: "en",
        sales_channel: "web",
        positions: [
            {
                positionid: 1,
                item: itemId,
                variation: null,
                price: "0",
                attendee_name_parts: {
                    full_name: "Falco"
                },
                attendee_email: "falcorodenburg@gmail.com",
                addon_to: null,
                subevent: subEventId
            }
        ],
        send_email: true
    }

    try {
        const response = await axios.post(
            `https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/${slug}/orders/`,
            body,
            { headers }
        )

        console.log(response)
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
