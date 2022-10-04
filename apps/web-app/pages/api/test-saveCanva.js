import faunadb from 'faunadb';

const secret = process.env.FAUNA_SECRET_KEY
const q = faunadb.query;
const client = new faunadb.Client({secret})

export default async function handler(req,res) {
    try{
        const dbs = await client.query(
            q.Map(q.Paginate(q.Match(q.Index('all_customers'))),(ref = q.Get(ref)))
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