import faunadb from "faunadb"
import { ethers } from "ethers"

export default async function handler(req, res) {
    const { invitation } = req.body

    if (req.method === "GET") {
        res.status(400).json({
            error: "Ensure that you are sending a POST request to this endpoint"
        })
    } else if (!invitation) {
        res.status(400).json({ error: "Request needs to have an invitation string" })
    } else if (req.method === "POST") {
        try {
            const secret = process.env.FAUNA_SECRET_KEY
            const { query } = faunadb
            const client = new faunadb.Client({ secret })
            const hashedInv = ethers.utils.id(invitation)
            const stringHash = hashedInv.toString()

            const dbs = await client.query(
                query.Map(
                    query.Paginate(query.Match(query.Index("all_hashes")), {
                        size: 10000
                    }),
                    query.Lambda("codeRef", query.Get(query.Var("codeRef")))
                )
            )

            console.log("HashedINV", hashedInv)
            console.log("stringHash", stringHash)

            try {
                const dbs2 = await client.query(query.Get(query.Match(query.Index("get_code"), stringHash)))

                const isValid = !dbs2.data.isUsed

                console.log("dbs2", dbs2)
                console.log("dbs2 isUsed?", dbs2.data.isUsed)
                res.status(200).json({ isValid })
            } catch (e) {
                const isValid = false
                res.status(200).json({ isValid })
            }

            // console.log("DB length", dbs.data.length)
            // console.log(dbs.data)

            // const match = dbs.data.filter((code) => code.data.code === hashedInv)

            // let isValid
            // console.log("match:", match)

            // if (match[0] && !match[0].data.isUsed) {
            //     isValid = true
            // } else {
            //     isValid = false
            // }
            // console.log(isValid)

            // res.status(200).json({ isValid2 })
        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }
}
