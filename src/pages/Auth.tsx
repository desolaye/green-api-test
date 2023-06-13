import { useEffect, useState } from 'react'
import { AuthInput } from '../components'
import { useRecoilState } from 'recoil'
import { userStore } from '../store'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState({ status: false, message: '' })
  const [user, setUser] = useRecoilState(userStore)

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!(id && token)) {
      setError({ status: true, message: 'Заполните все поля' })
    } else {
      setUser({ id, token })
      navigate('/')
    }
  }

  useEffect(() => {
    if (error.status) {
      setError({ status: false, message: '' })
    }
  }, [id, token])

  return (
    <section className="bg-gradient-to-br from-primary to-secondary min-h-screen flex flex-col items-center justify-center gap-4 select-none">
      <img src="https://green-api.com.kz/green-api-logo_2.png" className="w-20" />
      <p className="text-white text-xl"> Войдите, чтобы всегда оставаться на связи</p>
      <article className="p-4 bg-white shadow-md rounded text-secondary">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="px-2">Ваш idInstance</label>
            <AuthInput onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="px-2">Ваш apiTokenInstance</label>
            <AuthInput type="password" onChange={(e) => setToken(e.target.value)} />
          </div>
          {error.status ? (
            <p className="text-red-500 text-center">{error.message}</p>
          ) : (
            <button className="text-lg">Войти</button>
          )}
        </form>
      </article>
    </section>
  )
}
