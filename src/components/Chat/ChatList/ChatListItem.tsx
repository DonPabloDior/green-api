import type { Chat } from '@/types'
import { Avatar, AvatarImg, Info, Item, Name, NameRow, Preview, Time } from './ChatListItem.styles'

interface Props {
  chat: Chat
  isActive: boolean
  onClick: () => void
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

function getInitial(name: string): string {
  return name.replace('@c.us', '').charAt(0).toUpperCase()
}

export default function ChatListItem({ chat, isActive, onClick }: Props) {
  const lastMessage = chat.messages[chat.messages.length - 1]

  return (
    <Item $active={isActive} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <Avatar>
        {chat.avatarUrl
          ? <AvatarImg src={chat.avatarUrl} alt={chat.name} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          : getInitial(chat.name)
        }
      </Avatar>
      <Info>
        <NameRow>
          <Name title={chat.name}>{chat.name}</Name>
          {lastMessage && <Time>{formatTime(lastMessage.timestamp)}</Time>}
        </NameRow>
        <Preview>
          {lastMessage
            ? `${lastMessage.direction === 'outgoing' ? '✓ ' : ''}${lastMessage.text}`
            : 'Нет сообщений'}
        </Preview>
      </Info>
    </Item>
  )
}
