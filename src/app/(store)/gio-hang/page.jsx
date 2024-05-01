import React from 'react'
import { MdChevronLeft } from 'react-icons/md'
import Link from 'next/link'

import ProductSection from './_product-section/page'
import ShippingSection from './_shipping-section/page'
import SummarySection from './_summary-section/page'
import UserInfoSection from './_user-section/page'

const CartPage = () => {
  return (
    <div className='w-[40svw] mx-auto p-3'>
      <div className='flex items-center justify-between mb-3 text-xs'>
        <Link href='/' className='flex items-center gap-0.5 hover:underline'>
          <MdChevronLeft className='w-4 h-4' />
          <span>Về trang chủ</span>
        </Link>
        <span className='text-white'>Giỏ hàng của bạn</span>
      </div>
      <ProductSection />
      <UserInfoSection />
      <ShippingSection />
      <SummarySection />
    </div>
  )
}

export default CartPage
