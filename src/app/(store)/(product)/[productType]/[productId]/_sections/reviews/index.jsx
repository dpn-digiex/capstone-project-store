'use client'
import React, { useState } from 'react'
import { GoShieldCheck } from 'react-icons/go'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'
import { IoCameraOutline } from 'react-icons/io5'
import clsx from 'clsx'
import Image from 'next/image'

import Modal from '@/components/modal'

import styles from './index.module.css'

const STAR_RATING = [
  {
    id: 'rating-1',
    rating: 1,
    status: 'Rất tệ'
  },
  {
    id: 'rating-2',
    rating: 2,
    status: 'Tệ'
  },
  {
    id: 'rating-3',
    rating: 3,
    status: 'Tạm ổn'
  },
  {
    id: 'rating-4',
    rating: 4,
    status: 'Tốt'
  },
  {
    id: 'rating-5',
    rating: 5,
    status: 'Rất tốt'
  }
]

const Reviews = ({ productData = null }) => {
  const [ratedStar, setRatedStar] = useState(null)
  const [isOpenModalRating, setIsOpenModalRating] = useState(false)
  const [formReview, setFormReview] = useState({
    name: '',
    phone: '',
    feedback: '',
    willRefer: false
  })

  const handleRatingStar = (star) => {
    setRatedStar(star)
    setIsOpenModalRating(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ formReview })
  }

  return (
    <section className={styles['reviews-section']}>
      <div className='mx-auto max-w-[780px] p-7 border-solid border-[1px] border-[#e5e5e5] rounded-[12px]'>
        <h1 className='font-bold text-[1.5rem] text-center'>Đánh giá sản phẩm này</h1>
        <h2 className='text-[#757575] text-sm text-center break-words line-clamp-3 my-4 mx-[5rem]'>
          Nếu đã mua sản phẩm này tại TopZone. Hãy đánh giá ngay để giúp hàng ngàn người chọn mua hàng tốt nhất bạn nhé!
        </h2>
        <div className='flex flex-wrap w-full justify-center gap-2'>
          {STAR_RATING.map((star) => {
            return (
              <div
                key={star.id}
                className='flex flex-col cursor-pointer items-center'
                onClick={() => handleRatingStar(star)}
              >
                {star.rating <= ratedStar?.rating ? (
                  <HiStar size={60} fill='#FF9F00' />
                ) : (
                  <HiOutlineStar size={60} stroke='#FF9F00' strokeWidth={1} />
                )}
                <span
                  className={clsx('text-[#757575] text-sm', {
                    ['text-[#FF9F00] font-bold']: ratedStar?.rating === star.rating
                  })}
                >
                  {star.status}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {isOpenModalRating && (
        <Modal
          onCloseModal={() => setIsOpenModalRating(false)}
          isOpen={isOpenModalRating}
          customStyle={'min-w-[700px]'}
        >
          <h1 className='text-black font-bold text-md text-center py-4 border-b-[#f5f5f5] border-b-[1px]'>
            Đánh giá sản phẩm
          </h1>
          <Image src={productData.image} alt='image-product' width={100} height={100} className='mx-auto' />
          <h2 className='font-bold text-center text-black text-lg line-clamp-3'>{productData.name}</h2>
          <div className='flex flex-wrap w-full justify-center gap-2'>
            {STAR_RATING.map((star) => {
              return (
                <div
                  key={star.id}
                  className='flex flex-col cursor-pointer items-center'
                  onClick={() => handleRatingStar(star)}
                >
                  {star.rating <= ratedStar?.rating ? (
                    <HiStar size={50} fill='#FF9F00' />
                  ) : (
                    <HiOutlineStar size={50} stroke='#FF9F00' strokeWidth={1} />
                  )}
                  <span
                    className={clsx('text-[#757575] text-xs', {
                      ['text-[#FF9F00] font-[500']: ratedStar?.rating === star.rating
                    })}
                  >
                    {star.status}
                  </span>
                </div>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className='w-full mx-auto p-4 flex flex-col gap-3'>
            <textarea
              className='w-full text-xs text-black p-2 border border-gray-200 rounded resize-none h-[100px] focus:outline-none placeholder-gray-500 rounded-[12px]'
              placeholder='Mời bạn chia sẻ thêm cảm nhận...'
              value={formReview.feedback}
              onChange={(e) => setFormReview({ ...formReview, feedback: e.target.value })}
            />
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={formReview.willRefer}
                  onChange={(e) => setFormReview({ ...formReview, willRefer: e.target.checked })}
                />
                <span className='ml-1 text-black text-xs'>Tôi sẽ giới thiệu sản phẩm cho bạn bè, người thân</span>
              </div>
              <div className='flex items-center cursor-pointer gap-1 pl-8'>
                <IoCameraOutline size={20} stroke='#0071e3' />
                <p className='text-xs text-[#0071e3]'>
                  Gửi ảnh thực tế <span className='text-black'>(Tối đa 3 ảnh)</span>
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <input
                required
                type='text'
                className='w-full text-xs text-black p-2 border border-gray-200 rounded-[12px] focus:outline-none placeholder-gray-500'
                placeholder='Họ tên (bắt buộc)'
                value={formReview.name}
                onChange={(e) => setFormReview({ ...formReview, name: e.target.value })}
              />
              <input
                required
                type='tel'
                className='w-full text-xs text-black p-2 border border-gray-200 rounded-[12px] focus:outline-none placeholder-gray-500'
                placeholder='Số điện thoại (bắt buộc)'
                value={formReview.phone}
                onChange={(e) => setFormReview({ ...formReview, phone: e.target.value })}
              />
            </div>
            <div className='flex gap-1 items-center'>
              <GoShieldCheck fill='#00a650' size={14} />
              <span className='text-black text-xs'>Cửa hàng cam kết bảo mật thông tin của bạn</span>
            </div>
            <button
              type='submit'
              className='w-full bg-blue p-2 rounded-[12px] hover:bg-blue-700 transition-colors h-[50px] text-xs font-bold focus:outline-none'
            >
              Gửi đánh giá
            </button>
          </form>
        </Modal>
      )}
    </section>
  )
}

export default Reviews
