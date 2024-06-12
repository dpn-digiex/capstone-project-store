import { ResponseStatus } from '@/constants'
import { publicRequest } from '@/libs/axios'

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

export const getProductDetailService = async (productId) => {
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
