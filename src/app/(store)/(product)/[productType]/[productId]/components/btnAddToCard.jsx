'use client'
import React from 'react'

import { CacheKey } from '@/constants'
import { addToCartService } from '@/services/cart-service'
import CacheUtil from '@/utils/cache'

const ButtonAddToCard = ({ productData = {} }) => {
  const handleAddToCard = async () => {
    try {
      const result = await addToCartService(productData)
      if (result) CacheUtil.setCachedData(CacheKey.cart)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <button type={'button'} className={'w-full'} onClick={handleAddToCard}>
      <div
        className={
          'cursor-pointer flex px-6 h-[60px] justify-center items-center bg-[#0071e3] hover:bg-skyBlue rounded-[12px]'
        }
      >
        <p className={'whitespace-nowrap overflow-hidden text-ellipsis text-xs font-medium text-white'}>
          Thêm vào giỏ hàng
        </p>
      </div>
    </button>
  )
}

export default ButtonAddToCard