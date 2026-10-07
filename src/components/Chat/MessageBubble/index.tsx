import type { Message, MessageStatus } from '@/types'
import sentIconUrl from '@/assets/icons/sent.svg'
import deliveredIconUrl from '@/assets/icons/delievered.svg'
import readIconUrl from '@/assets/icons/read.svg'
import {
  Bubble,
  BubbleMeta,
  BubbleRow,
  BubbleText,
  BubbleTime,
  StatusIcon,
} from './styles'

interface Props {
  message: Message
}

function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessageStatusIcon({ status }: { status: MessageStatus | undefined }) {
  if (!status || status === 'pending') {
    return <StatusIcon $type="pending" title="Отправляется">🕐</StatusIcon>
  }
  if (status === 'failed') {
    return <StatusIcon $type="failed" title="Ошибка отправки">✕</StatusIcon>
  }
  if (status === 'sent') {
    return (
      <StatusIcon $type="sent" title="Отправлено">
        <img src={sentIconUrl} alt="sent" width={14} height={14} />
      </StatusIcon>
    )
  }
  if (status === 'delivered') {
    return (
      <StatusIcon $type="delivered" title="Доставлено">
        <img src={deliveredIconUrl} alt="delivered" width={14} height={14} />
      </StatusIcon>
    )
  }
  return (
    <StatusIcon $type="read" title="Прочитано">
      <img src={readIconUrl} alt="read" width={14} height={14} />
    </StatusIcon>
  )
}

export default function MessageBubble({ message }: Props) {
  const isOutgoing = message.direction === 'outgoing'

  return (
    <BubbleRow $outgoing={isOutgoing}>
      <Bubble $outgoing={isOutgoing}>
        <BubbleText>{message.text}</BubbleText>
        <BubbleMeta $outgoing={isOutgoing}>
          <BubbleTime $outgoing={isOutgoing}>
            {formatTime(message.timestamp)}
          </BubbleTime>
          {isOutgoing && <MessageStatusIcon status={message.status} />}
        </BubbleMeta>
      </Bubble>
    </BubbleRow>
  )
}
