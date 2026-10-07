import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteNotification, receiveNotification } from '@/api/greenApi'
import type { Credentials } from '@/types'
import type { ReceiveNotificationResponse } from '@/api/types'

const POLL_INTERVAL_MS = 3000

export type PollingStatus = 'idle' | 'polling' | 'error'

export function usePolling(
  credentials: Credentials | null,
  onNotification: (notification: ReceiveNotificationResponse) => void,
): PollingStatus {
  const [status, setStatus] = useState<PollingStatus>('idle')

  const onNotificationRef = useRef(onNotification)
  useEffect(() => { onNotificationRef.current = onNotification }, [onNotification])

  const credentialsRef = useRef(credentials)
  useEffect(() => { credentialsRef.current = credentials }, [credentials])

  const runLoop = useCallback(async (signal: AbortSignal) => {
    while (!signal.aborted) {
      const creds = credentialsRef.current
      if (!creds) {
        setStatus('idle')
        await sleep(POLL_INTERVAL_MS, signal)
        continue
      }

      try {
        setStatus('polling')
        const notification = await receiveNotification(creds, signal)

        if (signal.aborted) break

        if (notification) {
          deleteNotification(creds, notification.receiptId).catch(() => undefined)
          onNotificationRef.current(notification)
        }

        setStatus('polling')
      } catch (err) {
        if (signal.aborted) break
        if (err instanceof DOMException && err.name === 'AbortError') break
        setStatus('error')
        await sleep(POLL_INTERVAL_MS, signal)
        continue
      }

      await sleep(POLL_INTERVAL_MS, signal)
    }
  }, [])

  useEffect(() => {
    if (!credentials) {
      setStatus('idle')
      return
    }

    const controller = new AbortController()
    void runLoop(controller.signal)

    return () => {
      controller.abort()
      setStatus('idle')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials?.idInstance, credentials?.apiTokenInstance, runLoop])

  return status
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }
    const id = setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}
