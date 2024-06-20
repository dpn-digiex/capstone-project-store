import { LOCAL_STORE_CART } from '@/constants'
import { addToLocalCart, getLocalStore, getType, setLocalStore } from '@/utils'

export const getCartService = async () => {
  try {
    // const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    // if (isLoggedIn === null) {
    const localCart = getLocalStore(LOCAL_STORE_CART)
    if (getType(localCart) !== 'array') throw new Error('Invalid cart')
    return localCart
    // }
    // const response = await fetch(`${BASE_API_URL}/cart/get-list`, { method: 'GET' })
    // const data = await response.json()
    // if (data.status === ResponseStatus.error) throw new Error(data.message)

    // if (getType(data.data) !== 'array') throw new Error('Invalid Cart')
    // return data.data
  } catch (error) {
    return []
  }
}

export const addToCartService = async (product) => {
  try {
    // const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    // if (isLoggedIn === null) {
    return addToLocalCart(product)
    // }
    // const response = await fetch(`${BASE_API_URL}/cart/add`, { method: 'POST', body: product })
    // const data = await response.json()
    // if (data.status === ResponseStatus.error) throw new Error(data.message)

    // if (getType(data.data) !== 'array') throw new Error('Invalid Cart')
    // return data.data
  } catch (error) {
    return false
  }
}

export const removeCartItemService = async (product) => {
  try {
    // const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    // if (isLoggedIn === null) {
    const localCart = getLocalStore(LOCAL_STORE_CART)
    if (getType(localCart) !== 'array') throw new Error('Invalid cart')

    const newLocalCart = localCart.filter(
      (item) =>
        item.productId !== product.productId ||
        item.variantId !== product.variantId ||
        item.optionId !== product.optionId
    )
    setLocalStore(LOCAL_STORE_CART, newLocalCart)
    return true
    // }

    // const response = await fetch(`${BASE_API_URL}/cart/remove/${product.productId}`, {
    //   method: 'POST'
    // })
    // const data = await response.json()
    // if (data.status === ResponseStatus.error) throw new Error(data.message)

    // if (getType(data.data) !== 'boolean') throw new Error('Invalid Cart')
    // return data.data
  } catch (error) {
    return false
  }
}
export const changeQuantityService = async (product, quantity) => {
  try {
    console.log(product)
    // const isLoggedIn = getLocalStore(LOCAL_STORE_ACCESS_TOKEN)
    // if (isLoggedIn === null) {
    const localCart = getLocalStore(LOCAL_STORE_CART)
    if (getType(localCart) !== 'array') throw new Error('Invalid cart')

    const newLocalCart = localCart.map((item) => {
      if (
        item.productId === product.productId &&
        item.variantId === product.variantId &&
        item.optionId === product.optionId
      )
        return {
          ...item,
          quantity: quantity
        }
      return item
    })
    setLocalStore(LOCAL_STORE_CART, newLocalCart)
    return true
    // }
    // const response = await fetch(`${BASE_API_URL}/cart/update/${product.productId}`, {
    //   method: 'POST',

    //   body: { productId: product.productId, quantity }
    // })
    // const data = await response.json()
    // if (data.status === ResponseStatus.error) throw new Error(data.message)

    // if (getType(data.data) !== 'boolean') throw new Error('Invalid Cart')
    // return data.data
  } catch (error) {
    return false
  }
}
