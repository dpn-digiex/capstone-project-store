'use client'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import flameImage from '@/assets/images/flame.png'
import flashSaleImage from '@/assets/images/flash-sale.png'
import useCountdown from '@/hooks/useCountdown'
import { getProductListByCategoryService } from '@/services/product-service'
import { formatCurrency } from '@/utils'

import './index.style.css'

import SliderButton from '../slider-button'

const FlashSale = ({ renderSize = 4 }) => {
  const [productList, setProductList] = useState([])
  const [activeTab, setActiveTab] = useState('current')
  const { hours, minutes, seconds } = useCountdown()

  useEffect(() => {
    fetchFlashSaleProducts()
  }, [])

  const fetchFlashSaleProducts = async () => {
    const categoryIdMac = '6666db9d500c89405c4d45f5'
    const response = await getProductListByCategoryService({
      page_number: 1,
      page_size: 20,
      category_id: categoryIdMac
    })
    const variantItems = response.products.map((product) => {
      const variantProduct = product.variants[0].options[0]
      return {
        id: product._id,
        name: product.name,
        variantId: product.variants[0]?._id,
        optionId: variantProduct?._id,
        redirectUrl: `/mac/${product.slug}`,
        slug: product.slug,
        image: product.mainImageUrl,
        currentPrice: +(variantProduct.price - (variantProduct.price * variantProduct.discount) / 100).toFixed(0),
        originPrice: variantProduct.price,
        discount: `${variantProduct.discount}%`,
        total: variantProduct.inventory,
        remain: variantProduct.inventory - variantProduct.soldCount
      }
    })
    setProductList(variantItems)
  }

  return (
    <div className='p-2'>
      <div className='bg-black/50 rounded-xl'>
        <div className='flex items-center justify-between'>
          <Image alt='Flash Sale' src={flashSaleImage} width={336} height={70} className='w-96' />
          <div className='flex flex-col items-center px-6'>
            <h4 className='uppercase'>Kết thúc trong</h4>
            <div className='flex items-center gap-2'>
              <p className='bg-black py-1 px-2.5 leading-none rounded'>{hours}</p>
              <span>:</span>
              <p className='bg-black py-1 px-2.5 leading-none rounded'>{minutes}</p>
              <span>:</span>
              <p className='bg-black py-1 px-2.5 leading-none rounded'>{seconds}</p>
            </div>
          </div>
          <div
            className={clsx('flex flex-col items-center px-6 cursor-pointer', {
              'tab-active': activeTab === 'current'
            })}
            onClick={() => setActiveTab('current')}
          >
            <h4 className='text-md'>Đang diễn ra</h4>
            <div className='flex items-center gap-2'>
              <p className='py-1 px-2.5 leading-none'>08:00 - 23:59</p>
            </div>
          </div>
          <div
            className={clsx('flex flex-col items-center px-6 cursor-pointer', { 'tab-active': activeTab === 'next' })}
            onClick={() => setActiveTab('next')}
          >
            <h4 className='text-md'>Ngày mai</h4>
            <div className='flex items-center gap-2'>
              <p className='py-1 px-2.5 leading-none'>08:00 - 23:59</p>
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={10}
          speed={200 * renderSize}
          slidesPerGroup={renderSize}
          slidesPerView={renderSize}
          className='p-[0.5rem!important] relative'
          modules={[Navigation, Autoplay]}
          loop
          autoplay={{
            delay: 10000,
            pauseOnMouseEnter: true
          }}
        >
          <SliderButton type='prev' icon={<FaArrowLeft className='w-4 h-4' />} className='left-0' />
          {productList.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                className='bg-[#323232] flex flex-col justify-between cursor-pointer px-2 py-4 rounded-xl gap-2 h-[284px]'
                href={product?.redirectUrl || ''}
              >
                <div>
                  <div className='flex flex-col gap-4 items-center'>
                    <Image
                      alt={product.name}
                      src={product.image}
                      width={250}
                      height={250}
                      priority
                      className='w-32 h-32 object-cover object-center'
                    />
                    <h3 className='text-[0.75rem] text-white text-center'>{product.name}</h3>
                  </div>
                  <div className='flex items-center justify-center flex-col'>
                    <span className='text-sm font-bold text-[#ff9f00]'>{formatCurrency(product.currentPrice)}</span>
                    <div className='flex items-center gap-1'>
                      <strike className='text-[0.7rem] text-white/25'>{formatCurrency(product.originPrice)}</strike>
                      <span className='block text-[0.7rem] bg-red-600 py-0.5 px-1 rounded'>{product.discount}</span>
                    </div>
                  </div>
                </div>

                <div className='relative isolate flex items-center justify-center bg-white/75 rounded-full'>
                  <Image alt='' src={flameImage} width={512} height={512} className='w-7 absolute left-0 bottom-0' />
                  <div className='text-[0.575rem] text-black'>
                    Còn {product.remain}/{product.total}
                  </div>
                  <div
                    className='absolute h-full bg-[#fcb500] left-0 top-0 -z-10 rounded-full rounded-bl-full'
                    style={{
                      width: `${(product.remain / product.total) * 100}%`
                    }}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <SliderButton type='next' icon={<FaArrowRight className='w-4 h-4' />} className='right-0' />
        </Swiper>
      </div>
    </div>
  )
}

export default FlashSale
