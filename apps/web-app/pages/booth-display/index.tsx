import faunadb from "faunadb"
import { useEffect, useState } from "react"

import BoothContent from "../../components/TazBooth/BoothContent"
import BoothFooter from "../../components/TazBooth/BoothFooter"

export interface Canvas {
    canvasId: number
    tiles: string[]
}

const BoothDisplay = () => {
    const [canvases, setCanvases] = useState([])
    const secret = "fnAEvFcKVTACS4C4wTx9Onll1EfhX8dE9mc5xvzk"
    const client = new faunadb.Client({ secret })
    console.log("secret", secret, client)
    const { query } = faunadb

    async function getActiveCanvases() {
        client.stream
            .document(query.Ref(query.Collection("ActiveCanvases"), "344764218231226955"))
            .on("start", async (start) => {
                console.log("start", start)

                const dbs = await client.query<any>(
                    query.Map(
                        query.Paginate(query.Match(query.Index("all_active_canvases"))),
                        query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                    )
                )
                console.log("Canvases in component", dbs.data[0].data.canvases)
                setCanvases(dbs.data[0].data.canvases)
            })
            .on("version", (version: any) => {
                console.log("version", version.document.data.canvases)
                setCanvases(version.document.data.canvases)
            })
            .start()
    }

    useEffect(() => {
        getActiveCanvases()
    }, [])

    return (
        <div className="flex flex-col h-screen bg-brand-black">
            <BoothContent canvases={canvases} />
            <BoothFooter />
        </div>
    )
}

export default BoothDisplay
