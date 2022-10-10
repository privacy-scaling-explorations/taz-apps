import faunadb from "faunadb"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const secret = process.env.FAUNA_SECRET_KEY
            const client = new faunadb.Client({ secret })
            const { query } = faunadb

            const dbs = await client.query(
                query.Map(
                    query.Paginate(query.Match(query.Index("all_canvases")), {
                        size: 10000
                    }),
                    query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                )
            )

            const canvases = dbs.data.map((canvas) => canvas.data)

            res.status(200).json({ canvases })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(405).json({ error: "please send GET request" })
    }
}
