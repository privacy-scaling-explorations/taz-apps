// pages/api/create-event.js
import axios from "axios"

export default async function handler(req, res) {
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }
    const { name, startDate, slug, itemId } = req.body
    console.log("Create subevent triggered", req.body)

    const body = {
        name: { en: `${name}` },
        active: false,
        is_public: true,
        date_from: `${startDate}`,
        date_to: null,
        date_admission: null,
        presale_start: null,
        presale_end: null,
        location: null,
        geo_lat: null,
        geo_lon: null,
        seating_plan: null,
        seat_category_mapping: {},
        item_price_overrides: [
            {
                item: parseInt(itemId),
                disabled: false,
                available_from: null,
                available_until: null
            }
        ],
        variation_price_overrides: [],
        meta_data: {}
    }
    try {
        const response = await axios.post(
            `https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/${slug}/subevents/`,
            body,
            { headers }
        )

        console.log(response)

        console.log("Pretix api response: ", response.request.data)
        if (response.status === 201) {
            res.status(200).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.error}`)
        }
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: error })
    }
}
