import clientPromise from '../../../lib/mongodb'
import { NextApiResponse, NextApiRequest } from 'next'
import { Telegram } from '../../../interfaces'

const db = { db: 'test', collection: 'telegrams' }

async function getAllDocsFormDB(_db) {
  try {
    const client = await clientPromise;
    const collection = client.db(_db.db).collection(_db.collection);

    const alldata = await collection.find({}).sort( { $natural: -1 } ).toArray();
    return alldata;

  } catch (e) {
    console.error(e)
    return e;
  }
}

async function getLastIdFormDB(_db) {
  try {
    const client = await clientPromise;
    const collection = client.db(_db.db).collection(_db.collection);

    const lastDoc = await collection.find({}).sort( { id: -1 } ).limit(1).toArray();

    return lastDoc[0].id;


  } catch (e) {
    console.error(e)
    return e;
  }
}

async function addDocToDB(_db, title, body) {
  try {
    const client = await clientPromise;
    const collection = client.db(_db.db).collection(_db.collection);


    const id = await getLastIdFormDB(_db) + 1;

    const telegram: Telegram = { 
      id: id, 
      title: title, 
      body: body 
    };

    console.log(telegram)

    const res = await collection.insertOne(telegram);

    //console.log(res)

    return res;

  } catch (e) {
    console.error(e)
    return e;
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Telegram[] | ResponseError>
) {

  if (req.method === 'POST') {

    const data = req.body
      // Both of these are required.
    if (!data.title || !data.body) {
      return res.status(400).json({ message: `Error: no required data` })
    }

    const result = await addDocToDB(db, data.title, data.body);

    return res.status(201).json({ message: `Success` })

  } else {
    const alldata = await getAllDocsFormDB(db);

    return res.status(200).json(alldata)
  }


}
