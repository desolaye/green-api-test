import { baseUrl } from '.'
import { ReceiveNotificationModel } from '../models'

export const receiveNotification = async (id: string, token: string) => {
  try {
    const response = await fetch(`${baseUrl}${id}/receiveNotification/${token}`)
    const json: ReceiveNotificationModel | null = await response.json()
    return json
  } catch (err) {
    return 'Error'
  }
}
