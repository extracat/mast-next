import useSWR from 'swr'
import TelegramComponent from '../components/Telegram'
import { Telegram } from '../interfaces'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSWR('/api/telegram', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
     <div>
      <h1>Telegrams list</h1>
        {data.map((p: Telegram) => (  
          <p>
            {p.id}: 
            <TelegramComponent key={p.id} telegram={p} />
          </p>
        ))}
    </div>
  )
}
