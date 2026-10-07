export interface SendMessageRequest {
  chatId: string
  message: string
}

export interface SendMessageResponse {
  idMessage: string
}

export interface InstanceData {
  idInstance: number
  wid: string
  typeInstance: string
}

export interface SenderData {
  chatId: string
  chatName: string
  chatType: string
  sender: string
  senderName: string
  senderType: string
  senderContactName: string
  senderPhoneNumber: number
}

export interface TextMessageData {
  textMessage: string
}

export interface MessageData {
  typeMessage: string
  textMessageData?: TextMessageData
}

export interface NotificationBody {
  typeWebhook: string
  instanceData: InstanceData
  timestamp: number
  idMessage: string
  senderData: SenderData
  messageData: MessageData
}

export interface ReceiveNotificationResponse {
  receiptId: number
  body: NotificationBody
}

export interface DeleteNotificationResponse {
  result: boolean
  reason?: string
}

export interface GetAvatarResponse {
  urlAvatar: string
  available: boolean
  base64Avatar?: string
}

export interface GetChatsItem {
  archive: boolean
  id: string
  name: string
  type: 'user' | 'group'
  unreadCount: number
  ephemeralExpiration: number
  ephemeralSettingTimestamp: number
  newChatId?: string
}

export type GetChatsResponse = GetChatsItem[]

export interface ChatHistoryMessage {
  type: 'incoming' | 'outgoing'
  idMessage: string
  timestamp: number
  typeMessage: string
  chatId: string
  /** Present for textMessage / extendedTextMessage */
  textMessage?: string
  /** Status of outgoing messages */
  statusMessage?: 'sent' | 'delivered' | 'read' | 'failed'
  sendByApi?: boolean
}

export type GetChatHistoryResponse = ChatHistoryMessage[]
