'use client'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Loading from '@/app/loading'
import { CacheKey, ROUTES_APP } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { getCartService } from '@/services/cart-service'
import { getType, objectFromFormData } from '@/utils'
import CacheUtil from '@/utils/cache'

import CartEmptyPage from './_cart-empty/page'
import ProductSection from './_product-section/page'
import ShippingSection from './_shipping-section/page'
import SummarySection from './_summary-section/page'
import UserInfoSection from './_user-section/page'

const CartPage = () => {
  const [refreshCart, setRefreshCart] = useState(0)
  const { isLoading, response: cartData } = useFetch(getCartService, refreshCart)
  const [selectedItems, setSelectedItems] = useState([])
  const router = useRouter()

  const handleSelectItem = (e, product) => {
    if (e.target.checked === true)
      return setSelectedItems((prev) => prev.concat(`${product._id}-${product.variantId}-${product.variantOptionId}`))
    return setSelectedItems((prev) =>
      prev.filter((item) => item !== `${product._id}-${product.variantId}-${product.variantOptionId}`)
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = objectFromFormData(formData, ['cart-items'], (data) => {
      if (data === undefined) return
      const cloneData = JSON.parse(JSON.stringify(data))
      const transformCartItems = cloneData['cart-items'].map((item) => {
        const [variantInfo, quantity] = item.split(':')
        const [_id, name, variantId, variantOptionId, variantName, variantColor, mainImageUrl] = variantInfo.split('-')
        return {
          _id,
          name,
          mainImageUrl: window.atob(mainImageUrl),
          variantId,
          variantOptionId,
          variantName,
          variantColor,
          quantity: +quantity
        }
      })
      cloneData['cart-items'] = transformCartItems
      return cloneData
    })
    CacheUtil.setCachedData(CacheKey.checkout, payload)
    router.push(ROUTES_APP.CHECKOUT)
  }

  useEffect(() => {
    if (getType(cartData) === 'array')
      setSelectedItems(cartData.map((item) => `${item._id}-${item.variantId}-${item.variantOptionId}`))
  }, [cartData])

  if (isLoading === true && refreshCart === 0) return <Loading />
  if (cartData.length === 0) return <CartEmptyPage />
  return (
    <form className='w-[40svw] mx-auto p-3' onSubmit={handleSubmit}>
      <div className='flex items-center justify-between mb-3 text-xs'>
        <Link href='/' className='flex items-center gap-0.5 hover:underline'>
          <MdChevronLeft className='w-4 h-4' />
          <span>Về trang chủ</span>
        </Link>
        <span className='text-white'>Giỏ hàng của bạn</span>
      </div>
      <ProductSection
        cart={cartData}
        refreshCart={refreshCart}
        onRefreshCart={() => setRefreshCart((prev) => prev + 1)}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
      />
      <UserInfoSection />
      <ShippingSection />
      <SummarySection isSubmitable={selectedItems.length > 0} />
    </form>
  )
}

export default CartPage
