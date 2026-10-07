import {
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from 'react'
import { ErrorBanner, InputBar, SendButton, TextArea } from './styles'

interface Props {
  onSend: (text: string) => Promise<void>
  disabled?: boolean
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  )
}

export default function MessageInput({ onSend, disabled = false }: Props) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = text.trim().length > 0 && !sending && !disabled

  function autoResize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
    setError('')
    autoResize()
  }

  async function handleSend() {
    const trimmed = text.trim()
    if (!trimmed || sending || disabled) return

    setSending(true)
    setError('')
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      await onSend(trimmed)
    } catch {
      setError('Не удалось отправить сообщение. Попробуйте ещё раз.')
      setText(trimmed)
      autoResize()
    } finally {
      setSending(false)
      textareaRef.current?.focus()
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  return (
    <>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <InputBar>
        <TextArea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Сообщение"
          rows={1}
          disabled={disabled || sending}
          aria-label="Введите сообщение"
        />
        <SendButton
          $active={canSend}
          onClick={() => void handleSend()}
          disabled={!canSend}
          aria-label="Отправить"
          type="button"
        >
          <SendIcon />
        </SendButton>
      </InputBar>
    </>
  )
}
