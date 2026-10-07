import { useCallback, useEffect, useState } from 'react'
import { useLottie } from 'lottie-react'
import { useAppStore, selectActiveChat } from '@/store/useAppStore'
import { usePolling } from '@/hooks/usePolling'
import { getChats } from '@/api/greenApi'
import type { ReceiveNotificationResponse } from '@/api/types'
import type { Message } from '@/types'
import chatAnimation from '@/assets/icons/animated/Chat.json'
import {
  LayoutRoot,
  MainPanel,
  NoChatPlaceholder,
  NoChatText,
  Sidebar,
} from './styles'
import ChatList from '../ChatList'
import MessageArea from '../MessageArea'
import NewChatModal from '../NewChatModal'

function LottieIcon({ animationData, size = 160 }: { animationData: unknown; size?: number }) {
  const { View } = useLottie({ animationData, loop: true, autoplay: true }, { width: size, height: size })
  return <>{View}</>
}

export default function ChatLayout() {
  const [showNewChat, setShowNewChat] = useState(false)
  const activeChat = useAppStore(selectActiveChat)
  const credentials = useAppStore((s) => s.credentials)
  const addMessage = useAppStore((s) => s.addMessage)
  const updateMessageStatus = useAppStore((s) => s.updateMessageStatus)
  const addChat = useAppStore((s) => s.addChat)
  const [chatsLoading, setChatsLoading] = useState(false)

  useEffect(() => {
    if (!credentials) return
    const controller = new AbortController()
    setChatsLoading(true)

    getChats(credentials, undefined, controller.signal)
      .then((items) => {
        const nonArchived = items.filter((item) => !item.archive)
        for (const item of nonArchived) {
          addChat({
            id: item.id,
            name: item.name || item.id.replace('@c.us', ''),
            messages: [],
          })
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('getChats failed:', err.message)
        }
      })
      .finally(() => setChatsLoading(false))

    return () => controller.abort()
  }, [credentials, addChat])

  const handleNotification = useCallback(
    (notification: ReceiveNotificationResponse) => {
      const { body } = notification

      if (body.typeWebhook === 'outgoingMessageStatus') {
        const statusBody = body as unknown as {
          idMessage: string
          status: 'sent' | 'delivered' | 'read' | 'failed'
        }
        if (statusBody.idMessage && statusBody.status) {
          updateMessageStatus(statusBody.idMessage, statusBody.status)
        }
        return
      }

      if (body.typeWebhook !== 'incomingMessageReceived') return
      if (body.messageData.typeMessage !== 'textMessage') return

      const text = body.messageData.textMessageData?.textMessage
      if (!text) return

      const rawChatId = body.senderData.chatId
      const chats = useAppStore.getState().chats

      const existingChat =
        chats.find((c) => c.id === rawChatId) ??
        chats.find((c) => c.id.replace('@c.us', '') === rawChatId) ??
        chats.find((c) => c.name === rawChatId)

      const chatId = existingChat?.id ?? rawChatId

      const incomingMsg: Message = {
        id: body.idMessage,
        chatId,
        text,
        direction: 'incoming',
        timestamp: body.timestamp,
      }

      addMessage(chatId, incomingMsg)
    },
    [addMessage, updateMessageStatus],
  )

  usePolling(credentials, handleNotification)
  const hasMobileActive = activeChat !== null

  return (
    <LayoutRoot>
      <Sidebar data-hidden={hasMobileActive ? 'true' : 'false'}>
        <ChatList onNewChat={() => setShowNewChat(true)} loading={chatsLoading} />
      </Sidebar>

      <MainPanel data-hidden={!hasMobileActive ? 'true' : 'false'}>
        {activeChat ? (
          <MessageArea />
        ) : (
          <NoChatPlaceholder>
            <LottieIcon animationData={chatAnimation} size={160} />
            <NoChatText>Выберите чат или создайте новый</NoChatText>
          </NoChatPlaceholder>
        )}
      </MainPanel>

      {showNewChat && (
        <NewChatModal onClose={() => setShowNewChat(false)} />
      )}
    </LayoutRoot>
  )
}
