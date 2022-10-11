import faunadb from "faunadb"

export default async function handler(req, res) {
    const { pwd } = req.body

    if (req.method === "POST") {
        try {
            if (pwd === process.env.REFRESH_PW) {
                const secret = process.env.FAUNA_SECRET_KEY
                const { query } = faunadb
                const client = new faunadb.Client({ secret })

                const dbs = await client.query(
                    query.Map(
                        query.Paginate(query.Match(query.Index("all_hashes")), {
                            size: 10000
                        }),
                        query.Lambda("codeRef", query.Get(query.Var("codeRef")))
                    )
                )

                const codes = dbs.data

                const promises = codes.map((code) =>
                    client.query(
                        query.Update(query.Ref(code.ref), {
                            data: {
                                isUsed: false
                            }
                        })
                ))

                Promise.all(promises)
                res.status(201).json("codes refreshed")
            } else {
                res.status(500).json("Wrong password")
            }

        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }
}
