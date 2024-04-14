import React from 'react'
import { FaApple } from 'react-icons/fa'
import Link from 'next/link'

import Card from '@/components/card'
import Slider from '@/components/slider'
import { ROUTES_APP } from '@/constants'

const MacSection = async () => {
  const response = await fetch('http://localhost:3000/api/product', { cache: 'no-store' })
  const productList = await response.json()
  return (
    <div className=''>
      <Link href={ROUTES_APP.PRODUCT.MAC} className='flex items-end justify-center py-12'>
        <FaApple className='w-12 h-12' />
        <span className='text-3xl text-center'>Mac</span>
      </Link>
      <Slider>
        {productList.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            name={product.name}
            currentPrice={product.currentPrice}
            originPrice={product.originPrice}
            discount={product.discount}
            message={product.message}
          />
        ))}
      </Slider>
    </div>
  )
}

export default MacSection
