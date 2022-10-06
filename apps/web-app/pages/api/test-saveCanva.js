import faunadb from 'faunadb';

const secret = process.env.FAUNA_SECRET_KEY
const q = faunadb.query;
const client = new faunadb.Client({secret})

export default async function handler(req,res) {
    try{
        const dbs = await client.query(
            q.Get(
                q.Match(
                  q.Index("get_code"),
                  "0x2d5a39d28427281d4f99f93defdd4e7fe406039d155e818b27aafd98da21ce6b"
                )
              )
        )
        res.status(200).json(dbs.data)
    } catch(error){
        console.log(error)
        res.status(500).json({error: error.message})
    }


    try {
        const dbs = await client.query(
            q.Create(
                q.Collection("canvaId"),{
                    data : {
                        canvaId: 1,
                        canvaData: 3
                    }
                }
            )
        )

        res.status(200).json(dbs.data)
    } catch(error){
        res.status(500).json({error})
    }

}