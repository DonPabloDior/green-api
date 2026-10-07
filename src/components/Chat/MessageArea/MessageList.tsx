import { useMemo, forwardRef } from 'react'
import { useLottie } from 'lottie-react'
import spinnerAnimation from '@/assets/icons/animated/spinner.json'
import messageAnimation from '@/assets/icons/animated/message.json'
import type { Message } from '@/types'
import { DateDivider, DateLabel, EmptyChat, MessagesScroll } from './styles'
import MessageBubble from '../MessageBubble'

interface Props {
  messages: Message[]
  historyLoading: boolean
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function groupByDate(messages: Message[]): Array<{ date: string; messages: Message[] }> {
  const groups: Array<{ date: string; messages: Message[] }> = []
  let currentDate = ''
  for (const msg of messages) {
    const date = formatDate(msg.timestamp)
    if (date !== currentDate) {
      currentDate = date
      groups.push({ date, messages: [msg] })
    } else {
      groups[groups.length - 1].messages.push(msg)
    }
  }
  return groups
}

function LottieIcon({ animationData, size = 100 }: { animationData: unknown; size?: number }) {
  const { View } = useLottie(
    { animationData, loop: true, autoplay: true },
    { width: size, height: size },
  )
  return <div>{View}</div>
}

const MessageList = forwardRef<HTMLDivElement, Props>(({ messages, historyLoading }, ref) => {
  const groups = useMemo(() => groupByDate(messages), [messages])

  return (
    <MessagesScroll ref={ref}>
      {historyLoading ? (
        <EmptyChat>
          <LottieIcon animationData={spinnerAnimation} size={80} />
          <h3>Загрузка истории...</h3>
          <span>Пожалуйста подождите</span>
        </EmptyChat>
      ) : messages.length === 0 ? (
        <EmptyChat>
          <LottieIcon animationData={messageAnimation} size={120} />
          <h3>Начните переписку</h3>
          <span>Напишите первое сообщение</span>
        </EmptyChat>
      ) : (
        groups.map((group) => (
          <div key={group.date}>
            <DateDivider>
              <DateLabel>{group.date}</DateLabel>
            </DateDivider>
            {group.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        ))
      )}
    </MessagesScroll>
  )
})

MessageList.displayName = 'MessageList'

export default MessageList
