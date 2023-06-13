import { baseUrl } from "."

export const getSettings = async (id: string, token: string) => {  
  try {
    const response = await fetch(`${baseUrl}${id}/getSettings/${token}`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
