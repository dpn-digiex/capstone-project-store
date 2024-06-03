'use client'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft } from 'react-icons/md'
import Link from 'next/link'

import Loading from '@/app/loading'
import useFetch from '@/hooks/useFetch'
import { getCartService } from '@/services/cart-service'
import { getType, objectFromFormData } from '@/utils'

import CartEmptyPage from './_cart-empty/page'
import ProductSection from './_product-section/page'
import ShippingSection from './_shipping-section/page'
import SummarySection from './_summary-section/page'
import UserInfoSection from './_user-section/page'

const CartPage = () => {
  const [refreshCart, setRefreshCart] = useState(0)
  const { isLoading, response: cartData } = useFetch(getCartService, refreshCart)
  const [selectedItems, setSelectedItems] = useState([])

  const handleSelectItem = (e, productId) => {
    if (e.target.checked === true) return setSelectedItems((prev) => prev.concat(productId))
    return setSelectedItems((prev) => prev.filter((itemId) => itemId !== productId))
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = objectFromFormData(formData, ['cart-items'], (data) => {
      if (data === undefined) return
      const cloneData = JSON.parse(JSON.stringify(data))
      const transformCartItems = cloneData['cart-items'].map((item) => {
        const [id, quantity] = item.split(':')
        return { id, quantity: +quantity }
      })
      cloneData['cart-items'] = transformCartItems
      return cloneData
    })
    console.log(payload)
  }

  useEffect(() => {
    if (getType(cartData) === 'array') setSelectedItems(cartData.map((item) => item.id))
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
