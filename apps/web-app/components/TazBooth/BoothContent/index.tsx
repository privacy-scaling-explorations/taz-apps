import React, { useEffect, useState } from "react"
// import faunadb, { Ref, Collection } from "faunadb"

// import BoothArtboardCard from "../BoothArtboardCard"

// import { Canvas, FanaCanvasResponse } from "../../../pages/booth-display"

// export type FaunadbStreamVersionEvent = {
//     action: "create" | "update" | "delete"
//     document: FanaCanvasResponse
//     diff: FanaCanvasResponse
//     prev: FanaCanvasResponse
// }

const BoothContent = (initialCanvases: any) => (
    // const [canvases, setCanvases] = useState(initialCanvases)
    // //! SECRET NEEDS TO BE REMOVED
    // const secret = "fnAEvFcKVTACS4C4wTx9Onll1EfhX8dE9mc5xvzk"
    // const client = new faunadb.Client({ secret })
    // const q = faunadb.query

    // function getActiveCanvases() {
    //     return client.stream
    //         .document(q.Ref(q.Collection("ActiveCanvases"), "344764218231226955"))
    //         .on("start", async (start) => {
    //             const dbs: FanaCanvasResponse = await client.query<FanaCanvasResponse>(
    //                 q.Get(Ref(Collection("ActiveCanvases"), "344764218231226955"))
    //             )
    //             if (canvases !== dbs.data.canvases) {
    //                 setCanvases(dbs.data.canvases)
    //             }
    //         })
    //         .on("version", (version) => {
    //             // Had to resort to type casting
    //             const updatedVersion = version as FaunadbStreamVersionEvent
    //             setCanvases(updatedVersion.document.data.canvases)
    //         })
    // }

    // useEffect(() => {
    //     getActiveCanvases().start()
    //     return function cleanUp() {
    //         getActiveCanvases().close()
    //     }
    // }, [])

    <div className="grow flex justify-between items-center px-14 bg-brand-beige">
        BoothContent
        {/* {Array.isArray(canvases) &&
                canvases.map((canvas) => <BoothArtboardCard key={canvas.canvasId} canvas={canvas} />)} */}
    </div>
)

export default BoothContent
