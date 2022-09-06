import clientPromise from '../../../lib/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Telegram } from '../../../interfaces'

type ResponseError = {
  message: string
}


async function getAsyncFormDB(id) {
  try {
  
    const client = await clientPromise;
    const collection = client.db('test').collection('telegrams');
    const alldata = await collection.find({ id: Number(id) }).toArray();
    return alldata;

  } catch (e) {
    console.error(e)
    return e;
  }
}


export default async function telegramHandler(
  req: NextApiRequest,
  res: NextApiResponse<Telegram | ResponseError>
) {
  const { query } = req
  const { id } = query
  const alldata = await getAsyncFormDB(id)

  // Telegram with id exists
  return alldata.length > 0
    ? res.status(200).json(alldata[0])
    : res.status(404).json({ message: `Telegram with id: ${id} not found.` })
}
