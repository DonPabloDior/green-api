import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Chat, Credentials, Message, MessageStatus } from '@/types'


interface AppState {
  credentials: Credentials | null
  chats: Chat[]
  activeChatId: string | null
}

interface AppActions {
  setCredentials: (credentials: Credentials) => void
  logout: () => void
  addChat: (chat: Chat) => void
  setActiveChat: (chatId: string | null) => void
  addMessage: (chatId: string, message: Message) => void
  replaceMessage: (chatId: string, oldId: string, newMessage: Message) => void
  updateMessageStatus: (idMessage: string, status: MessageStatus) => void
  setMessages: (chatId: string, messages: Message[]) => void
  setAvatarUrl: (chatId: string, avatarUrl: string) => void
}

type AppStore = AppState & AppActions

const initialState: AppState = {
  credentials: null,
  chats: [],
  activeChatId: null,
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCredentials: (credentials) => {
        set({ credentials })
      },

      logout: () => {
        set({ ...initialState })
      },

      addChat: (chat) => {
        const { chats } = get()
        if (chats.some((c) => c.id === chat.id)) return
        set({ chats: [...chats, chat] })
      },

      setActiveChat: (chatId) => {
        set({ activeChatId: chatId ?? null })
      },

      addMessage: (chatId, message) => {
        const { chats } = get()
        const existing = chats.find((c) => c.id === chatId)

        if (existing) {
          if (existing.messages.some((m) => m.id === message.id)) return
          set({
            chats: chats.map((c) =>
              c.id === chatId
                ? { ...c, messages: [...c.messages, message] }
                : c,
            ),
          })
        } else {
          const newChat: Chat = {
            id: chatId,
            name: chatId.replace('@c.us', ''),
            messages: [message],
          }
          set({ chats: [...chats, newChat] })
        }
      },

      replaceMessage: (chatId, oldId, newMessage) => {
        const { chats } = get()
        set({
          chats: chats.map((c) => {
            if (c.id !== chatId) return c
            return {
              ...c,
              messages: c.messages.map((m) => (m.id === oldId ? newMessage : m)),
            }
          }),
        })
      },

      updateMessageStatus: (idMessage, status) => {
        const { chats } = get()
        set({
          chats: chats.map((c) => ({
            ...c,
            messages: c.messages.map((m) =>
              m.id === idMessage ? { ...m, status } : m,
            ),
          })),
        })
      },

      setMessages: (chatId, messages) => {
        const { chats } = get()
        set({
          chats: chats.map((c) =>
            c.id === chatId ? { ...c, messages } : c,
          ),
        })
      },

      setAvatarUrl: (chatId, avatarUrl) => {
        const { chats } = get()
        set({
          chats: chats.map((c) =>
            c.id === chatId ? { ...c, avatarUrl } : c,
          ),
        })
      },
    }),
    {
      name: 'max-chat-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        credentials: state.credentials,
        chats: state.chats,
      }),
    },
  ),
)

export const selectActiveChat = (state: AppStore): Chat | null =>
  state.chats.find((c) => c.id === state.activeChatId) ?? null