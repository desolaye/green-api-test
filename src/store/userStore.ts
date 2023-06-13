import { atom } from 'recoil'

export const userStore = atom({
  key: 'userState',
  default: {
    id: '',
    token: '',
  },
})
