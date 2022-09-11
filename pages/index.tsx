import api from '../lib/api'
import Head from 'next/head'
import TelegramComponent from '../components/Telegram'
import Layout from '../components/layout';
import { Telegram } from '../interfaces'
import Link from 'next/link'


// Will get from API at serverside
export async function getServerSideProps(context) {

  try {
    const res = await fetch(api.telegram)
    const data = await res.json()

    return {
      props: { data }, // will be passed to the page component as props
    }

  } catch (e) {
      console.error("Error: Can't get data from API")
      return {
        notFound: true,
      };
  }

}


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index({ data }) {

  if (data.notFound) {
    return <div>Failed to load</div>
  }
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <p><Link href="/post">Post new telegram</Link></p>
      <h1>Telegrams list</h1>
      {data.map((p: Telegram) => (  
        <p key={p.id}>
          {p.id}: 
          <TelegramComponent key={p.id} telegram={p} />
        </p>
      ))}
    </Layout>
  )
}
