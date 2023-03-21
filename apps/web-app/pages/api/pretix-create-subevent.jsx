// pages/api/create-event.js
import axios from "axios"

export default async function handler(req, res) {
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }
    const { name, startDate, endDate } = req.body

    const body = {
        name: { en: `${name}` },
        active: true,
        is_public: true,
        date_from: `${startDate}`,
        date_to: `${endDate}`,
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
                item: 318781,
                disabled: false,
                available_from: null,
                available_until: null,
                price: "0.00"
            }
        ],
        variation_price_overrides: [],
        meta_data: {}
    }
    try {
      const response = await axios.post(
        `https://pretix.eu/api/v1/organizers/taz-zuzalu/events/event-series/subevents/`,
        body,
        { headers }
    )

        console.log("Pretix api response: ", response)
        if (response.status == 201) {
            res.status(200).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.error}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
