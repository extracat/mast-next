import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout';
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default function Telegram() {
    const { query } = useRouter()
    const { data, error } = useSWR(
        () => query.id && `/api/telegram/${query.id}`,
        fetcher
    )

    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>

    return (
        <Layout>
            <code>Telegram ID = {data.id}</code>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
        </Layout>
    )
}
