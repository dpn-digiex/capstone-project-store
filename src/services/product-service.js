import { ResponseStatus } from '@/constants'
import { getType } from '@/utils'

export const getProductDetailService = async (productId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`)

    const data = await response.json()
    if (data.status === ResponseStatus.error) throw new Error(data.message)

    if (getType(data.data) !== 'object') throw new Error('Invalid Product')
    return data.data
  } catch (error) {
    return {
      id: productId,
      image:
        'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
      name: 'Iphone',
      price: 29000000
    }
  }
}
