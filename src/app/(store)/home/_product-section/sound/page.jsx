import React from 'react'
import { FaApple } from 'react-icons/fa'
import Link from 'next/link'

import Card from '@/components/card'
import Slider from '@/components/slider'
import { ROUTES_APP } from '@/constants'

const SoundSection = async ({ productList = [] }) => {
  return (
    <div className=''>
      <Link href={ROUTES_APP.PRODUCT.SOUND} className='flex items-end justify-center py-12'>
        <FaApple className='w-12 h-12' />
        <span className='text-3xl text-center'>Tai nghe, Loa</span>
      </Link>
      <Slider>
        {productList.map((product) => (
          <Card
            key={product._id}
            image={product.mainImageUrl}
            name={product.name}
            currentPrice={product.currentPrice}
            originPrice={product.price}
            discount={product.discount}
            message={product.message}
            redirectUrl={`/am-thanh/${product.slug}`}
          />
        ))}
      </Slider>
    </div>
  )
}

export default SoundSection
