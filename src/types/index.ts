export interface Credentials {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}


export type MessageDirection = 'outgoing' | 'incoming'

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed'

export interface Message {
  id: string
  chatId: string
  text: string
  direction: MessageDirection
  timestamp: number
  status?: MessageStatus
}

export interface Chat {
  id: string
  name: string
  messages: Message[]
  avatarUrl?: string
}