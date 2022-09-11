import api from '../../lib/api'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout';
import { useRouter } from 'next/router'


// Will get from API at serverside
export async function getServerSideProps(context) {

  try {
    const res = await fetch(api.telegram + "/" + context.query.id)
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

export default function Telegram({ data }) {
   
  if (data.notFound) {
    return <div>Failed to load</div>
  }
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <code>Telegram ID = {data.id}</code>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </Layout>
  )
}
