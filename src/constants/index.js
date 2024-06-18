import { FaClipboardList } from 'react-icons/fa'
import { MdLocationOn, MdLock, MdPerson, MdPhoto } from 'react-icons/md'

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
  CHECKOUT: '/thanh-toan',
  SIGN_IN: '/dang-nhap',
  SIGN_UP: '/dang-ky',
  PROFILE: '/trang-ca-nhan'
}

export const USER_API = {
  SIGNIN: '/auth/signin',
  LOGOUT: '/auth/logout'
}

export const LOCAL_STORE_CART = 'APP_CART'
export const LOCAL_STORE_ACCESS_TOKEN = 'accessToken'

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_END_POINT ?? 'http://localhost:2800/api/v1'

export const ResponseStatus = {
  success: 'success',
  error: 'error'
}
export const CacheKey = {
  cart: 'CART',
  checkout: 'CHECKOUT',
  category: 'CATEGORY'
}
export const PROFILE_MENU = [
  {
    id: 'personal',
    title: 'Thông tin tài khoản',
    path: `${ROUTES_APP.PROFILE}/thong-tin-tai-khoan`,
    icon: <MdPerson size={24} />
  },
  {
    id: 'shipping-address',
    title: 'Địa chỉ nhận hàng',
    path: `${ROUTES_APP.PROFILE}/dia-chi-nhan-hang`,
    icon: <MdLocationOn size={24} />
  },
  {
    id: 'shopping-history',
    title: 'Đơn đặt hàng',
    path: `${ROUTES_APP.PROFILE}/don-dat-hang`,
    icon: <FaClipboardList size={24} />
  },
  {
    id: 'change-password',
    title: 'Đổi mật khẩu',
    path: `${ROUTES_APP.PROFILE}/doi-mat-khau`,
    icon: <MdLock size={24} />
  },
  {
    id: 'avatar',
    title: 'Ảnh đại diện',
    path: `${ROUTES_APP.PROFILE}/anh-dai-dien`,
    icon: <MdPhoto size={24} />
  }
]
