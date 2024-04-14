import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = [
      {
        id: 1,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 2,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 3,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 4,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 5,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 6,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 7,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 8,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 9,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      },
      {
        id: 10,
        image:
          'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
        name: 'iPhone 15 Pro Max',
        currentPrice: '29.890.000₫',
        originPrice: '34.990.000₫',
        discount: '-14%',
        message: 'Online giá rẻ quá'
      }
    ]
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
