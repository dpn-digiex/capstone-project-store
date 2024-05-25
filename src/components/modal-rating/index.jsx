'use client'

import React, { useEffect, useRef, useState } from 'react'
import { GoShieldCheck } from 'react-icons/go'
import { IoCameraOutline } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'

import Modal from '@/components/modal'

import StarsRating from '../stars-rating'

const ModalRating = ({ productData = null, currentRatedValue = null, isOpenModal = false, setIsOpenModal }) => {
  const [ratedStar, setRatedStar] = useState(null)
  const [images, setImages] = useState([])
  const [formReview, setFormReview] = useState({
    name: '',
    phone: '',
    feedback: '',
    willRefer: false
  })

  useEffect(() => {
    setRatedStar(currentRatedValue)
  }, [])

  const fileInputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ formReview, rating: ratedStar?.rating, images })
  }

  const handleOpenFileBrowser = () => {
    fileInputRef.current.click()
  }

  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files)
    const currentImageCount = images.length
    const totalImageCount = currentImageCount + files.length

    if (totalImageCount > 3) {
      alert('Đăng tối đa 3 ảnh thực tế!')
      return
    }

    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setImages((prevImages) => [...prevImages, ...imageUrls])
  }

  const handleRatingStar = (star) => {
    setRatedStar(star)
  }

  return (
    <Modal onCloseModal={() => setIsOpenModal(false)} isOpen={isOpenModal} customStyle={'min-w-[300px]'}>
      <h1 className='text-black font-bold text-md text-center py-4 border-b-[#f5f5f5] border-b-[1px]'>
        Đánh giá sản phẩm
      </h1>
      <Image src={productData.image} alt='image-product' width={100} height={100} className='mx-auto' />
      <h2 className='font-bold text-center text-black text-lg line-clamp-3'>{productData.name}</h2>
      <div className='flex justify-center'>
        <StarsRating ratedStarValue={ratedStar?.rating} sizeIcon={'3.125rem'} onRatingStar={handleRatingStar} />
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
  )
}

export default ModalRating
