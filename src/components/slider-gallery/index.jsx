'use client'
import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import clsx from 'clsx'
import Image from 'next/image'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './styles.css'

import SliderButton from '../slider-button'

const THUMBS_PER_VIEW = 6

const SliderGallery = ({ listImg = [], thumbsPerView = THUMBS_PER_VIEW }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentThumbSlide, setCurrentThumbSlide] = useState(0)

  return (
    <div id='slider-gallery' className='flex flex-col'>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='p-[0.5rem!important] relative'
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
      >
        {currentSlide > 0 && <SliderButton type='prev' icon={<FaArrowLeft className='w-4 h-4' />} className='left-0' />}
        {listImg.map((item, index) => (
          <SwiperSlide key={index}>
            <Image src={item} alt='slide-thumb' width={500} height={500} />
          </SwiperSlide>
        ))}
        {currentSlide < listImg.length - 1 && (
          <SliderButton type='next' icon={<FaArrowRight className='w-4 h-4' />} className='right-2' />
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={'0.5rem'}
        slidesPerView={thumbsPerView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='p-[0.5rem!important] relative'
        onSlideChange={(swiper) => setCurrentThumbSlide(swiper.activeIndex)}
      >
        {currentThumbSlide > 0 && (
          <SliderButton type='prev' icon={<FaArrowLeft className='w-4 h-4' />} className='left-0' />
        )}
        {listImg.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={clsx(
                'bg-white w-20 h-20 flex items-center justify-center border-[3px] border-solid rounded-[10px] cursor-pointer',
                { 'border-skyBlue': currentSlide === index }
              )}
            >
              <Image src={item} alt='slide-thumb' width={68} height={68} />
            </div>
          </SwiperSlide>
        ))}
        {currentThumbSlide < listImg.length - thumbsPerView && (
          <SliderButton type='next' icon={<FaArrowRight className='w-4 h-4' />} className='right-2' />
        )}
      </Swiper>
    </div>
  )
}

export default SliderGallery
