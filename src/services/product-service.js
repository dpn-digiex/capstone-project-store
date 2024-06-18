import { axiosInstance } from '@/libs/axios'
import { getQueryString } from '@/utils'

export const getProductHomePageService = async () => {
  try {
    const response = await axiosInstance.get('/product/list/home-page')
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getProductByIdService = async (productId) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export const getProductBySlugService = async (slug) => {
  try {
    const response = await axiosInstance.get(`/product/detail/${slug}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export const getProductListByCategoryService = async (queryOption) => {
  try {
    const queryString = getQueryString(queryOption)
    const response = await axiosInstance.get(`/product/list?${queryString}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
