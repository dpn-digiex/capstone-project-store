'use client'
import React, { useCallback, useMemo } from 'react'
import clsx from 'clsx'

import Loading from '@/app/loading'
import useFetch from '@/hooks/useFetch'
import { changeQuantityService, removeCartItemService } from '@/services/cart-service'
import { getProductByIdService } from '@/services/product-service'
import { formatCurrency, getType } from '@/utils'

import CartItem from './_item/page'

const getVariant = (variantId, variantOptionId, product) => {
  const selectedVariant = product.variants?.find((variant) => variant._id === variantId)
  const selectedOption = selectedVariant?.options?.find((option) => option._id === variantOptionId)
  return { variant: selectedVariant, option: selectedOption }
}

const ProductSection = ({ cart = [], refreshCart, onRefreshCart, selectedItems, onSelectItem }) => {
  const { isLoading, response: productList } = useFetch(
    () => Promise.all(cart.map((item) => getProductByIdService(item._id))),
    cart
  )
  const cartTotal = useMemo(() => {
    if (getType(productList) === 'array') {
      return cart.reduce((total, currentItem) => {
        const cartItem = productList.find((item) => item._id === currentItem._id)
        const selectedVariant = cartItem?.variants?.find((variant) =>
          cart.some((item) => item.variantId === variant._id)
        )
        const selectedVariantOption = selectedVariant?.options?.find((option) =>
          cart.some((item) => item.variantOptionId === option._id)
        )
        const itemPrice = selectedVariantOption?.price
        return total + currentItem.quantity * itemPrice
      }, 0)
    }
    return 0
  }, [productList, cart])

  const handleDeleteItem = async (product) => {
    try {
      const result = await removeCartItemService(product)
      if (result === true) {
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
          {cart.map((product, index) => (
            <CartItem
              key={'' + product._id + product.variantId + product.variantOptionId}
              onRemove={handleDeleteItem}
              product={{
                ...product,
                ...productList.find((item) => item._id === product._id),
                variant: getVariant(
                  product.variantId,
                  product.variantOptionId,
                  productList.find((item) => item._id === product._id)
                )
              }}
              quantity={product?.quantity}
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
