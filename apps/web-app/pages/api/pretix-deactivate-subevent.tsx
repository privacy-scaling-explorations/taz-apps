import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const { slug, subEventId } = req.body

    const body = {
        active: false
    }

    try {
        const response = await axios.patch(
            `https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/${slug}/subevents/${subEventId}/`,
            body,
            {
                headers
            }
        )
        console.log(response)

        if (response.status == 200) {
            res.status(200).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
