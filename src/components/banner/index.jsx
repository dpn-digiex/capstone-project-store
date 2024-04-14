'use client'
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/pagination'

import SliderButton from '../slider-button'

const Banner = ({ banners }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      className='relative'
      autoplay
      loop
      pagination={{
        clickable: true,
        bulletClass: 'inline-block w-0 h-0 p-1.5 m-1 cursor-pointer bg-slate-500/50 rounded-full'
      }}
      modules={[Autoplay, Navigation, Pagination]}
    >
      <SliderButton type='prev' icon={<FaArrowLeft className='w-4 h-4' />} className='left-0 translate-x-full' />
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Image alt='Banner' src={banner.image} width={1440} height={400} className='w-full' />
        </SwiperSlide>
      ))}
      <SliderButton type='next' icon={<FaArrowRight className='w-4 h-4' />} className='right-0 -translate-x-full' />
    </Swiper>
  )
}

export default Banner
