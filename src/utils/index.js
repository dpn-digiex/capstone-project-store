import slugify from 'slugify'

export const convertSlugUrl = (str) => {
  return slugify(str, {
    lower: true,
    locale: 'vi'
  })
}

export const formatCurrency = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const getType = (value) => {
  const typeString = Object.prototype.toString.call(value).slice(8, -1)
  return typeString.toLowerCase()
}
