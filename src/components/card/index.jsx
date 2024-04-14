import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import './index.style.css'

const Card = ({ image, name, currentPrice, originPrice, discount, message, imageClass }) => {
  return (
    <Link className='card' href=''>
      <div className='flex flex-col gap-6'>
        <Image
          alt={name}
          src={image}
          width={250}
          height={250}
          priority
          className={clsx('w-48 h-48 object-cover object-center', imageClass)}
        />
        <h3 className='text-base text-white text-center'>{name}</h3>
      </div>
      <div className='flex items-center gap-1.5 justify-center mt-5'>
        <span className='text-base font-bold'>{currentPrice}</span>
        <strike className='text-sm'>{originPrice}</strike>
        <small>{discount}</small>
      </div>
      <p className='text-[#ff9f00] text-center text-sm'>{message}</p>
    </Link>
  )
}

export default Card
