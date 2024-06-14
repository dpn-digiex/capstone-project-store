import slugify from 'slugify'

import { LOCAL_STORE_CART } from '@/constants'

import { ValidationError } from './errors'

export const convertSlugUrl = (str) => {
  return slugify(str, {
    lower: true,
    locale: 'vi'
  })
}

export const formatCurrency = (price) => {
  if (getType(price) !== 'number' || isNaN(price)) return 'Giá đang cập nhật...'
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

    const existingItem = localCart.find(
      (item) =>
        item._id === product._id &&
        item.variantId === product.variantId &&
        item.variantOptionId === product.variantOptionId
    )
    if (existingItem !== undefined) {
      const newCart = localCart.map((item) => {
        if (
          item._id === product._id &&
          item.variantId === product.variantId &&
          item.variantOptionId === product.variantOptionId
        )
          return { ...item, quantity: item.quantity + (product.quantity ?? 1) }
        return item
      })
      setLocalStore(LOCAL_STORE_CART, newCart)
    } else {
      const newCart = localCart.concat({
        _id: product._id,
        quantity: product.quantity ?? 1,
        variantId: product.variantId,
        variantOptionId: product.variantOptionId
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

export const validateInput = (input, compare = {}) => {
  if (input.value === '') return new ValidationError(input.name, 'Vui lòng nhập vào trường này!')
  switch (input.dataset.validateType) {
    case 'email': {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(input.value)) return new ValidationError(input.name, 'Email không đúng định dạng!')
      break
    }
    case 'password': {
      const lowerCaseTest = /(?=.*[a-z])/.test(input.value)
      const upperCaseTest = /(?=.*[A-Z])/.test(input.value)
      const digitTest = /(?=.*\d)/.test(input.value)
      const specialTest = /(?=.*[#$@!%&*?])/.test(input.value)

      if (!lowerCaseTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự chữ cái in thường')
      }
      if (!upperCaseTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự chữ cái in hoa')
      }
      if (!digitTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự số')
      }
      if (!specialTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt')
      }
      if (input.value.length < 8) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa tối thiểu 8 ký tự')
      }
      if (input.value.length > 30) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa tối đa 30 ký tự')
      }
      break
    }
    case 'confirm-password': {
      if (input.value !== compare.password) return new ValidationError(input.name, 'Mật khẩu không trùng khớp')
      break
    }
    default:
      return null
  }
  return null
}

export const getQueryString = (options = {}) => {
  const optionsType = getType(options)
  if (optionsType !== 'object') return ''
  const optionKeys = Object.keys(options)
  const queryString = optionKeys
    ?.reduce((previous, current) => (options[current] ? previous + `${current}=${options[current]}&` : previous), '')
    .slice(0, -1)
  return queryString
}
