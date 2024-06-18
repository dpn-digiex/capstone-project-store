import { create } from 'zustand'

import { LOCAL_STORE_ACCESS_TOKEN } from '@/constants'
import { getLocalStore } from '@/utils'

export const useAppStore = create((set) => ({
  cart: [],
  setCart: (cart) => set((state) => ({ ...state, cart: cart })),
  accessToken: getLocalStore(LOCAL_STORE_ACCESS_TOKEN),
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token }))
}))
