'use client'
import React from 'react'

const ButtonAddToCard = ({ productData = '' }) => {
  const handleAddToCard = () => {
    console.log('Add to card', productData)
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
