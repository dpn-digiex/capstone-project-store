'use client'
import React, { useCallback, useMemo } from 'react'
import clsx from 'clsx'

import Loading from '@/app/loading'
import useFetch from '@/hooks/useFetch'
import { changeQuantityService, removeCartItemService } from '@/services/cart-service'
import { getProductDetailService } from '@/services/product-service'
import { formatCurrency, getType } from '@/utils'

import CartItem from './_item/page'

const ProductSection = ({ cart = [], refreshCart, onRefreshCart, selectedItems, onSelectItem }) => {
  const { isLoading, response: productList } = useFetch(
    () => Promise.all(cart.map((item) => getProductDetailService(item.id))),
    cart
  )
  const cartTotal = useMemo(() => {
    if (getType(productList) === 'array') {
      return cart.reduce((total, currentItem) => {
        const itemPrice = productList.find((item) => item.id === currentItem.id)?.price ?? 0
        return total + currentItem.quantity * itemPrice
      }, 0)
    }
    return 0
  }, [productList, cart])

  const handleDeleteItem = async (productId) => {
    try {
      const result = await removeCartItemService(productId)
      if (result === true) {
        onRefreshCart?.()
      }
    } catch (error) {
      return false
    }
  }
  const handleUpdateQuantity = useCallback(
    async (productId, quantity) => {
      try {
        const result = await changeQuantityService(productId, quantity)
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
          {productList.map((product, index) => (
            <CartItem
              key={product.id}
              onRemove={handleDeleteItem}
              product={product}
              quantity={cart.find((item) => item.id === product.id)?.quantity}
              className={clsx({ peer: index === 0 })}
              onUpdate={handleUpdateQuantity}
              selectedItems={selectedItems}
              onSelectItem={onSelectItem}
            />
          ))}
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
