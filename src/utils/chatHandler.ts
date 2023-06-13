import { ChatModel, ReceiveNotificationModel } from '../models'

export const chatHandler = (chat: ChatModel | undefined, data: ReceiveNotificationModel) => {
  if (data.body.typeWebhook.includes('incoming') && data.body.messageData) {
    const chatId = data.body.senderData.chatId.split('@')[0]

    const message = {
      sender: chatId,
      textMessage: data.body.messageData.textMessageData.textMessage,
      timestamp: data.body.timestamp,
    }

    if (chat) {
      let updatedChat = {
        chatId: chat.chatId,
        messages: [...chat.messages, message],
      }

      return updatedChat
    } else {
      return {
        chatId,
        messages: [message],
      }
    }
  } else {
    return 'Error'
  }
}
