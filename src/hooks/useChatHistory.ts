import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { getChatHistory, getAvatar } from '@/api/greenApi'
import type { Credentials } from '@/types'
import type { Message, MessageStatus } from '@/types'

export function useChatHistory(
  activeChatId: string | null,
  credentials: Credentials | null,
  scrollRef: React.RefObject<HTMLDivElement | null>,
  messagesLength: number,
) {
  const setMessages = useAppStore((s) => s.setMessages)
  const setAvatarUrl = useAppStore((s) => s.setAvatarUrl)
  const [historyLoading, setHistoryLoading] = useState(false)

  useEffect(() => {
    if (!activeChatId || !credentials) return
    const cachedCount =
      useAppStore.getState().chats.find((c) => c.id === activeChatId)?.messages.length ?? 0
    if (cachedCount > 0) return

    const controller = new AbortController()
    setHistoryLoading(true)

    getChatHistory(credentials, activeChatId, 100, controller.signal)
      .then((items) => {
        const messages: Message[] = items
          .filter(
            (item) =>
              item.typeMessage === 'textMessage' ||
              item.typeMessage === 'extendedTextMessage',
          )
          .map((item) => ({
            id: item.idMessage,
            chatId: activeChatId,
            text: item.textMessage ?? '',
            direction: (item.type === 'outgoing' ? 'outgoing' : 'incoming') as
              | 'outgoing'
              | 'incoming',
            timestamp: item.timestamp,
            status:
              item.type === 'outgoing'
                ? ((item.statusMessage ?? 'sent') as MessageStatus)
                : undefined,
          }))
          .reverse()

        setMessages(activeChatId, messages)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('getChatHistory failed:', err.message)
        }
      })
      .finally(() => setHistoryLoading(false))

    return () => controller.abort()
  }, [activeChatId, credentials, setMessages])

  useEffect(() => {
    if (!activeChatId || !credentials) return
    const cached = useAppStore.getState().chats.find((c) => c.id === activeChatId)
    if (cached?.avatarUrl) return

    const controller = new AbortController()
    getAvatar(credentials, activeChatId, controller.signal)
      .then((res) => {
        if (res.urlAvatar) setAvatarUrl(activeChatId, res.urlAvatar)
      })
      .catch(() => undefined)

    return () => controller.abort()
  }, [activeChatId, credentials, setAvatarUrl])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const raf = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
    return () => cancelAnimationFrame(raf)
  }, [messagesLength, historyLoading, scrollRef])

  return { historyLoading }
}
