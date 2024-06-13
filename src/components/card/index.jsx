'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { formatCurrency, getType } from '@/utils'

import './index.style.css'

const Card = ({
  image,
  name,
  currentPrice,
  originPrice,
  discount,
  message,
  redirectUrl = '',
  imageClass,
  variants
}) => {
  const [selectedVariant] = useState(getType(variants) === 'array' ? variants[0] : {})
  return (
    <Link className='card p-8 rounded-3xl h-full' href={redirectUrl}>
      <div className='flex flex-col gap-6 items-center'>
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
        <span className='text-md font-bold'>
          {formatCurrency(
            currentPrice ?? selectedVariant?.options?.[0]?.price * (1 - selectedVariant?.options?.[0]?.discount / 100)
          )}
        </span>
        {selectedVariant?.options?.[0]?.discount ? (
          <strike className='text-[0.75rem]'>
            {formatCurrency(originPrice ?? selectedVariant.options?.[0]?.price)}
          </strike>
        ) : null}
        {selectedVariant?.options?.[0]?.discount > 0 ? <small className='text-[0.75rem]'>{discount}</small> : null}
      </div>
      <p className='text-[#ff9f00] text-center text-sm'>{message}</p>
    </Link>
  )
}

export default Card
