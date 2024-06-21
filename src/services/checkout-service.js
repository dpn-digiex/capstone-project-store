import axiosInstance from '@/libs/axios'

export const createOrder = async (payload) => {
  try {
    const response = await axiosInstance.post('/order/add', payload)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
export const getOrderDetail = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/order/${orderId}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getOrderList = async () => {
  try {
    const response = await axiosInstance.get(`/order/list`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
