'use client'

import { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import Image from 'next/image'
import Link from 'next/link'

import ButtonLink from '@/components/button-link'
import CheckBox from '@/components/checkbox'
import Slider from '@/components/slider'
import { formatCurrency } from '@/utils'

const SIMILAR_PRODUCTS = [
  {
    id: 'product01',
    name: 'Macbook Air M1 2020 13 inch 256GB',
    price: 24900000,
    currentPrice: 21900000,
    discount: 12,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/44/231244/s16/mac-air-m1-13-xam-new-650x650.png'
  },
  {
    id: 'product02',
    name: 'Macbook Pro M1 2020 13 inch 256GB',
    price: 12900000,
    currentPrice: 7700000,
    discount: 40,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/44/318228/s16/mac-topzone-spacegray-650x650.png'
  },
  {
    id: 'product03',
    name: 'Macbook Air M2 2021 13 inch 256GB',
    price: 24900000,
    currentPrice: 16900000,
    discount: 32,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/44/282827/s16/mac-air-m2-13-vang-new-650x650.png'
  },
  {
    id: 'product04',
    name: 'Macbook Air M1 2020 15 inch 512GB',
    price: 12900000,
    currentPrice: 7700000,
    discount: 40,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/44/322939/s16/mac-air-15-bac-new-650x650.png'
  },
  {
    id: 'product05',
    name: 'Macbook Air M3 2024 15 inch 512GB',
    price: 24900000,
    currentPrice: 16900000,
    discount: 32,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/44/322635/s16/macbook-air-15-inch-m3-2024-xanh-650x650.png'
  }
]

const RAW_DATA_SUGGESTIONS = [
  {
    id: 'product01',
    name: 'Adapter Sạc Magsafe 85W cho MacBook',
    price: 2490000,
    currentPrice: 2190000,
    discount: 12,
    image:
      'https://cdn.tgdd.vn/Products/Images/9499/92798/s16/adapter-sac-macbook-pro-15-inch-17-inch-magsafe-85-mc556-thumb1-650x650.png'
  },
  {
    id: 'product02',
    name: 'Cáp USB-C Thunderbolt 3 Apple',
    price: 1290000,
    currentPrice: 770000,
    discount: 40,
    image: 'https://cdn.tgdd.vn/Products/Images/58/156780/s16/125-650x650.png'
  },
  {
    id: 'product03',
    name: 'Magic Mouse',
    price: 2490000,
    currentPrice: 1690000,
    discount: 32,
    image: 'https://cdn.tgdd.vn/Products/Images/86/251787/s16/1-650x650.png'
  },
  {
    id: 'product04',
    name: 'Cáp USB-C Thunderbolt 3 Apple',
    price: 1290000,
    currentPrice: 770000,
    discount: 40,
    image: 'https://cdn.tgdd.vn/Products/Images/58/156780/s16/125-650x650.png'
  },
  {
    id: 'product05',
    name: 'Magic Mouse',
    price: 2490000,
    currentPrice: 1690000,
    discount: 32,
    image: 'https://cdn.tgdd.vn/Products/Images/86/251787/s16/1-650x650.png'
  }
]

const Suggestions = ({ productId = '', productData = null }) => {
  const [suggestions, setSuggestions] = useState([])
  const [checkedProducts, setCheckedProducts] = useState([])
  const [orderInfo, setOrderInfo] = useState({
    totalPrice: 0,
    totalProducts: 1
  })

  useEffect(() => {
    fetchProductSuggestions(productId)
    setOrderInfo({ totalPrice: productData.currentPrice, totalProducts: 1 })
  }, [])

  const fetchProductSuggestions = async () => {
    setSuggestions(RAW_DATA_SUGGESTIONS)
  }

  const handleSelectProduct = (product) => {
    if (checkedProducts.findIndex((item) => item.id === product.id) !== -1) {
      setCheckedProducts(checkedProducts.filter((item) => item.id !== product.id))
      setOrderInfo((prev) => ({
        ...prev,
        totalPrice: prev.totalPrice - product.currentPrice,
        totalProducts: prev.totalProducts - 1
      }))
    } else {
      setCheckedProducts([...checkedProducts, product])
      setOrderInfo((prev) => ({
        ...prev,
        totalPrice: prev.totalPrice + product.currentPrice,
        totalProducts: prev.totalProducts + 1
      }))
    }
  }

  return (
    <section className='py-8 bg-white'>
      <div className='container'>
        <div className='w-full flex flex-col'>
          <h1 className='text-[1.5rem] font-bold mb-8 text-black'>Phụ kiện gợi ý cho MacBook</h1>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='w-1/5 flex items-center justify-between'>
              <div className='flex flex-col items-center gap-1'>
                <Image src={productData.mainImageUrl} alt='image-product' width={170} height={170} />
                <p className='text-sm text-center break-words line-clamp-3 text-black'>{productData.name}</p>
                {/* <p className='text-md font-bold text-black'>{formatCurrency(productData.currentPrice)}</p>
                <div className='flex gap-2'>
                  <p className='text-sm text-[#323232] line-through'>{formatCurrency(productData.price)}</p>
                  <p className='text-sm text-[#323232]'>{productData.discount}%</p>
                </div> */}
              </div>
              <LuPlus size={32} stroke='#A1A5A8' />
            </div>
            <div className='w-3/5 h-full px-4'>
              <Slider renderSize={3}>
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className='relative cursor-pointer flex flex-col py-4 px-2 items-center gap-1 border-[1px] border-[#e5e5e5] rounded-[10px] h-full'
                    onClick={() => handleSelectProduct(product)}
                  >
                    <Image src={product.image} alt='image-product' width={150} height={150} />
                    <p className='text-sm text-center break-words line-clamp-3 text-black'>{product.name}</p>
                    <p className='text-md font-bold text-black'>{formatCurrency(product.currentPrice)}</p>
                    <div className='flex gap-2'>
                      <p className='text-sm text-[#323232] line-through'>{formatCurrency(product.price)}</p>
                      <p className='text-sm text-[#323232]'>{product.discount}%</p>
                    </div>
                    <div className='absolute top-2 left-2'>
                      <CheckBox checked={checkedProducts.findIndex((item) => item.id === product.id) !== -1} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className='w-1/5 flex flex-col items-center justify-center gap-4'>
              <p className='text-md font-bold text-black'>{formatCurrency(orderInfo.totalPrice)}</p>
              <ButtonLink isDisabled={checkedProducts.length === 0} mode='primary'>
                {`Mua ${orderInfo.totalProducts} sản phẩm`}
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col'>
          <h1 className='text-[1.5rem] font-bold mt-8 text-black'>Xem thêm các sản phẩm Macbook khác</h1>
          <div className='w-full'>
            <Slider renderSize={4}>
              {SIMILAR_PRODUCTS.map((product) => (
                <Link href={`/store/product/accessories/${product.id}`} key={product.id}>
                  <div
                    key={product.id}
                    className='cursor-pointer flex flex-col py-4 px-2 items-center gap-1 h-full'
                    onClick={() => handleSelectProduct(product)}
                  >
                    <Image src={product.image} alt='image-product' width={150} height={150} />
                    <p className='text-sm text-center break-words line-clamp-3 text-black'>{product.name}</p>
                    <div className='flex gap-2'>
                      <p className='text-md font-bold text-black'>{formatCurrency(product.currentPrice)}</p>
                      <p className='text-sm text-[#323232] line-through'>{formatCurrency(product.price)}</p>
                      <p className='text-sm text-[#323232]'>{product.discount}%</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Suggestions
