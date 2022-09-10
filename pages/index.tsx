import Head from 'next/head'
import useSWR from 'swr'
import TelegramComponent from '../components/Telegram'
import Layout from '../components/layout';
import { Telegram } from '../interfaces'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
    const { data, error } = useSWR('/api/telegram', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <Layout>
            <p><Link href="/post">Post new telegram</Link></p>
            <h1>Telegrams list</h1>
            {data.map((p) => (  
                <p>
                    {p.id}: 
                    <TelegramComponent key={p.key} telegram={p} />
                </p>
            ))}
        </Layout>
    )
}
