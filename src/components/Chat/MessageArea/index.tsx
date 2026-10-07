import { useRef } from 'react'
import { useAppStore, selectActiveChat } from '@/store/useAppStore'
import { sendMessage } from '@/api/greenApi'
import { useChatHistory } from '@/hooks/useChatHistory'
import type { Message } from '@/types'
import ChatAreaHeader from './ChatAreaHeader'
import MessageList from './MessageList'
import MessageInput from '../MessageInput'

export default function MessageArea() {
  const activeChat = useAppStore(selectActiveChat)
  const activeChatId = useAppStore((s) => s.activeChatId)
  const credentials = useAppStore((s) => s.credentials)
  const addMessage = useAppStore((s) => s.addMessage)
  const replaceMessage = useAppStore((s) => s.replaceMessage)
  const setActiveChat = useAppStore((s) => s.setActiveChat)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { historyLoading } = useChatHistory(activeChatId, credentials, scrollRef, activeChat?.messages.length ?? 0)

  async function handleSend(text: string) {
    if (!credentials || !activeChat) return

    const optimisticId = `local-${Date.now()}`
    const optimisticMsg: Message = {
      id: optimisticId,
      chatId: activeChat.id,
      text,
      direction: 'outgoing',
      timestamp: Math.floor(Date.now() / 1000),
      status: 'pending',
    }

    addMessage(activeChat.id, optimisticMsg)

    const result = await sendMessage(credentials, {
      chatId: activeChat.id,
      message: text,
    })

    replaceMessage(activeChat.id, optimisticId, {
      ...optimisticMsg,
      id: result.idMessage,
      status: 'sent',
    })
  }

  if (!activeChat) return null

  return (
    <>
      <ChatAreaHeader
        chat={activeChat}
        historyLoading={historyLoading}
        onBack={() => setActiveChat('')}
      />
      <MessageList
        ref={scrollRef}
        messages={activeChat.messages}
        historyLoading={historyLoading}
      />
      <MessageInput onSend={handleSend} />
    </>
  )
}
