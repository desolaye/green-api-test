import { baseUrl } from '.'

export const sendMessage = async (
  id: string,
  token: string,
  chatId: string,
  message: string,
) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = JSON.stringify({ chatId: `${chatId}@c.us`, message })

    const response = await fetch(`${baseUrl}${id}/sendMessage/${token}`, {
      headers,
      method: 'POST',
      body,
    })

    const json = await response.json()
    return json
  } catch (err) {
    console.log(err)

    return 'Error'
  }
}
