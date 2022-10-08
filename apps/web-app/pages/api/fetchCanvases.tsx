import faunadb from "faunadb"

const secret = process.env.FAUNA_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })
const { query } = faunadb

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const dbs = await client.query(
                query.Map(
                    query.Paginate(query.Match(query.Index("all_minted_canvases")), {
                        size: 10000
                    }),
                    query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                )
            )

            const canvases = dbs.data.map((canvas) => canvas.data)
            res.status(200).json(canvases)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "GET ERROR" })
        }
    } else {
        res.status(500).json({ error: "Needs to be a GET method" })
    }
}
