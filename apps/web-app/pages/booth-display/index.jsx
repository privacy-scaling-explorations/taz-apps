import faunadb from "faunadb"

import BoothContent from "../../components/TazBooth/BoothContent"
import TazBoothFooter from "../../components/TazBooth/TazBoothFooter"

const BoothDisplay = ({ canvases }) => {
    console.log("canvases", canvases)
    return (
        <div className="flex flex-col h-screen bg-brand-black p-10">
            <BoothContent canvases={canvases} />
            <TazBoothFooter />
        </div>
    )
}

export default BoothDisplay

export async function getStaticProps() {
    // Server Side code that will never reach client
    const secret = process.env.FAUNA_SECRET_KEY
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

        const canvases = dbs.data.map((canvas) => canvas.data)
        return {
            props: { canvases },
            revalidate: 3
        }
    } catch (err) {
        return { props: { err: "Error" } }
    }
}
