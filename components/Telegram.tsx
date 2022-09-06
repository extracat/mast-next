import Link from 'next/link'
import { Telegram } from '../interfaces'

type TelegramProps = {
  telegram: Telegram
}

export default function TelegramComponent({ telegram }: TelegramProps) {
  return (
      <Link href="/telegram/[id]" as={`/telegram/${telegram.id}`}>
        <a>{telegram.title}</a>
      </Link>
  )
}
