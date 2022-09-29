import faunadb from 'faunadb'

export default async function handler(req, res) {
  // Make connection to the database
  const secret = process.env.FAUNA_SECRET_KEY
  const client = new faunadb.Client({ secret })
  const { query } = faunadb

  if (req.method === 'GET') {
    // Query all 5 canvases from the database
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Match(query.Index('all_canvases')), {
          size: 10000
        }),
        query.Lambda('canvasRef', query.Get(query.Var('canvasRef')))
      )
    )

    const canvases = dbs.data

    // Randomly select 1 out of the 5 canvases
    const randomIndex = Math.round(Math.random() * 1) + 1
    // const randomIndex = 4

    const canvas = canvases[randomIndex]

    // If returned canvas is full, empty canvas first
    if (!canvas.data.tiles.includes('')) {
      canvas.data.tiles = ['', '', '', '', '', '', '', '', '']

      await client.query(
        query.Update(query.Ref(canvas.ref), {
          data: {
            tiles: canvas.data.tiles
          }
        })
      )
    }

    // Return the randomly selected canvas to the frontend.
    // The canvas that is returned to the frontend is an object with an array of strings (tiles) and a canvasId: {tiles: ["","","","","","","","",""], canvasId: 1}

    res.status(200).json({ canvas: canvas.data })
  } else if (req.method === 'POST') {
    // To update the database the backend needs the canvasId and the updated tiles from the request body
    // For example: updatedTiles: ["newDrawingString","","","","","","","",""] canvasId: 1

    const { canvasId, updatedTiles, tileIndex } = req.body

    // Query all 5 canvases from the database
    const dbs = await client.query(
      query.Map(
        query.Paginate(query.Match(query.Index('all_canvases')), {
          size: 10000
        }),
        query.Lambda('canvasRef', query.Get(query.Var('canvasRef')))
      )
    )

    // Find the matching canvas based on the canvasId
    const match = dbs.data.filter((canvas) => canvas.data.canvasId === canvasId)[0]
    console.log(match.data.tiles[tileIndex])

    if (match.data.tiles[tileIndex] === '') {
      const newLocal = 'Canvas successfully updated!'
      // Update the canvas in the database
      // eslint-disable-next-line no-unused-expressions
      await client
        .query(
          query.Update(query.Ref(match.ref), {
            data: {
              tiles: updatedTiles
            }
          })
          // eslint-disable-next-line no-sequences
        )
        .then((ret) => console.log(ret))
      // Send response back to frontend
      res.status(201).json(newLocal)
    } else {
      const newLocal = 'Error: this tile has already been filled'
      const existingTile = match.data.tiles[tileIndex]
      res.status(403).json({ newLocal, existingTile })
    }
  }
}
