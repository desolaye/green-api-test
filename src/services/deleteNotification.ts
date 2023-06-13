import { baseUrl } from '.'
import { DeleteNotificationModel } from '../models'

export const deleteNotification = async (
  id: string,
  token: string,
  recipientId: number,
) => {
  try {
    const method = 'DELETE'
    const response = await fetch(
      `${baseUrl}${id}/deleteNotification/${token}/${recipientId}`,
      { method },
    )

    const json: DeleteNotificationModel = await response.json()
    return json
  } catch (err) {
    console.error(err)
    return 'Error'
  }
}
