'use client'
import React from 'react'
import { toast } from 'react-hot-toast'

import { CacheKey } from '@/constants'
import { addToCartService } from '@/services/cart-service'
import CacheUtil from '@/utils/cache'

const ButtonAddToCard = ({ productData = {}, disabled }) => {
  const handleAddToCard = async () => {
    try {
      const result = await addToCartService(productData)
      if (result) {
        CacheUtil.setCachedData(CacheKey.cart)
        toast.success('Add to cart successful')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <button type={'button'} className={'w-full'} onClick={handleAddToCard} disabled={disabled}>
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
