# MAX Chat UI

Веб-интерфейс для отправки и получения текстовых сообщений в мессенджере **MAX** через сервис [GREEN-API](https://green-api.com/max).

## Стек

- **React 19** + **TypeScript** (Vite)
- **styled-components** - стилизация в стиле web.max.ru
- **Zustand** - глобальный стейт + persist в localStorage
- **react-router-dom** - SPA роутинг

## Возможности

- Вход по `idInstance` и `apiTokenInstance` из личного кабинета GREEN-API
- Список чатов в левой панели, создание нового чата по номеру телефона
- Отправка текстовых сообщений через метод `sendMessage`
- Получение входящих сообщений через polling (`receiveNotification` → `deleteNotification`) каждые ~3 сек
- Адаптивный интерфейс (мобильный/десктоп)

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173).

## Сборка

```bash
npm run build
npm run preview
```

## Использование

1. Перейдите на страницу входа
2. Введите **ID инстанса** и **API Token** из [личного кабинета GREEN-API](https://console.green-api.com)
3. Нажмите **«Войти»**
4. Нажмите **«+»** и введите номер телефона получателя (11 цифр, например `79991234567`)
5. Напишите сообщение и нажмите **Enter** или кнопку отправки
6. Ответы от собеседника появятся автоматически

## Структура проекта

```
src/
  api/           # greenApi.ts - sendMessage, receiveNotification, deleteNotification
  types/         # Общие TypeScript-типы (Credentials, Chat, Message)
  store/         # Zustand store с persist middleware
  hooks/         # usePolling - loop-based polling входящих уведомлений
  components/
    Login/       # Страница входа
    Chat/        # ChatLayout, ChatList, MessageArea, MessageBubble, MessageInput, NewChatModal
```
