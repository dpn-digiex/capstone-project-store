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
