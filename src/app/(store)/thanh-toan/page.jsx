'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import Loading from '@/app/loading'
import { LOCAL_STORE_ACCESS_TOKEN, LOCAL_STORE_USER, ROUTES_APP } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { useAppStore } from '@/libs/zustand'
import { getOrderDetail } from '@/services/checkout-service'
import { concatString, formatCurrency, getGenderTitle } from '@/utils'

import PaymentMethods from './_payment-methods/page'

const CheckoutPage = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const { isLoading, response } = useFetch(() => getOrderDetail(orderId))
  const accessToken = useAppStore((state) => state.accessToken)
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      localStorage.removeItem(LOCAL_STORE_ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORE_USER)
      router.push(ROUTES_APP.SIGN_IN)
    }
  }, [accessToken, router])
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  if (isLoading) return <Loading />
  return (
    <form className='w-[40svw] mx-auto p-3' onSubmit={handleSubmit}>
      <div className='bg-[#656e7d] p-3 flex items-center justify-center rounded-t-lg'>
        <h3 className='text-[#26cf77] font-bold text-center text-sm'>Đặt hàng thành công</h3>
      </div>
      <div className='bg-[#515965] px-6 py-3 rounded-b-lg flex flex-col gap-3'>
        <p className='text-sm'>
          Cảm ơn {getGenderTitle(response.customerGender)} <strong>{response.customerName}</strong> đã cho PTT cơ hội
          được phục vụ.
        </p>
        <div className='bg-slate-500 p-3 rounded-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center gap-1'>
              <span className='font-bold text-sm'>Đơn hàng:</span>
              <span className='text-sky-300 text-sm'>{response._id}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Link className='text-sky-300 text-sm hover:underline' href={`${ROUTES_APP.PROFILE}/don-dat-hang`}>
                Quản lý đơn hàng
              </Link>
              {response.status === 'pending' ? <button className='text-red-300 text-sm'>Hủy</button> : null}
            </div>
          </div>
          <ul className='flex flex-col gap-1 p-2 list-disc list-outside text-sm pl-6'>
            <li>
              <div className='inline-flex items-center gap-1'>
                <span className='font-bold'>Người nhận:</span>
                <span>{getGenderTitle(response.customerGender)}</span>
                <span>{response.customerName},</span>
                <span>{response.customerPhone}</span>
              </div>
            </li>
            <li>
              <div className='inline-flex items-center gap-1'>
                <p className='text-pretty'>
                  <span className='font-bold'>Giao đến: </span>
                  {concatString(
                    response.delivery?.provinceName,
                    response.delivery?.districtName,
                    response.delivery?.wardName,
                    response.delivery?.detailAddress
                  )}{' '}
                  (nhân viên sẽ gọi trước khi giao)
                </p>
              </div>
            </li>
            <li>
              <div className='inline-flex items-center gap-1'>
                <span className='font-bold'>
                  Tổng tiền:{' '}
                  {formatCurrency(
                    response.items?.reduce(
                      (total, product) => total + product.quantity * product.price * (1 - product.discount / 100),
                      0
                    ) + (response.delivery?.transferFee ?? 0)
                  )}
                </span>
              </div>
            </li>
          </ul>
        </div>
        {response.status === 'paid' ? (
          <div className='text-md p-3 border border-dashed border-emerald-400 rounded-md bg-emerald-400/15'>
            <p className='text-center text-emerald-300'>Đơn hàng đã được thanh toán</p>
          </div>
        ) : (
          <div className='text-md p-3 border border-dashed border-red-400 rounded-md bg-red-400/15'>
            <p className='text-center text-red-300'>Đơn hàng chưa được thanh toán</p>
          </div>
        )}
        {response.status === 'pending' ? (
          <div className='p-3'>
            <PaymentMethods />
          </div>
        ) : null}
        <div className='p-3 border-t border-solid border-slate-400'>
          <div className='text-sm flex flex-col gap-3'>
            <div className='flex items-center gap-1'>
              <span className='font-bold'>Thời gian nhận hàng:</span>
              <span className=''>Giao trước 14h00 ngày 04/06/2024</span>
            </div>
            <div className='p-2 rounded-md border border-solid border-slate-400 flex flex-col'>
              {response['items']?.map((item) => (
                <div key={'' + item._id + item.variantId + item.optionId} className='flex gap-2 py-2 peer'>
                  <Image src={item.imageUrl} alt={item.productName} width={80} height={120} />
                  <div className='flex flex-col gap-2'>
                    <span>
                      {item.productName} - {item.variantName}
                    </span>
                    <span>Màu: {item.color}</span>
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
