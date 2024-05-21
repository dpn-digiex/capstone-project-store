'use client'
import React, { useEffect, useRef, useState } from 'react'
import { GoShieldCheck } from 'react-icons/go'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'
import { IoCameraOutline } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
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
  const [images, setImages] = useState([])
  const [formReview, setFormReview] = useState({
    name: '',
    phone: '',
    feedback: '',
    willRefer: false
  })

  const fileInputRef = useRef(null)

  const handleRatingStar = (star) => {
    setRatedStar(star)
    setIsOpenModalRating(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ formReview })
  }

  const handleOpenFileBrowser = () => {
    fileInputRef.current.click()
  }

  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files)
    const currentImageCount = images.length
    const totalImageCount = currentImageCount + files.length

    if (totalImageCount > 3) {
      alert('You can only upload a maximum of 3 images')
      return
    }

    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setImages((prevImages) => [...prevImages, ...imageUrls])
  }

  useEffect(() => {
    if (!isOpenModalRating) {
      setImages([])
      setFormReview({
        name: '',
        phone: '',
        feedback: '',
        willRefer: false
      })
    }
  }, [isOpenModalRating])

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
          customStyle={'min-w-[300px]'}
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
                    <HiStar size={'3.125rem'} fill='#FF9F00' />
                  ) : (
                    <HiOutlineStar size={'3.125rem'} stroke='#FF9F00' strokeWidth={1} />
                  )}
                  <span
                    className={clsx('text-[#757575] text-xxs', {
                      ['text-[#FF9F00] font-[600]']: ratedStar?.rating === star.rating
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
              className='w-full text-xxs text-black p-2 border border-gray-200 rounded resize-none h-[100px] focus:outline-none placeholder-gray-500 rounded-[12px]'
              placeholder='Mời bạn chia sẻ thêm cảm nhận...'
              value={formReview.feedback}
              onChange={(e) => setFormReview({ ...formReview, feedback: e.target.value })}
            />
            <div className='flex items-start justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={formReview.willRefer}
                  onChange={(e) => setFormReview({ ...formReview, willRefer: e.target.checked })}
                />
                <span className='ml-1 text-black text-xxs'>Tôi sẽ giới thiệu sản phẩm cho bạn bè, người thân</span>
              </div>
              <div className='flex flex-col gap-1 pl-8'>
                <div className='flex items-center gap-1 cursor-pointer' onClick={handleOpenFileBrowser}>
                  <IoCameraOutline size={20} stroke='#0071e3' />
                  <p className='text-xxs text-[#0071e3] font-[500]'>
                    Gửi ảnh thực tế <span className='text-black font-[400]'>(Tối đa 3 ảnh)</span>
                  </p>
                </div>
                <div className='flex flex-wrap mt-[10px] gap-2'>
                  {images.map((image, index) => (
                    <div className='relative' key={index}>
                      <Image src={image} width={50} height={50} alt={`Selected ${index}`} className='object-contain' />
                      <div
                        className='absolute top-0 right-0 cursor-pointer'
                        onClick={() => setImages((prevImages) => prevImages.filter((_, i) => i !== index))}
                      >
                        <IoClose size={10} fill='#3e3e3e' />
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  multiple
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={handleChangeImage}
                />
              </div>
            </div>

            <div className='flex gap-3'>
              <input
                required
                type='text'
                className='w-full text-xxs text-black p-2 border border-gray-200 rounded-[12px] focus:outline-none placeholder-gray-500'
                placeholder='Họ tên (bắt buộc)'
                value={formReview.name}
                onChange={(e) => setFormReview({ ...formReview, name: e.target.value })}
              />
              <input
                required
                type='tel'
                className='w-full text-xxs text-black p-2 border border-gray-200 rounded-[12px] focus:outline-none placeholder-gray-500'
                placeholder='Số điện thoại (bắt buộc)'
                value={formReview.phone}
                onChange={(e) => setFormReview({ ...formReview, phone: e.target.value })}
              />
            </div>
            <div className='flex gap-1 items-center'>
              <GoShieldCheck fill='#00a650' size={14} />
              <span className='text-black text-xxs'>Cửa hàng cam kết bảo mật thông tin của bạn</span>
            </div>
            <button
              type='submit'
              className='w-full bg-blue p-2 rounded-[12px] hover:bg-blue-700 transition-colors h-[50px] text-xxs font-bold focus:outline-none'
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
