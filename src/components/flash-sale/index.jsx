'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import flameImage from '@/assets/images/flame.png'
import flashSaleImage from '@/assets/images/flash-sale.png'
import useCountdown from '@/hooks/useCountdown'

import './index.style.css'

const ProductList = [
  {
    id: 1,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 2,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 3,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 4,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 5,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 6,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 7,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 8,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 9,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 10,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 11,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  },
  {
    id: 12,
    name: 'iPhone 16 PRO VIP',
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-blue-1-2-650x650.png',
    currentPrice: 12_000_000,
    originPrice: 15_000_000,
    discount: '20%',
    total: 50,
    remain: 24
  }
]

const FlashSale = ({ renderSize = 4 }) => {
  const [activeTab, setActiveTab] = useState('current')
  const { hours, minutes, seconds } = useCountdown()
  return (
    <div className='p-2'>
      <div className='bg-black/50 rounded-xl'>
        <div className='flex items-center justify-between'>
          <Image alt='Flash Sale' src={flashSaleImage} width={336} height={70} className='w-96' />
          <div className='flex flex-col items-center px-6'>
            <h4 className='uppercase'>Kết thúc trong</h4>
            <div className='flex items-center gap-2'>
              <p className='bg-black py-1 px-2.5 leading-none rounded'>{hours}</p>
              <span>:</span>
              <p className='bg-black py-1 px-2.5 leading-none rounded'>{minutes}</p>
              <span>:</span>
              <p className='bg-black py-1 px-2.5 leading-none rounded'>{seconds}</p>
            </div>
          </div>
          <div
            className={clsx('flex flex-col items-center px-6 cursor-pointer', {
              'tab-active': activeTab === 'current'
            })}
            onClick={() => setActiveTab('current')}
          >
            <h4 className='text-md'>Đang diễn ra</h4>
            <div className='flex items-center gap-2'>
              <p className='py-1 px-2.5 leading-none'>08:00 - 23:59</p>
            </div>
          </div>
          <div
            className={clsx('flex flex-col items-center px-6 cursor-pointer', { 'tab-active': activeTab === 'next' })}
            onClick={() => setActiveTab('next')}
          >
            <h4 className='text-md'>Ngày mai</h4>
            <div className='flex items-center gap-2'>
              <p className='py-1 px-2.5 leading-none'>08:00 - 23:59</p>
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={10}
          speed={200 * renderSize}
          slidesPerGroup={renderSize}
          slidesPerView={renderSize}
          className='p-[0.5rem!important]'
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{
            delay: 10000,
            pauseOnMouseEnter: true
          }}
        >
          {ProductList.map((product) => (
            <SwiperSlide key={product.id}>
              <Link className='card px-2 py-4 rounded-xl gap-2' href=''>
                <div className='flex flex-col gap-4 items-center'>
                  <Image
                    alt={product.name}
                    src={product.image}
                    width={250}
                    height={250}
                    priority
                    className='w-32 h-32 object-cover object-center'
                  />
                  <h3 className='text-[0.75rem] text-white text-center'>{product.name}</h3>
                </div>
                <div className='flex items-center justify-center flex-col'>
                  <span className='text-sm font-bold text-[#ff9f00]'>{product.currentPrice}</span>
                  <div className='flex items-center gap-1'>
                    <strike className='text-[0.7rem] text-white/25'>{product.originPrice}</strike>
                    <span className='block text-[0.7rem] bg-red-600 py-0.5 px-1 rounded'>{product.discount}</span>
                  </div>
                </div>
                <div className='relative isolate flex items-center justify-center bg-white/75 rounded-full'>
                  <Image alt='' src={flameImage} width={512} height={512} className='w-7 absolute left-0 bottom-0' />
                  <div className='text-[0.575rem] text-black'>
                    Còn {product.remain}/{product.total}
                  </div>
                  <div className='absolute h-full bg-[#fcb500] left-0 top-0 w-1/2 -z-10 rounded-tl-full rounded-bl-full' />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default FlashSale
