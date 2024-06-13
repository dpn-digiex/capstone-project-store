'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CacheKey } from '@/constants'
import { concatString, formatCurrency, getGenderTitle } from '@/utils'
import CacheUtil from '@/utils/cache'

import PaymentMethods from './_payment-methods/page'

const CheckoutPage = () => {
  const checkoutData = CacheUtil.getCachedData(CacheKey.checkout) ?? {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form className='w-[40svw] mx-auto p-3' onSubmit={handleSubmit}>
      <div className='bg-[#656e7d] p-3 flex items-center justify-center rounded-t-lg'>
        <h3 className='text-[#26cf77] font-bold text-center text-sm'>Đặt hàng thành công</h3>
      </div>
      <div className='bg-[#515965] px-6 py-3 rounded-b-lg flex flex-col gap-3'>
        <p className='text-sm'>
          Cảm ơn {getGenderTitle(checkoutData['customer-gender'])} <strong>{checkoutData['customer-name']}</strong> đã
          cho P2T cơ hội được phục vụ.
        </p>
        <div className='bg-slate-500 p-3 rounded-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center gap-1'>
              <span className='font-bold text-sm'>Đơn hàng:</span>
              <span className='text-sky-300 text-sm'>#82410063</span>
            </div>
            <div className='flex items-center gap-2'>
              <Link className='text-sky-300 text-sm hover:underline' href='#'>
                Quản lý đơn hàng
              </Link>
              <button className='text-red-300 text-sm'>Hủy</button>
            </div>
          </div>
          <ul className='flex flex-col gap-1 p-2 list-disc list-inside text-sm'>
            <li>
              <div className='inline-flex items-center gap-1'>
                <span className='font-bold'>Người nhận:</span>
                <span>{getGenderTitle(checkoutData['receiver-gender'] ?? checkoutData['customer-gender'])}</span>
                <span>{checkoutData['receiver-name'] ?? checkoutData['customer-name']},</span>
                <span>{checkoutData['receiver-phone'] ?? checkoutData['customer-phone']}</span>
              </div>
            </li>
            <li>
              <div className='inline-flex items-center gap-1'>
                <span className='font-bold'>Giao đến:</span>
                <span>
                  {concatString(
                    checkoutData['shipping-province'],
                    checkoutData['shipping-district'],
                    checkoutData['shipping-commune'],
                    checkoutData['shipping-street']
                  )}
                </span>
                <span>(nhân viên sẽ gọi trước khi giao).</span>
              </div>
            </li>
            <li>
              <div className='inline-flex items-center gap-1'>
                <span className='font-bold'>Tổng tiền: {formatCurrency(checkoutData['total'])}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className='text-md p-3 border border-dashed border-red-400 rounded-md bg-red-400/15'>
          <p className='text-center text-red-300'>Đơn hàng chưa được thanh toán</p>
        </div>
        <div className='p-3'>
          <PaymentMethods />
        </div>
        <div className='p-3 border-t border-solid border-slate-400'>
          <div className='text-sm flex flex-col gap-3'>
            <div className='flex items-center gap-1'>
              <span className='font-bold'>Thời gian nhận hàng:</span>
              <span className=''>Giao trước 14h00 ngày 04/06/2024</span>
            </div>
            <div className='p-2 rounded-md border border-solid border-slate-400 flex flex-col'>
              {checkoutData['cart-items']?.map((item) => (
                <div key={'' + item._id + item.variantId + item.variantOptionId} className='flex gap-2 py-2 peer'>
                  <Image src={item.mainImageUrl} alt={item.name} width={80} height={120} />
                  <div className='flex flex-col gap-2'>
                    <span>
                      {item.name} - {item.variantName}
                    </span>
                    <span>Màu: {item.variantColor}</span>
                    <span>Số lượng: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CheckoutPage
