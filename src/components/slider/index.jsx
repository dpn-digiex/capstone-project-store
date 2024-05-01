'use client'
import React, { Children, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

import SliderButton from '../slider-button'

const Slider = ({ renderSize = 4, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <Swiper
      spaceBetween={20}
      speed={200 * renderSize}
      slidesPerGroup={renderSize}
      slidesPerView={renderSize}
      className='p-[0.5rem!important] relative'
      modules={[Navigation]}
      onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
    >
      {currentSlide > 0 && <SliderButton type='prev' icon={<FaArrowLeft className='w-4 h-4' />} className='left-0' />}
      {Children.map(children, (child) => (
        <SwiperSlide className='!h-auto z-1'>{child}</SwiperSlide>
      ))}
      {currentSlide < Math.max(0, children.length - renderSize) && (
        <SliderButton type='next' icon={<FaArrowRight className='w-4 h-4' />} className='right-0' />
      )}
    </Swiper>
  )
}

export default Slider
