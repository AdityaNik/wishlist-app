import { atom } from '@zedux/react'

export const userState = atom('userState', {
  isLoading: false,
  username: '',
  email: '',
})