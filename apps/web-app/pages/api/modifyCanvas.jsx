import faunadb from "faunadb"
import { verifyProof } from "@semaphore-protocol/proof"
import verificationKey from "../../static/semaphore.json"

export default async function handler(req, res) {
    // Make connection to the database
    const secret = process.env.FAUNA_SECRET_KEY
    const client = new faunadb.Client({ secret })
    const { query } = faunadb

    if (req.method === "GET") {
        // Query all 5 canvases from the database
        const dbs = await client.query(
            query.Map(
                query.Paginate(query.Match(query.Index("all_active_canvases")), {
                    size: 10000
                }),
                query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
            )
        )

        const document = dbs.data[0]

        // Randomly select 1 out of the 4 canvases
        const randomIndex = Math.floor(Math.random() * 4)

        const canvases = document.data.canvases
        const canvas = canvases[randomIndex]

        // If returned canvas is full, empty canvas first
        if (!canvas.tiles.includes("")) {
            canvases[randomIndex].tiles = ["", "", "", "", "", "", "", "", ""]

            await client.query(
                query.Update(query.Ref(document.ref), {
                    data: {
                        canvases: canvases
                    }
                })
            )
        }

        // Return the randomly selected canvas to the frontend.
        // The canvas that is returned to the frontend is an object with an array of strings (tiles) and a canvasId: {tiles: ["","","","","","","","",""], canvasId: 1}

        res.status(200).json({ canvas: canvas })
    } else if (req.method === "POST") {
        // To update the database the backend needs the canvasId and the updated tiles from the request body
        // For example: updatedTiles: ["newDrawingString","","","","","","","",""] canvasId: 1

        const { canvasId, updatedTiles, tileIndex, fullProof } = req.body

        const proofRes = await verifyProof(verificationKey, fullProof)
        const response = proofRes.toString()

        console.log("Is proof valid?", response)

        if (response === "true") {
            // Find the matching canvas based on the canvasId
            const dbs = await client.query(
                query.Map(
                    query.Paginate(query.Match(query.Index("all_active_canvases")), {
                        size: 10000
                    }),
                    query.Lambda("canvasRef", query.Get(query.Var("canvasRef")))
                )
            )

            const document = dbs.data[0]
            const canvases = document.data.canvases

            if (canvases[canvasId - 1].tiles[tileIndex] === "") {
                const newLocal = "Canvas successfully updated!"
                // Update the canvas in the database
                // eslint-disable-next-line no-unused-expressions
                canvases[canvasId - 1].tiles = updatedTiles

                await client
                    .query(
                        query.Update(query.Ref(document.ref), {
                            data: {
                                canvases: canvases
                            }
                        })
                        // eslint-disable-next-line no-sequences
                    )
                    .then((ret) => console.log(ret))
                // Send response back to frontend
                res.status(201).json(newLocal)
            } else {
                const newLocal = "Error: this tile has already been filled"
                const existingTile = canvases[canvasId - 1].tiles[tileIndex]
                res.status(403).json({ newLocal, existingTile })
            }
        } else {
            const newLocal = "Error: Proof is invalid"

            res.status(404).json({ newLocal })
        }
    }
}
