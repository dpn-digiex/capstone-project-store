'use client'
import React, { useState } from 'react'

import ModalRating from '../modal-rating'
import StarsRating from '../stars-rating'

import styles from './index.module.css'

const Reviews = ({ productData = null }) => {
  const [ratedStar, setRatedStar] = useState(null)
  const [isOpenModalRating, setIsOpenModalRating] = useState(false)

  const handleRatingStar = (star) => {
    setRatedStar(star)
    setIsOpenModalRating(true)
  }

  return (
    <section className={styles['reviews-section']}>
      <div className='mx-auto max-w-[780px] p-7 border-solid border-[1px] border-[#e5e5e5] rounded-[12px]'>
        <h1 className='font-bold text-[1.5rem] text-center text-black'>Đánh giá sản phẩm này</h1>
        <h2 className='text-[#757575] text-sm text-center break-words line-clamp-3 my-4 mx-[5rem]'>
          Nếu đã mua sản phẩm này tại TopZone. Hãy đánh giá ngay để giúp hàng ngàn người chọn mua hàng tốt nhất bạn nhé!
        </h2>
        <div className='flex justify-center'>
          <StarsRating ratedStarValue={ratedStar?.rating} sizeIcon={'3.75rem'} onRatingStar={handleRatingStar} />
        </div>
      </div>

      {isOpenModalRating && (
        <ModalRating
          productData={productData}
          currentRatedValue={ratedStar}
          isOpenModal={isOpenModalRating}
          setIsOpenModal={setIsOpenModalRating}
        />
      )}
    </section>
  )
}

export default Reviews
