import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  // withCredentials: true, // Needed for cookies,
  headers: {
    'Content-Type': 'application/json'
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
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Ensure this runs on client-side only
        if (typeof window !== 'undefined') {
          const { data } = await axiosInstance.post('/refresh-token')
          localStorage.setItem('accessToken', data.accessToken)
          axios.defaults.headers.common['x-access-token'] = data.accessToken
          return axiosInstance(originalRequest) // retry the original request
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use((config) => {
  // Ensure this runs on client-side only
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['x-access-token'] = token
    }
  }
  return config
})

export default axiosInstance
