import { create } from 'zustand'

import { LOCAL_STORE_ACCESS_TOKEN, LOCAL_STORE_CART } from '@/constants'
import { getLocalStore } from '@/utils'

export const useAppStore = create((set, get) => ({
  cart: getLocalStore(LOCAL_STORE_CART),
  setCart: (cart) => set((state) => ({ ...state, cart: cart })),
  removeCartItem: (item) =>
    set((state) => ({
      ...state,
      cart: get().cart.filter((cartItem) => {
        const isSeletectedItem =
          cartItem._id === item._id &&
          cartItem.variantId === item.variantId &&
          cartItem.variantOptionId === item.variantOptionId
        return !isSeletectedItem
      })
    })),
  accessToken: getLocalStore(LOCAL_STORE_ACCESS_TOKEN),
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token }))
}))
