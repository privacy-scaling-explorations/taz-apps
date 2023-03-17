import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("get items triggered")
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch(`https://pretix.eu/api/v1/organizers/taz-zuzalu/events/${req.query.slug}/items/`, {
            method: "GET",
            headers
        })

        console.log("get items: ", response)

        if (response.status === 200) {
            const data = await response.json()
            res.status(200).json(data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
