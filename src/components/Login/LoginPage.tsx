import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import type { Credentials } from '@/types'
import {
  ApiUrlRow,
  ApiUrlToggle,
  AppName,
  Card,
  ErrorMessage,
  Field,
  Form,
  Input,
  Label,
  LogoCircle,
  LogoRow,
  PageWrapper,
  Subtitle,
  SubmitButton,
} from './LoginPage.styles'

const DEFAULT_API_URL = 'https://api.green-api.com'

export default function LoginPage() {
  const navigate = useNavigate()
  const setCredentials = useAppStore((s) => s.setCredentials)

  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [showApiUrl, setShowApiUrl] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isValid = idInstance.trim() !== '' && apiTokenInstance.trim() !== ''

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setLoading(true)
    setError('')

    try {
      const credentials: Credentials = {
        idInstance: idInstance.trim(),
        apiTokenInstance: apiTokenInstance.trim(),
        apiUrl: apiUrl.trim() || DEFAULT_API_URL,
      }
      setCredentials(credentials)
      navigate('/chat')
    } catch {
      setError('Не удалось войти. Проверьте учётные данные.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Card>
        <LogoRow>
          <LogoCircle>M</LogoCircle>
          <AppName>MAX Chat</AppName>
        </LogoRow>

        <Subtitle>
          Введите данные из личного кабинета GREEN-API,
          <br />
          чтобы начать переписку в мессенджере MAX
        </Subtitle>

        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <Label htmlFor="idInstance">ID инстанса</Label>
            <Input
              id="idInstance"
              type="text"
              placeholder="Например: 1101000001"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </Field>

          <Field>
            <Label htmlFor="apiToken">API Token инстанса</Label>
            <Input
              id="apiToken"
              type="password"
              placeholder="Ваш токен из личного кабинета"
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              autoComplete="current-password"
            />
          </Field>

          <ApiUrlRow>
            <ApiUrlToggle
              type="button"
              onClick={() => setShowApiUrl((v) => !v)}
            >
              {showApiUrl ? '▲ Скрыть API URL' : '▼ Изменить API URL'}
            </ApiUrlToggle>
            {showApiUrl && (
              <Field>
                <Label htmlFor="apiUrl">API URL</Label>
                <Input
                  id="apiUrl"
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder={DEFAULT_API_URL}
                />
              </Field>
            )}
          </ApiUrlRow>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={!isValid || loading}>
            {loading ? 'Вход...' : 'Войти'}
          </SubmitButton>
        </Form>
      </Card>
    </PageWrapper>
  )
}
