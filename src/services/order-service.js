import { axiosInstance } from '@/libs/axios'

export const updateOrderStatus = async (orderId, request) => {
  try {
    const response = await axiosInstance.patch(`/order/admin/update/${orderId}`, request)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return false
  }
}
