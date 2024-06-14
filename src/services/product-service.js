import { ResponseStatus } from '@/constants'
import { publicRequest } from '@/libs/axios'
import { getQueryString } from '@/utils'

export const getProductHomePageService = async () => {
  try {
    const response = await publicRequest.get('/product/list/home-page')
    const data = await response.data
    if (data.status !== ResponseStatus.success) throw new Error(data.message)
    return data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getProductByIdService = async (productId) => {
  try {
    const response = await publicRequest.get(`/product/${productId}`)
    const data = await response.data
    if (data.status !== ResponseStatus.success) throw new Error(data.message)
    return data.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export const getProductBySlugService = async (slug) => {
  try {
    const response = await publicRequest.get(`/product/detail/${slug}`)
    const data = await response.data
    if (data.status !== ResponseStatus.success) throw new Error(data.message)
    return data.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export const getProductListByCategoryService = async (queryOption) => {
  try {
    const queryString = getQueryString(queryOption)
    const response = await publicRequest.get(`/product/list?${queryString}`)
    const data = await response.data
    if (data.status !== ResponseStatus.success) throw new Error(data.message)
    return data.data
  } catch (error) {
    console.log(error)
    return []
  }
}
