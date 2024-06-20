'use client'
import React from 'react'
import { toast } from 'react-hot-toast'

import { useAppStore } from '@/libs/zustand'
import { addToCartService } from '@/services/cart-service'

const ButtonAddToCard = ({ productData = {}, disabled }) => {
  const setCart = useAppStore((state) => state.setCart)
  const handleAddToCard = async () => {
    try {
      const result = await addToCartService(productData)
      if (result) {
        setCart(result)
        console.log(result)
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
