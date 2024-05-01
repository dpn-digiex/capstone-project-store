'use client'
import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import Select from '@/components/select'
import { formatCurrency } from '@/utils'

const CartItem = ({ image = '', name = '', price = 0, variants = [], className }) => {
  return (
    <div
      className={clsx(
        'flex items-start gap-2',
        className,
        'py-2 peer-[]:border-t-[0.0625rem] peer-[]:border-slate-500'
      )}
    >
      <Image src={image} alt={name} width={90} height={160} className='object-cover object-center w-auto h-auto' />
      <div className='flex-1'>
        <div className='flex items-center justify-between text-xs'>
          <h3>{name}</h3>
          <span className='font-bold'>{formatCurrency(price)}</span>
        </div>
        <div className='text-[0.75rem] list-disc mt-2'>
          <span className='list-item list-inside'>
            Nhập mã VNPAYTGDD2 giảm ngay 1% (tối đa 200.000đ) khi thanh toán qua VNPAY-QR, áp dụng cho đơn hàng từ 3
            Triệu{' '}
            <Link href='#' className='text-sky-500 hover:underline'>
              (Xem chi tiết tại đây)
            </Link>
          </span>
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <Select
            className='text-xs w-fit'
            options={variants}
            placeholder='Chọn mẫu'
            emptyPlaceholder='Không có dữ liệu'
          />
          <div>Action</div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
