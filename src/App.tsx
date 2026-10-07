import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import LoginPage from '@/components/Login/LoginPage'
import ChatLayout from '@/components/Chat/ChatLayout'
import { useAppStore } from '@/store/useAppStore'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0ece3;
    color: #1a1a1a;
    -webkit-font-smoothing: antialiased;
  }
`

function RequireAuth({ children }: { children: React.ReactNode }) {
  const credentials = useAppStore((s) => s.credentials)
  return credentials ? <>{children}</> : <Navigate to="/login" replace />
}

function GuestOnly({ children }: { children: React.ReactNode }) {
  const credentials = useAppStore((s) => s.credentials)
  return !credentials ? <>{children}</> : <Navigate to="/chat" replace />
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestOnly>
                <LoginPage />
              </GuestOnly>
            }
          />
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <ChatLayout />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
