import { BASE_API_URL, LOCAL_STORE_ACCESS_TOKEN, LOCAL_STORE_CART, ResponseStatus } from '@/constants'
import { addToLocalCart, getLocalStore, getType, setLocalStore } from '@/utils'

export const getCartService = async () => {
  try {
    const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    if (isLoggedIn === null) {
      const localCart = getLocalStore(LOCAL_STORE_CART)
      if (getType(localCart) !== 'array') throw new Error('Invalid cart')
      return localCart
    }
    const response = await fetch(`${BASE_API_URL}/cart/get-list`, { method: 'GET', credentials: 'include' })
    const data = await response.json()
    if (data.status === ResponseStatus.error) throw new Error(data.message)

    if (getType(data.data) !== 'array') throw new Error('Invalid Cart')
    return data.data
  } catch (error) {
    return []
  }
}

export const addToCartService = async (product) => {
  try {
    const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    if (isLoggedIn === null) {
      return addToLocalCart(product)
    }
    const response = await fetch(`${BASE_API_URL}/cart/add`, { method: 'POST', credentials: 'include', body: product })
    const data = await response.json()
    if (data.status === ResponseStatus.error) throw new Error(data.message)

    if (getType(data.data) !== 'array') throw new Error('Invalid Cart')
    return data.data
  } catch (error) {
    return false
  }
}

export const removeCartItemService = async (productId) => {
  try {
    const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    if (isLoggedIn === null) {
      const localCart = getLocalStore(LOCAL_STORE_CART)
      if (getType(localCart) !== 'array') throw new Error('Invalid cart')

      const newLocalCart = localCart.filter((item) => item.id !== productId)
      setLocalStore(LOCAL_STORE_CART, newLocalCart)
      return true
    }

    const response = await fetch(`${BASE_API_URL}/cart/remove/${productId}`, { method: 'POST', credentials: 'include' })
    const data = await response.json()
    if (data.status === ResponseStatus.error) throw new Error(data.message)

    if (getType(data.data) !== 'boolean') throw new Error('Invalid Cart')
    return data.data
  } catch (error) {
    return false
  }
}
export const changeQuantityService = async (productId, quantity) => {
  const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
  if (isLoggedIn === null) {
    const localCart = getLocalStore(LOCAL_STORE_CART)
    if (getType(localCart) !== 'array') throw new Error('Invalid cart')

    const newLocalCart = localCart.map((item) => {
      if (item.id !== productId) return item
      return {
        ...item,
        quantity: quantity
      }
    })
    setLocalStore(LOCAL_STORE_CART, newLocalCart)
    return true
  }
  const response = await fetch(`${BASE_API_URL}/cart/update/${productId}`, {
    method: 'POST',
    credentials: 'include',
    body: { productId, quantity }
  })
  const data = await response.json()
  if (data.status === ResponseStatus.error) throw new Error(data.message)

  if (getType(data.data) !== 'boolean') throw new Error('Invalid Cart')
  return data.data
}
