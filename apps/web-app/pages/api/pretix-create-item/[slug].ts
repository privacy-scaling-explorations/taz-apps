import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Create Item Triggered", req.query.slug, req.body)
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const { newTicket } = req.body

    const body = {
        id: 1,
        name: { en: `${req.query.slug} ticket` },
        internal_name: "",
        sales_channels: ["web"],
        default_price: `${newTicket.price}`,
        original_price: null,
        category: null,
        active: true,
        description: null,
        free_price: false,
        tax_rate: "0.00",
        tax_rule: null,
        admission: true,
        personalized: true,
        issue_giftcard: false,
        meta_data: {},
        position: 0,
        picture: null,
        available_from: null,
        available_until: null,
        hidden_if_available: null,
        require_voucher: false,
        hide_without_voucher: false,
        allow_cancel: true,
        generate_tickets: null,
        allow_waitinglist: true,
        show_quota_left: null,
        min_per_order: null,
        max_per_order: null,
        checkin_attention: false,
        require_approval: false,
        require_bundling: false,
        require_membership: false,
        require_membership_types: [],
        grant_membership_type: null,
        grant_membership_duration_like_event: true,
        grant_membership_duration_days: 0,
        grant_membership_duration_months: 0,
        validity_fixed_from: null,
        validity_fixed_until: null,
        validity_dynamic_duration_minutes: null,
        validity_dynamic_duration_hours: null,
        validity_dynamic_duration_days: null,
        validity_dynamic_duration_months: null,
        validity_dynamic_start_choice: false,
        validity_dynamic_start_choice_day_limit: null,
        variations: [
            {
                value: { en: `${newTicket.name}` },
                default_price: `${newTicket.price}`,
                price: `${newTicket.price}`,
                original_price: null,
                active: true,
                checkin_attention: false,
                require_approval: false,
                require_membership: false,
                require_membership_types: [],
                sales_channels: ["web"],
                available_from: null,
                available_until: null,
                hide_without_voucher: false,
                description: null,
                meta_data: {},
                position: 0
            }
        ],
        addons: [],
        bundles: []
    }

    try {
        const response = await axios.post(
            `https://pretix.eu/api/v1/organizers/taz-zuzalu/events/${req.query.slug}/items/`,
            body,
            { headers }
        )

        if (response.status === 201) {
            res.status(201).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
