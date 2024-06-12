'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { formatCurrency } from '@/utils'

const concatString = (connector, ...stringList) => {
  return stringList.join(connector)
}

const CartItem = ({ product = {}, quantity = 0, className, onRemove, onUpdate, selectedItems = [], onSelectItem }) => {
  const [productQuantity, setProductQuantity] = useState(quantity)
  const isFirstRender = useRef(true)
  const previousQuantity = useRef(productQuantity)

  const handleSelectItem = (e, product) => {
    onSelectItem?.(e, product)
  }
  const handleInputQuantity = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '')
    if (newValue <= 0) {
      return setProductQuantity(1)
    }
    setProductQuantity(Number(newValue))
  }
  const handleChangeQuantity = (type) => {
    return function () {
      if (type === 'increase') return setProductQuantity((prevQuantity) => prevQuantity + 1)
      if (type === 'decrease') return setProductQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
    }
  }

  useEffect(() => {
    if (isFirstRender.current)
      return () => {
        isFirstRender.current = false
      }
    if (previousQuantity.current !== productQuantity) {
      const timerId = setTimeout(() => {
        onUpdate?.(product, productQuantity)
        previousQuantity.current = productQuantity
      }, 500)

      return () => {
        clearTimeout(timerId)
      }
    }
  }, [productQuantity, onUpdate, product])

  return (
    <div
      className={clsx(
        'flex items-start gap-2',
        className,
        'py-2 peer-[]:border-t-[0.0625rem] peer-[]:border-slate-500'
      )}
    >
      <input
        type='checkbox'
        // name='cart-item-id'
        value={`${product._id}-${product.variantId}-${product.variantOptionId}`}
        checked={selectedItems.includes(`${product._id}-${product.variantId}-${product.variantOptionId}`)}
        className='w-4 h-4 accent-sky-400'
        onChange={(e) => handleSelectItem(e, product)}
      />
      <div className='flex flex-col items-center gap-1'>
        <Image
          src={product.mainImageUrl}
          alt={product.name}
          width={90}
          height={160}
          className='object-cover object-center w-auto h-auto'
        />
        <div
          className='flex items-center gap-0.5 justify-center bg-slate-400/50 rounded px-1 cursor-pointer'
          onClick={() => onRemove(product)}
        >
          <IoIosClose />
          <span className='text-white/50 text-[0.675rem]'>Xóa</span>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex items-center justify-between text-xs'>
          <h3>{product.name}</h3>
          <span className='font-bold'>{formatCurrency(product.variant?.option?.price)}</span>
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
          <div className='flex items-center gap-1'>
            <span>Mẫu:</span>
            <span>
              {product.variant?.variant?.name} - Màu {product.variant?.option?.color}
            </span>
          </div>
          <div className='inline-flex items-center justify-center shadow-lg'>
            <button
              className={clsx(
                'h-8 bg-slate-500 border border-solid border-slate-400 outline-none',
                'w-8 cursor-pointer flex items-center justify-center rounded-l-md'
              )}
              type='button'
              onClick={handleChangeQuantity('decrease')}
            >
              -
            </button>
            <input
              className={clsx(
                'h-8 bg-slate-500 border border-solid border-slate-400 outline-none',
                'w-12 cursor-text text-center'
              )}
              value={productQuantity}
              onChange={handleInputQuantity}
            />
            {selectedItems.includes(`${product._id}-${product.variantId}-${product.variantOptionId}`) ? (
              <input
                type='hidden'
                value={concatString(
                  ':',
                  concatString(
                    '-',
                    product._id,
                    product.name,
                    product.variantId,
                    product.variantOptionId,
                    product.variant?.variant?.name,
                    product.variant?.option?.color,
                    window.btoa(product.mainImageUrl)
                  ),
                  productQuantity
                )}
                name='cart-items'
              />
            ) : null}
            <button
              className={clsx(
                'h-8 bg-slate-500 border border-solid border-slate-400 outline-none',
                'w-8 cursor-pointer flex items-center justify-center rounded-r-md'
              )}
              type='button'
              onClick={handleChangeQuantity('increase')}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
