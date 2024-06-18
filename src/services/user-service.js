import axiosInstance from '@/libs/axios'

export const register = async ({ username, password, fullName, email, phoneNumber }) => {
  try {
    const body = { username, password, fullName, email, phoneNumber }
    const response = await axiosInstance.post('/user/register', body)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message || 'Đăng ký thất bại, vui lòng thử lại')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/user/login', { username, password })
    const { status, message, data } = response
    if (status !== 200) throw new Error(message || 'Đăng nhập thất bại, vui lòng thử lại')
    localStorage.setItem('accessToken', data.accessToken)
    axiosInstance.defaults.headers.common['x-access-token'] = data.accessToken
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const logout = async () => {
  try {
    localStorage.removeItem('accessToken')
    delete axiosInstance.defaults.headers.common['x-access-token']
    await axiosInstance.post('/user/logout')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/user/refresh-token')
    const { status, data } = response
    if (status !== 200) {
      await logout()
      window.location.href = '/dang-nhap'
      return false
    }
    localStorage.setItem('accessToken', data.accessToken)
    axiosInstance.defaults.headers.common['x-access-token'] = data.accessToken
    return true
  } catch (error) {
    console.log(error)
    await logout()
    window.location.href = '/dang-nhap'
    return false
  }
}
