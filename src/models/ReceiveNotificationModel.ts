export interface ReceiveNotificationModel {
  receiptId: number
  body: {
    typeWebhook: string
    messageData?: {
      typeMessage: string
      textMessageData: {
        textMessage: string
      }
    }
    senderData: {
      chatId: string
    }
    chatId?: string
    idMessage: string
    timestamp: number
  }
}
