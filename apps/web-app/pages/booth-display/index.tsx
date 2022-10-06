import faunadb from "faunadb"

import BoothContent from "../../components/TazBooth/BoothContent"
import BoothFooter from "../../components/TazBooth/BoothFooter"

export interface Canvas {
    canvasId: number
    tiles: string[]
}

const BoothDisplay = ({ canvases }: { canvases: { canvasId: number; tiles: string[] }[] }) => (
    <div className="flex flex-col h-screen bg-brand-black">
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
    
    let canvases = null;

    const fetchCanvases = async () => {
        const dbs = await client.query(
            query.Map(
                query.Paginate(query.Match(query.Index("all_active_canvases")), {
                    size: 10000
                }),
                query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                )
            )
            canvases = dbs.data[0].data.canvases
            console.log(canvases);
        }

    try {
        client.stream.document(query.Ref(query.Collection("ActiveCanvases"), '344764218231226955'))
        .on('start', start => {
            console.log('start', start);
            fetchCanvases()
        }).on('version', version => {
            console.log('version', version)
          fetchCanvases()
        })
        .start()


        // TODO Finish up types for returun data and component
        return {
            props: { canvases },
            // will reload data every 3 secons
            // revalidate: 3
        }
    } catch (err) {
        return { props: { err: "Error" } }
    }
}
