'use client'
import React, { Children } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

const Slider = ({ renderSize = 4, children }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={renderSize}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className='p-[0.5rem!important]'
      navigation={true}
      modules={[Navigation]}
    >
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
