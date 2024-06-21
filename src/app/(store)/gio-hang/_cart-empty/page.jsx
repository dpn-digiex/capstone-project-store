import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import emptyCartImage from '@/assets/images/cart-empty.png'

const CartEmptyPage = () => {
  return (
    <div className='w-[40svw] mx-auto p-3 min-h-[76vh] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image src={emptyCartImage} alt='Empty Cart' width={360} className='object-cover object-center' />
        <p className='text-sm text-white/75'>Giỏ hàng của bạn chưa có sản phẩm nào!</p>
        <Link href='/home' className='bg-[#0071e3] hover:bg-skyBlue rounded-[12px] px-6 py-3'>
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}

export default CartEmptyPage
