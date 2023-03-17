import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Create Voucher Triggered", req.query.slug, req.body)
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    console.log("Req body quota: ", req.body)
    const {voucher, quotaId} = req.body

    const body = {
        code: voucher.code,
        max_usages: voucher.amount,
        valid_until: null,
        block_quota: false,
        allow_ignore_quota: false,
        price_mode: "set",
        value: voucher.price,
        item: null,
        variation: null,
        quota: quotaId,
        tag: "testvoucher",
        comment: "",
        subevent: null
    }

    try {
        const response = await axios.post(
            `https://pretix.eu/api/v1/organizers/taz-zuzalu/events/${req.query.slug}/vouchers/`,
            body,
            { headers }
        )

        if (response.status === 201) {
            res.status(201).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error: any) {
        console.log(error.response)
        res.status(500).json({ message: "Internal server error" })
    }
}
