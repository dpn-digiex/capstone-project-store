import { publicRequest } from '@/libs/axios'

export const getCategoryListService = async () => {
  try {
    const response = await publicRequest.get('/product/category/list')
    const data = await response.data
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
