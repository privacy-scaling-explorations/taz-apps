import faunadb from "faunadb"

import BoothContent from "../../components/TazBooth/BoothContent"
import BoothFooter from "../../components/TazBooth/BoothFooter"

export interface Canvas {
    canvasId: number
    tiles: string[]
}

const BoothDisplay = ({ canvases }: { canvases: { canvasId: number; tiles: string[] }[] }) => (
    <div className="flex flex-col h-screen bg-brand-black p-10">
        <BoothContent canvases={canvases} />
        <BoothFooter />
    </div>
)

export default BoothDisplay

export async function getStaticProps() {
    // Server Side code that will never reach client
    const secret = process.env.FAUNA_SECRET_KEY
    if (typeof secret !== "string") {
        return { notFound: true }
    }
    const client = new faunadb.Client({ secret })
    const { query } = faunadb

    try {
        const dbs = await client.query(
            query.Map(
                query.Paginate(query.Match(query.Index("all_canvases")), {
                    size: 10000
                }),
                query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
            )
        )
        // TODO Finish up types for returun data and component
        console.log("dbs", dbs)
        const canvases = dbs.data.map((canvas) => canvas.data)
        return {
            props: { canvases },
            // will reload data every 3 secons
            revalidate: 3
        }
    } catch (err) {
        return { props: { err: "Error" } }
    }
}
