import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Update Quota Triggered", req.body)
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const { ticketAmount, slug, quotaId } = req.body

    const body = {
        size: `${ticketAmount}`
    }

    try {
        const response = await axios.patch(
            `https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/${slug}/quotas/${quotaId}/`,
            body,
            { headers }
        )

        console.log("quota response: ", response)

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
