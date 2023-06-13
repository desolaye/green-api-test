export interface ChatModel {
  chatId: string
  messages: {
    sender: string
    textMessage: string
    timestamp: number
  }[]
}
