import React from 'react'
import Link from 'next/link'

import AddressCard from './_address-card'

const ShippingAddress = () => {
  return (
    <div className='flex flex-col gap-4'>
      {/* <p className='text-lg text-white/25 text-center'>Chưa có địa chỉ giao hàng</p> */}
      <AddressCard />
      <div className='w-full text-center'>
        <Link
          href='dia-chi-nhan-hang/them-dia-chi'
          className='btn rounded-md border-none bg-sky-500 text-white text-sm'
        >
          Thêm địa chỉ
        </Link>
      </div>
    </div>
  )
}

export default ShippingAddress
