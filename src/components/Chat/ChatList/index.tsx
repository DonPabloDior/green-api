import { useAppStore } from '@/store/useAppStore'
import {
  ChatListScroll,
  EmptyIcon,
  EmptyState,
  EmptyText,
  NewChatButton,
  SidebarHeader,
  SidebarTitle,
  SkeletonItem,
  SkeletonAvatar,
  SkeletonLines,
  SkeletonLine,
  SidebarFooter,
} from '../ChatLayout/styles'
import ChatListItem from './ChatListItem'
import SidebarMenu from '../SidebarMenu'

interface Props {
  onNewChat: () => void
  loading?: boolean
}

function ChatListSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <SkeletonItem key={i}>
          <SkeletonAvatar />
          <SkeletonLines>
            <SkeletonLine $width={i % 2 === 0 ? '60%' : '75%'} />
            <SkeletonLine $width={i % 3 === 0 ? '40%' : '55%'} />
          </SkeletonLines>
        </SkeletonItem>
      ))}
    </>
  )
}

export default function ChatList({ onNewChat, loading = false }: Props) {
  const chats = useAppStore((s) => s.chats)
  const activeChatId = useAppStore((s) => s.activeChatId)
  const setActiveChat = useAppStore((s) => s.setActiveChat)
  const logout = useAppStore((s) => s.logout)

  return (
    <>
      <SidebarHeader>
        <SidebarTitle>Чаты</SidebarTitle>
        <NewChatButton
          onClick={onNewChat}
          title="Новый чат"
          aria-label="Создать новый чат"
        >
          +
        </NewChatButton>
      </SidebarHeader>

      <ChatListScroll>
        {loading ? (
          <ChatListSkeleton />
        ) : chats.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <div>
                <svg width="48px" height="48px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </EmptyIcon>
            <EmptyText>
              Нет чатов.{'\n'}Нажмите «+», чтобы начать переписку
            </EmptyText>
          </EmptyState>
        ) : (
          chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onClick={() => setActiveChat(chat.id)}
            />
          ))
        )}
      </ChatListScroll>

      <SidebarFooter>
        <SidebarMenu onLogout={logout} />
      </SidebarFooter>
    </>
  )
}
