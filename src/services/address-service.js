import axiosInstance from '@/libs/axios'
import { getQueryString } from '@/utils'

export const getAddressInfo = async (option) => {
  try {
    const queryString = getQueryString(option)
    const response = await axiosInstance.get(`/delivery/address?${queryString}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)

    return data.data ?? data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getTransferFee = async (option) => {
  try {
    const queryString = getQueryString(option)
    const response = await axiosInstance.get(`/delivery/transfer-fee?${queryString}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)

    return data.data ?? data
  } catch (error) {
    console.log(error)
    return null
  }
}
