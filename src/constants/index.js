export const ROUTES_APP = {
  ROOT: '/',
  HOME_PAGE: '/trang-chu',
  PRODUCT: {
    IPHONE: '/iphone',
    MAC: '/mac',
    IPAD: '/ipad',
    WATCH: '/apple-watch',
    SOUND: '/am-thanh',
    ACCESSORIES: '/phu-kien'
  },
  BLOG: '/blog',
  CART: '/gio-hang',
  CHECKOUT: '/thanh-toan'
}

export const USER_API = {
  SIGNIN: '/auth/signin',
  LOGOUT: '/auth/logout'
}

export const LOCAL_STORE_CART = 'APP_CART'
export const LOCAL_STORE_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'

export const BASE_API_URL = process.env.NEXT_APP_API_DOMAIN ?? 'http://localhost:2800/api/v1'

export const ResponseStatus = {
  success: 'Success',
  error: 'Error'
}
export const CacheKey = {
  cart: 'CART',
  checkout: 'CHECKOUT'
}
