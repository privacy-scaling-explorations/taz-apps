import React from "react"
import faunadb, { Collection, Ref } from "faunadb"
import * as Fauna from "faunadb/src/types/values"

import BoothContent from "../../components/TazBooth/BoothContent"
import BoothFooter from "../../components/TazBooth/BoothFooter"

export type Canvas = {
    canvasId: number
    tiles: string[]
}

export type CanvasData = {
    [canvases: string]: Canvas[]
}

export type FanaCanvasResponse = Fauna.values.Document<CanvasData>

const BoothDisplay = (props: { canvases: Canvas[] }) => (
    <div className="flex flex-col h-screen bg-brand-black">
        <BoothContent initialCanvases={props.canvases} />
        <BoothFooter />
    </div>
)

export default BoothDisplay

export async function getServerSideProps() {
    // Server Side code that will never reach client
    const secret = process.env.FAUNA_SECRET_KEY
    if (typeof secret !== "string") {
        return { notFound: true }
    }
    const client = new faunadb.Client({ secret })
    const q = faunadb.query

    try {
        const dbs: FanaCanvasResponse = await client.query<FanaCanvasResponse>(
            q.Get(Ref(Collection("ActiveCanvases"), "344764218231226955"))
        )
        const { canvases } = dbs.data
        return {
            props: { canvases }
        }
    } catch (err) {
        return { Error: { err } }
    }
}
