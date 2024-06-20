import { create } from 'zustand'

import { LOCAL_STORE_ACCESS_TOKEN, LOCAL_STORE_CART, LOCAL_STORE_USER } from '@/constants'
import { getLocalStore } from '@/utils'

export const useAppStore = create((set, get) => ({
  cart: getLocalStore(LOCAL_STORE_CART) ?? [],
  setCart: (cart) => set((state) => ({ ...state, cart: cart })),
  removeCartItem: (item) =>
    set((state) => ({
      ...state,
      cart: get().cart.filter((cartItem) => {
        const isSeletectedItem =
          cartItem.productId === item.productId &&
          cartItem.variantId === item.variantId &&
          cartItem.optionId === item.optionId
        return !isSeletectedItem
      })
    })),
  accessToken: getLocalStore(LOCAL_STORE_ACCESS_TOKEN),
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),

  user: getLocalStore(LOCAL_STORE_USER) ?? {},
  setUser: (user) => set((state) => ({ ...state, user: { ...state.user, ...user } }))
}))
