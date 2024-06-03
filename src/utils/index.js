import slugify from 'slugify'

import { LOCAL_STORE_CART } from '@/constants'

export const convertSlugUrl = (str) => {
  return slugify(str, {
    lower: true,
    locale: 'vi'
  })
}

export const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const getType = (value) => {
  const typeString = Object.prototype.toString.call(value).slice(8, -1)
  return typeString.toLowerCase()
}

export const setLocalStore = (key, value) => {
  const stringifiedValue = JSON.stringify(value ?? null)
  localStorage.setItem(key, stringifiedValue)
}

export const getLocalStore = (key) => {
  try {
    const localValue = localStorage.getItem(key)
    const value = JSON.parse(localValue ?? null)
    return value
  } catch (error) {
    return null
  }
}

export const addToLocalCart = (product) => {
  try {
    let localCart = getLocalStore(LOCAL_STORE_CART)
    if (getType(localCart) !== 'array') localCart = []

    const existingItem = localCart.find((item) => item.id === product.id)
    if (existingItem !== undefined) {
      const newCart = localCart.map((item) => {
        if (item.id !== product.id) return item
        return { ...item, quantity: item.quantity + (product.quantity ?? 1) }
      })
      setLocalStore(LOCAL_STORE_CART, newCart)
    } else {
      const newCart = localCart.concat({
        id: product.id,
        quantity: product.quantity ?? 1
      })
      setLocalStore(LOCAL_STORE_CART, newCart)
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export const objectFromFormData = (formData, multi = [], replacer) => {
  const objectData = {}
  for (const [key, value] of formData.entries()) {
    if (key in objectData) {
      // If the key already exists, it must be a multi-value checkbox
      objectData[key].push(value)
    } else {
      // Initialize with an array for the first occurrence
      objectData[key] = [value]
    }
  }
  // Convert single-value arrays to single values
  for (const key in objectData) {
    if (objectData[key].length === 1 && !multi.includes(key)) {
      objectData[key] = objectData[key][0]
    }
  }
  if (getType(replacer).includes('function')) return replacer(objectData)
  return objectData
}

export const getGenderTitle = (gender) => {
  if (!gender) return 'Anh/Chị'
  switch (gender.toLowerCase()) {
    case 'male':
      return 'Anh'
    case 'female':
      return 'Chị'
    default:
      return 'Anh/Chị'
  }
}
export const concatString = (...data) => {
  const address = data.reduce((result, item) => (item ? result.concat(item) : result), [])
  return address.join(', ')
}
