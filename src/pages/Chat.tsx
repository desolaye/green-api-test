import { useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

import { sendMessage } from '../services'
import { ChatModel } from '../models'

export const Chat = () => {
  const { id, token, chats, handleChatChange } = useOutletContext<{
    id: string
    token: string
    chats: ChatModel[]
    handleChatChange: (message: string, chatId: string) => void
  }>()

  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { chatId } = useParams()
  const [chat, _] = useState(chats.find((e) => e.chatId === chatId))

  const handleSend = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (message.length && chatId) {
      if ((e && e.key === 'Enter') || !e) {
        setDisabled(true)
        await sendMessage(id, token, chatId, message)
        handleChat()
        setMessage('')
        setDisabled(false)
      }
    }
  }

  const handleChat = () => {
    if (chat) handleChatChange(message, chatId || '0')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <article className="flex flex-col w-full h-full border-l border-gray-500">
      <header className="bg-primary p-4">
        <p>{chatId}</p>
      </header>
      <main className="flex flex-col grow bg-secondary h-full overflow-hidden">
        <ul className="flex flex-col gap-2 px-2 h-full overflow-scroll py-10">
          {chats
            .find((e) => e.chatId === chatId)
            ?.messages.map((msg) => (
              <li
                key={msg.timestamp}
                className={`w-fit max-w-3/4 rounded p-2 bg-opacity-75 ${
                  msg.sender === '0' ? 'bg-green-600 self-end text-end' : ' bg-special'
                }`}
              >
                {msg.textMessage}
              </li>
            ))}
        </ul>
      </main>
      <div className="flex bg-primary rounded shadow gap-4 p-4">
        <input
          className="w-full outline-none px-2 bg-special rounded shadow"
          placeholder="Сообщение"
          onChange={handleChange}
          onKeyDown={handleSend}
          disabled={disabled}
          value={message}
        />
        <button
          className="p-2 font-bold text-lg px-4 rounded-full bg-special shadow"
          onClick={() => handleSend()}
          disabled={disabled}
        >
          &gt;
        </button>
      </div>
    </article>
  )
}
