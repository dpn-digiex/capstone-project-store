'use client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdChevronLeft } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Loading from '@/app/loading'
import { LOCAL_STORE_CACHE_ROUTE, ROUTES_APP } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { useAppStore } from '@/libs/zustand'
import { getCartService, removeCartItemService } from '@/services/cart-service'
import { createOrder } from '@/services/checkout-service'
import { getVariantDetailService } from '@/services/product-service'
import { getType, setLocalStore } from '@/utils'

import CartEmptyPage from './_cart-empty/page'
import ProductSection from './_product-section/page'
import ShippingSection from './_shipping-section/page'
import SummarySection from './_summary-section/page'
import UserInfoSection from './_user-section/page'

const CartPage = () => {
  const [address, setAddress] = useState({
    provinceId: -1,
    districtId: -1,
    wardId: -1,
    provinceName: '',
    districtName: '',
    wardName: '',
    detailAddress: ''
  })
  const [cartTotal, setCartTotal] = useState(0)
  const [transferFee, setTransferFee] = useState(0)
  const [refreshCart, setRefreshCart] = useState(0)
  const { isLoading, response: cartData } = useFetch(getCartService, refreshCart)
  const [selectedItems, setSelectedItems] = useState([])
  const router = useRouter()
  const user = useAppStore((state) => state.user)
  const accessToken = useAppStore((state) => state.accessToken)
  const removeCartItem = useAppStore((state) => state.removeCartItem)

  const handleSelectItem = (e, product) => {
    if (e.target.checked === true) return setSelectedItems((prev) => prev.concat(product))
    return setSelectedItems((prev) =>
      prev.filter((item) => {
        const isProduct =
          item.productId === product.productId &&
          item.variantId === product.variantId &&
          item.optionId === product.optionId
        return !isProduct
      })
    )
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!accessToken) {
        toast.error('Vui lòng đăng nhập để tiếp tục')
        setLocalStore(LOCAL_STORE_CACHE_ROUTE, ROUTES_APP.CART)
        return router.push(ROUTES_APP.SIGN_IN)
      }
      const formData = new FormData(e.target)
      const payload = {
        customerId: user._id ?? null,
        customerGender: formData.get('customerGender'),
        customerName: formData.get('customerName'),
        customerEmail: formData.get('customerEmail'),
        customerPhone: formData.get('customerPhone'),
        items: selectedItems,
        delivery: { ...address, transferFee },
        note: formData.get('note')
      }
      const response = await createOrder(payload)
      await Promise.all(
        selectedItems.map((item) => {
          removeCartItem(item)
          return removeCartItemService(item)
        })
      )
      router.push(`${ROUTES_APP.CHECKOUT}?id=${response._id}`)
    } catch (error) {
      console.log(error)
      toast.error('Xảy ra lỗi, vui lòng thử lại.')
    }
  }

  useEffect(() => {
    const getProductList = async () => {
      try {
        const response = await getVariantDetailService(cartData)
        setSelectedItems(
          response.map((product) => {
            const itemInCart = cartData.find(
              (item) =>
                item.productId === product.productId &&
                item.variantId === product.variantId &&
                item.optionId === product.optionId
            )
            return { ...product, quantity: itemInCart.quantity }
          })
        )
      } catch (error) {
        console.log(error)
      }
    }
    if (getType(cartData) === 'array') getProductList()
  }, [cartData])

  useEffect(() => {
    localStorage.removeItem(LOCAL_STORE_CACHE_ROUTE)
  }, [])

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
        cartTotal={cartTotal}
        setCartTotal={setCartTotal}
      />
      <UserInfoSection user={user} />
      <ShippingSection address={address} setAddress={setAddress} setTransferFee={setTransferFee} />
      <SummarySection isSubmitable={selectedItems.length > 0} total={cartTotal} transferFee={transferFee} />
    </form>
  )
}

export default CartPage
