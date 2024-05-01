import React from 'react'

import { formatCurrency } from '@/utils'

import CartItem from './_item/page'

const ProductSection = () => {
  return (
    <div className='p-6 bg-[#515965] rounded-t-lg shadow-lg'>
      <section>
        <div className='text-xs'>
          <CartItem
            image='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png'
            name='Iphone'
            price={29000000}
            className='peer'
          />
          <CartItem
            image='https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png'
            name='Iphone'
            price={29000000}
          />
        </div>
        <div className='text-xs flex items-center justify-between'>
          <span>
            <strong className='font-bold'>Tạm tính</strong> (2 sản phẩm):
          </span>
          <strong className='text-[0.75rem]'>{formatCurrency(58000000)}</strong>
        </div>
      </section>
    </div>
  )
}

export default ProductSection
