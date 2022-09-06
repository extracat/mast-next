import clientPromise from '../../../lib/mongodb'
import { NextApiResponse, NextApiRequest } from 'next'
import { Telegram } from '../../../interfaces'

async function getAsyncFormDB() {
  try {
  
    const client = await clientPromise;
    const collection = client.db('test').collection('telegrams');
    const alldata = await collection.find({}).toArray();
    return alldata;

  } catch (e) {
    console.error(e)
    return e;
  }
}


export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Telegram[]>
) {
  const alldata = await getAsyncFormDB();
  return res.status(200).json(alldata)
}
