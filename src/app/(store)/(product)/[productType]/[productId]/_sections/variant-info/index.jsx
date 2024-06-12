'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import ButtonLink from '@/components/button-link'
import { formatCurrency } from '@/utils'

import ButtonAddToCard from '../../components/btnAddToCard'
import ListColors from '../list-colors'
import ListVariants from '../list-variants'

const VariantInfo = ({ product = {} }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find((variant) => variant.isDefault === true)
  )
  const [selectedColor, setSelectedColor] = useState(selectedVariant?.options?.[0])

  return (
    <>
      <div className='flex flex-wrap gap-2'>
        <span className='text-[1.5rem] font-bold'>{formatCurrency(selectedVariant?.options?.[0]?.price)}</span>
        {selectedVariant?.options?.[0]?.discount ? (
          <span className='text-[1.375rem] line-through'>
            {formatCurrency(selectedVariant?.options?.[0]?.price * (1 - selectedVariant?.options?.[0]?.discount / 100))}
          </span>
        ) : null}
        {selectedVariant?.options?.[0]?.discount > 0 ? (
          <span className='text-[1.375rem]'>{`${selectedVariant?.options?.[0]?.discount}%`}</span>
        ) : null}
      </div>
      {product.variants?.length > 0 && (
        <ListVariants
          list={product.variants}
          selectedVariant={selectedVariant}
          setSelectedVariant={(variant) => {
            setSelectedVariant(variant)
            setSelectedColor(variant.options?.[0])
          }}
        />
      )}
      {selectedVariant?.options?.length > 0 && (
        <ListColors list={selectedVariant?.options} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      )}
      <div className='flex flex-col bg-[#2f3033] p-4 rounded-[10px]'>
        <p className='text-sm font-bold'>Khuyễn mãi</p>
        <p className='text-xs'>Giá và khuyến mãi dự kiến áp dụng đến 23:00 | 01/05</p>
        <div className='border-b-[1px] border-solid border-[#414141] my-2' />
        <li className='text-xs'>
          Nhập mã VNPAYTGDD2 giảm ngay 1% (tối đa 200.000đ) khi thanh toán qua VNPAY-QR, áp dụng cho đơn hàng từ 3 Triệu
          <Link href='/' className='text-skyBlue cursor-pointer'>
            (Xem chi tiết tại đây)
          </Link>
        </li>
      </div>

      <div className='flex gap-4'>
        <ButtonLink
          href='/thanh-toan'
          customStyle={'w-full'}
          customStyleText='text-[1rem] !font-bold'
          mode='primary'
          isDisabled={selectedVariant === undefined && selectedColor === undefined}
        >
          Mua ngay
        </ButtonLink>

        <ButtonAddToCard
          productData={{
            _id: product._id,
            quantity: 1,
            variantId: selectedVariant?._id,
            variantOptionId: selectedColor?._id
          }}
          disabled={selectedVariant === undefined && selectedColor === undefined}
        />
      </div>
    </>
  )
}

export default VariantInfo
