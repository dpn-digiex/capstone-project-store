import { axiosInstance } from '@/libs/axios'

export const getPaymentLink = async (request) => {
  try {
    const response = await axiosInstance.post('/payment/create-link', request)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
