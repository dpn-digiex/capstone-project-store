import axios from 'axios'

import { refreshToken } from '@/services/user-service'
import { getLocalStore } from '@/utils'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Needed for cookies,
  headers: {
    // 'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': '*'
  }
})

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      status: response.status || 200,
      statusMessage: response.data?.status || '',
      message: response.data?.message || response.statusText || '',
      data: response.data?.data || response.data
    }
  },
  async (error) => {
    const actionLogout = error.response?.data?.actionLogout
    if (actionLogout) {
      if (typeof window !== 'undefined') {
        window.location.href = '/dang-nhap'
        delete axiosInstance.defaults.headers.common['x-access-token']
        localStorage.clear()
      }
      return
    }

    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Ensure this runs on client-side only
        if (typeof window !== 'undefined') {
          const response = await refreshToken()
          if (response) {
            return axiosInstance(originalRequest) // retry the original request
          }
        }
      } catch (err) {
        console.log('Error refreshing token: ', err)
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use((config) => {
  // Ensure this runs on client-side only
  if (typeof window !== 'undefined') {
    const token = getLocalStore('accessToken')
    if (token) {
      config.headers['x-access-token'] = token
    }
  }
  return config
})

export default axiosInstance
