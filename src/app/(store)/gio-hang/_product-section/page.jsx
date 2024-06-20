'use client'
import React, { useCallback, useEffect } from 'react'
import clsx from 'clsx'

import Loading from '@/app/loading'
import useFetch from '@/hooks/useFetch'
import { useAppStore } from '@/libs/zustand'
import { changeQuantityService, removeCartItemService } from '@/services/cart-service'
import { getVariantDetailService } from '@/services/product-service'
import { formatCurrency, getType } from '@/utils'

import CartItem from './_item/page'

const ProductSection = ({
  cart = [],
  refreshCart,
  onRefreshCart,
  selectedItems,
  onSelectItem,
  cartTotal = 0,
  setCartTotal
}) => {
  const { isLoading, response } = useFetch(() => getVariantDetailService(cart))
  const removeCartItem = useAppStore((state) => state.removeCartItem)
  useEffect(() => {
    if (getType(response) === 'array') {
      const total = cart.reduce((total, currentItem) => {
        const cartItem = response.find(
          (item) =>
            item.productId === currentItem.productId &&
            item.variantId === currentItem.variantId &&
            item.optionId === currentItem.optionId
        )

        const itemPrice = cartItem?.price
        return total + currentItem.quantity * itemPrice
      }, 0)
      setCartTotal?.(total)
    } else {
      setCartTotal?.(0)
    }
  }, [response, cart])

  const handleDeleteItem = async (product) => {
    try {
      const result = await removeCartItemService(product)
      if (result === true) {
        removeCartItem(product)
        onRefreshCart?.()
      }
    } catch (error) {
      return false
    }
  }
  const handleUpdateQuantity = useCallback(
    async (product, quantity) => {
      try {
        const result = await changeQuantityService(product, quantity)
        if (result) onRefreshCart?.()
      } catch (error) {
        console.log(error.message)
      }
    },
    [onRefreshCart]
  )

  if (isLoading === true && refreshCart === 0) return <Loading />
  return (
    <div className='p-6 bg-[#515965] rounded-t-lg shadow-lg'>
      <section>
        <div className='text-xs'>
          {cart.map((product, index) => {
            const mappedProduct =
              response.find(
                (item) =>
                  item.productId === product.productId &&
                  item.variantId === product.variantId &&
                  item.optionId === product.optionId
              ) ?? {}
            return (
              <CartItem
                key={'' + product.productId + product.variantId + product.optionId}
                onRemove={handleDeleteItem}
                product={{
                  ...product,
                  ...mappedProduct
                }}
                quantity={product?.quantity}
                className={clsx({ peer: index === 0 })}
                onUpdate={handleUpdateQuantity}
                selectedItems={selectedItems}
                onSelectItem={onSelectItem}
              />
            )
          })}
        </div>
        <div className='text-xs flex items-center justify-between'>
          <span>
            <strong className='font-bold'>Tạm tính</strong> ({cart.length} sản phẩm):
          </span>
          <strong className='text-[0.75rem]'>{formatCurrency(cartTotal)}</strong>
        </div>
      </section>
    </div>
  )
}

export default ProductSection
