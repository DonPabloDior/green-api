import { type ChangeEvent, type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { phoneNumberToChatId } from '@/api/greenApi'
import type { Chat } from '@/types'
import {
  ButtonRow,
  CancelButton,
  ConfirmButton,
  Field,
  HintText,
  Input,
  Label,
  Modal,
  ModalSubtitle,
  ModalTitle,
  Overlay,
} from './styles'

interface Props {
  onClose: () => void
}

const PHONE_REGEX = /^\d{11}$/

export default function NewChatModal({ onClose }: Props) {
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addChat = useAppStore((s) => s.addChat)
  const setActiveChat = useAppStore((s) => s.setActiveChat)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const digits = phone.replace(/\D/g, '')
  const isValid = PHONE_REGEX.test(digits)
  const showError = touched && !isValid

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '')
    setPhone(raw)
  }

  function handleBlur() {
    setTouched(true)
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setTouched(true)
      if (isValid) handleConfirm()
    }
  }

  function handleConfirm() {
    if (!isValid) return

    const chatId = phoneNumberToChatId(digits)
    const newChat: Chat = {
      id: chatId,
      name: digits,
      messages: [],
    }

    addChat(newChat)
    setActiveChat(chatId)
    onClose()
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (isValid) handleConfirm()
  }

  function handleOverlayClick() {
    onClose()
  }

  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation()
  }

  function getHint(): string {
    if (!touched || !phone) return 'Введите 11 цифр, например: 79991234567'
    if (digits.length < 11) return `Введено ${digits.length} из 11 цифр`
    if (digits.length > 11) return 'Номер слишком длинный'
    return ''
  }

  return (
    <Overlay onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <Modal onClick={stopPropagation}>
        <ModalTitle id="modal-title">Новый чат</ModalTitle>
        <ModalSubtitle>
          Введите номер телефона получателя в формате MAX
        </ModalSubtitle>

        <form onSubmit={handleSubmit} noValidate>
          <Field>
            <Label htmlFor="phone-input">Номер телефона</Label>
            <Input
              id="phone-input"
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              placeholder="79991234567"
              value={phone}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleInputKeyDown}
              $hasError={showError}
              maxLength={11}
              autoComplete="off"
            />
            <HintText $error={showError}>{getHint()}</HintText>
          </Field>

          <ButtonRow>
            <CancelButton type="button" onClick={onClose}>
              Отмена
            </CancelButton>
            <ConfirmButton type="submit" disabled={!isValid}>
              Создать чат
            </ConfirmButton>
          </ButtonRow>
        </form>
      </Modal>
    </Overlay>
  )
}
