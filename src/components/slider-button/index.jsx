import React from 'react'
import clsx from 'clsx'
import { useSwiper } from 'swiper/react'

const SliderButton = ({ type, className, icon }) => {
  const swiper = useSwiper()
  const handleNavigate = () => {
    if (type === 'prev') return swiper.slidePrev()
    if (type === 'next') return swiper.slideNext()
  }
  return (
    <div
      role='button'
      onClick={handleNavigate}
      className={clsx(
        'p-3 bg-slate-500/25 absolute rounded-full top-1/2 -translate-y-1/2 z-50 hover:bg-slate-300/25',
        className
      )}
    >
      {icon}
    </div>
  )
}

export default SliderButton
