import { Outlet, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userStore } from './store'
import { useEffect, useState } from 'react'
import { deleteNotification, receiveNotification } from './services'
import { ChatModel, ReceiveNotificationModel } from './models'
import { chatHandler } from './utils'

export const App = () => {
  const navigate = useNavigate()
  const { id, token } = useRecoilValue(userStore)
  const [chats, setChats] = useState<ChatModel[]>([])
  const [message, setMessage] = useState({ text: '', chatId: '0' })
  const [newContact, setNewContact] = useState('')

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newContact.length === 11) {
      setChats([{ chatId: newContact, messages: [] }, ...chats])
      setNewContact('')
    }
  }

  const handleChatChange = (text: string, chatId: string) => {
    setMessage({ text, chatId })
  }

  const receiveAll = async () => {
    let data = await receiveNotification(id, token)

    if (data !== 'Error') {
      const message = data as ReceiveNotificationModel

      if (message === null) return
      await deleteNotification(id, token, message.receiptId)
      if (message.body.chatId) return

      const chatId = message.body.senderData.chatId.split('@')[0]

      const chat = chatHandler(
        chats.find((e) => e.chatId === chatId),
        message,
      )

      if (chat !== 'Error')
        setChats((prev) => [chat, ...prev.filter((e) => e.chatId !== chatId)])
    }
  }

  useEffect(() => {
    if (message.text.length) {
      const chat = chats.find((e) => e.chatId === message.chatId)
      if (chat) {
        let updatedChat: ChatModel = {
          chatId: message.chatId,
          messages: [
            ...chat.messages,
            { sender: '0', textMessage: message.text, timestamp: Date.now() },
          ],
        }
        setChats([updatedChat, ...chats.filter((e) => e.chatId !== message.chatId)])
      }
      setMessage({ text: '', chatId: '0' })
    }
  }, [message.text])

  useEffect(() => {
    if (!(id && token)) {
      navigate('/auth')
    } else {
      const interval = setInterval(() => {
        receiveAll()
      }, 1500)

      return () => clearInterval(interval)
    }
  }, [JSON.stringify(chats)])

  return (
    <section className="h-screen bg-primary flex select-none text-white">
      <nav className="bg-secondary py-2 h-full overflow-hidden">
        <div className="px-2">
          <input
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            onKeyDown={handleKey}
            className="w-full outline-none p-2 bg-primary rounded shadow"
            placeholder="Чат"
          />
        </div>
        <ul className="flex flex-col p-2 pb-10 h-full overflow-scroll">
          {chats.map((e) => (
            <li key={e.chatId}>
              <button
                onClick={() => navigate(e.chatId)}
                className={`p-2 transition-all w-full border-b border-gray-500 hover:bg-special`}
              >
                {e.chatId}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="h-full overflow-hidden grow">
        <Outlet context={{ id, token, chats, handleChatChange }} />
      </main>
    </section>
  )
}
