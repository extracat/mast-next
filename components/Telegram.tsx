import Link from 'next/link'
import { Telegram } from '../interfaces'

type TelegramProps = {
  telegram: Telegram;
  key: string;
}

export default function TelegramComponent({ telegram }: TelegramProps) {
  return (
        <Link href="/telegram/[id]" as={`/telegram/${telegram._id}`}>
          <a>{telegram.title}</a>
        </Link>       
  )
}
