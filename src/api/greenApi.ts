import type { Credentials } from '@/types'
import type {
  DeleteNotificationResponse,
  GetAvatarResponse,
  GetChatsResponse,
  GetChatHistoryResponse,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from './types'

const DEFAULT_API_URL = 'https://api.green-api.com'

function instanceBase(credentials: Credentials): string {
  const base = credentials.apiUrl || DEFAULT_API_URL
  return `${base}/waInstance${credentials.idInstance}`
}

export async function sendMessage(
  credentials: Credentials,
  payload: SendMessageRequest,
): Promise<SendMessageResponse> {
  const url = `${instanceBase(credentials)}/sendMessage/${credentials.apiTokenInstance}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`sendMessage failed [${response.status}]: ${text}`)
  }

  return response.json() as Promise<SendMessageResponse>
}

export async function receiveNotification(
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse | null> {
  const url = `${instanceBase(credentials)}/receiveNotification/${credentials.apiTokenInstance}?receiveTimeout=5`

  const response = await fetch(url, { method: 'GET', signal })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`receiveNotification failed [${response.status}]: ${text}`)
  }

  const text = await response.text()
  if (!text || text.trim() === '' || text.trim() === 'null') return null

  const data: unknown = JSON.parse(text)
  if (data === null || data === undefined) return null

  return data as ReceiveNotificationResponse
}

export async function deleteNotification(
  credentials: Credentials,
  receiptId: number,
): Promise<DeleteNotificationResponse> {
  const url = `${instanceBase(credentials)}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`

  const response = await fetch(url, { method: 'DELETE' })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`deleteNotification failed [${response.status}]: ${text}`)
  }

  return response.json() as Promise<DeleteNotificationResponse>
}

export async function getChats(
  credentials: Credentials,
  count?: number,
  signal?: AbortSignal,
): Promise<GetChatsResponse> {
  const params = count != null ? `?count=${count}` : ''
  const url = `${instanceBase(credentials)}/getChats/${credentials.apiTokenInstance}${params}`

  const response = await fetch(url, { method: 'GET', signal })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`getChats failed [${response.status}]: ${text}`)
  }

  return response.json() as Promise<GetChatsResponse>
}

export async function getChatHistory(
  credentials: Credentials,
  chatId: string,
  count = 100,
  signal?: AbortSignal,
): Promise<GetChatHistoryResponse> {
  const url = `${instanceBase(credentials)}/getChatHistory/${credentials.apiTokenInstance}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, count }),
    signal,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`getChatHistory failed [${response.status}]: ${text}`)
  }

  return response.json() as Promise<GetChatHistoryResponse>
}

export async function getAvatar(
  credentials: Credentials,
  chatId: string,
  signal?: AbortSignal,
): Promise<GetAvatarResponse> {
  const url = `${instanceBase(credentials)}/getAvatar/${credentials.apiTokenInstance}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId }),
    signal,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`getAvatar failed [${response.status}]: ${text}`)
  }

  return response.json() as Promise<GetAvatarResponse>
}

export function phoneNumberToChatId(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `${digits}@c.us`
}

export function chatIdToPhoneNumber(chatId: string): string {
  return chatId.replace('@c.us', '')
}

export interface StateInstanceResponse {
  stateInstance: string
}

export async function getStateInstance(
  credentials: Credentials,
): Promise<StateInstanceResponse> {
  const url = `${instanceBase(credentials)}/getStateInstance/${credentials.apiTokenInstance}`
  const response = await fetch(url, { method: 'GET' })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`getStateInstance failed [${response.status}]: ${text}`)
  }
  return response.json() as Promise<StateInstanceResponse>
}

export interface InstanceSettings {
  webhookUrl: string
  incomingWebhook: string
  outgoingWebhook: string
  stateWebhook: string
  [key: string]: unknown
}

export async function getSettings(
  credentials: Credentials,
): Promise<InstanceSettings> {
  const url = `${instanceBase(credentials)}/getSettings/${credentials.apiTokenInstance}`
  const response = await fetch(url, { method: 'GET' })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`getSettings failed [${response.status}]: ${text}`)
  }
  return response.json() as Promise<InstanceSettings>
}

export async function setSettings(
  credentials: Credentials,
  settings: Partial<InstanceSettings>,
): Promise<{ saveSettings: boolean }> {
  const url = `${instanceBase(credentials)}/setSettings/${credentials.apiTokenInstance}`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`setSettings failed [${response.status}]: ${text}`)
  }
  return response.json() as Promise<{ saveSettings: boolean }>
}
