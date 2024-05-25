'use client'
import React from 'react'
import { IoStar, IoStarHalfOutline, IoStarOutline } from 'react-icons/io5'
import clsx from 'clsx'

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

const StarsRating = ({
  ratedStarValue = 0,
  customStyle = '',
  sizeIcon = 60,
  isShowLabel = true,
  onRatingStar = null
}) => {
  return (
    <div className={clsx('flex flex-wrap gap-3', customStyle)}>
      {STAR_RATING.map((star) => {
        const isHalfStar = ratedStarValue > star.rating - 1 && ratedStarValue < star.rating
        return (
          <div
            key={star.id}
            className={clsx('flex flex-col cursor-pointer items-center', !onRatingStar && '!cursor-default')}
            onClick={() => onRatingStar && onRatingStar(star)}
          >
            {star.rating <= ratedStarValue ? (
              <IoStar size={sizeIcon} fill='#FF9F00' />
            ) : isHalfStar ? (
              <IoStarHalfOutline
                size={sizeIcon}
                fill='#FF9F00'
                stroke='#FF9F00'
                className={styles['star-icon-outline']}
              />
            ) : (
              <IoStarOutline size={sizeIcon} stroke='#FF9F00' className={styles['star-icon-outline']} />
            )}
            {isShowLabel && (
              <span
                className={clsx('text-[#757575] text-sm', {
                  ['text-[#FF9F00] font-bold']: Math.floor(ratedStarValue) === star.rating
                })}
              >
                {star.status}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StarsRating
