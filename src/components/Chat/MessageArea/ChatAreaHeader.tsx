import type { Chat } from '@/types'
import {
  BackButton,
  ChatHeader,
  HeaderAvatar,
  HeaderAvatarImg,
  HeaderInfo,
  HeaderName,
  HeaderSub,
} from './styles'

interface Props {
  chat: Chat
  historyLoading: boolean
  onBack: () => void
}

function getInitial(name: string): string {
  return name.replace('@c.us', '').charAt(0).toUpperCase()
}

export default function ChatAreaHeader({ chat, historyLoading, onBack }: Props) {
  return (
    <ChatHeader>
      <BackButton onClick={onBack} aria-label="Назад к списку чатов" title="Назад">
        <svg
          fill="#fff"
          height="16px"
          width="16px"
          viewBox="0 0 477.175 477.175"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
          </g>
        </svg>
      </BackButton>

      <HeaderAvatar>
        {chat.avatarUrl ? (
          <HeaderAvatarImg
            src={chat.avatarUrl}
            alt={chat.name}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          getInitial(chat.name)
        )}
      </HeaderAvatar>

      <HeaderInfo>
        <HeaderName>{chat.name}</HeaderName>
        <HeaderSub>{historyLoading ? 'Загрузка...' : ''}</HeaderSub>
      </HeaderInfo>
    </ChatHeader>
  )
}
