import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Go Live Triggered", req.query.slug)
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const body = {
        live: true
    }

    try {
        const response = await axios.patch(
            `https://pretix.eu/api/v1/organizers/taz-zuzalu/events/${req.query.slug}/`,
            body,
            { headers }
        )

        if (response.status === 200) {
            res.status(200).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
