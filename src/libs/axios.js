import axios from 'axios'
export const privateRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT
})
export const publicRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT
})
