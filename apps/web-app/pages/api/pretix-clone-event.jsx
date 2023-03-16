// pages/api/create-event.js
import axios from "axios"

export default async function handler(req, res) {
    console.log("Clone event triggered")
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }
    console.log("body data: ", req.body)
    const body = req.body

    try {
        const response = await axios.post("https://pretix.eu/api/v1/organizers/taz-zuzalu/events/zuzalu-3/clone/", body, {
            headers: headers
        })
        console.log("RESPONSE: ", response)

        if (response.status = 200) {
            // const data = await response.json()
            res.status(201).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log("Error: ", error.response)
        res.status(500).json({ message: "Internal server error" })
    }
}
