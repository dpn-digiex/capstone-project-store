'use client'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import SkeletonComponent from '@/components/skeleton'
import TableComponent from '@/components/table'
import { ROUTES_APP } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { getOrderList } from '@/services/checkout-service'
import { concatString, formatCurrency } from '@/utils'

const ShoppingHistory = () => {
  const { isLoading, response } = useFetch(getOrderList)

  if (isLoading) return <SkeletonComponent />
  return (
    <div className='overflow-hidden w-full'>
      <TableComponent.View
        keyExtractor={({ item }) => {
          console.log(item)
          return item._id
        }}
        columnKey='name'
        renderKey='displayName'
        columns={[
          {
            name: 'orderDate',
            displayName: 'Ngày đặt'
          },
          {
            name: 'customerName',
            displayName: 'Người nhận'
          },
          {
            name: 'status',
            displayName: <p className='w-full text-center'>Trạng thái</p>
          },
          {
            name: 'paymentMethod',
            displayName: 'Phương thức'
          },
          {
            name: 'delivery',
            displayName: <p className='w-full text-center'>Địa chỉ</p>
          },
          {
            name: 'total',
            displayName: <p className='w-full text-center'>Tổng tiền</p>
          },
          {
            name: 'action',
            displayName: <p className='w-full text-center'>Thêm</p>
          }
        ]}
        data={response.map((item) => ({
          orderDate: new Date(item.orderDate).toLocaleDateString(),
          customerName: item.customerName,
          status: (
            <p
              className={clsx('w-full py-1 px-4 rounded', {
                'bg-sky-400': item.status === 'pending',
                'bg-emerald-400': item.status === 'paid',
                'bg-red-400': item.status === 'cancel'
              })}
            >
              {item.status}
            </p>
          ),
          paymentMethod: item.paymentMethod,
          delivery: (
            <span className='text-pretty'>
              {concatString(
                item.delivery?.detailAddress,
                item.delivery?.wardName,
                item.delivery?.districtName,
                item.delivery?.provinceName
              )}
            </span>
          ),
          total: formatCurrency(
            item.items?.reduce(
              (total, product) => total + product?.price * (1 - product?.discount / 100) * product?.quantity,
              0
            )
          ),
          action: (
            <Link
              href={`${ROUTES_APP.CHECKOUT}?id=${item._id}`}
              className='text-sky-300 hover:text-sky-400 hover:underline'
            >
              Xem chi tiết
            </Link>
          )
        }))}
      />
    </div>
  )
}

export default ShoppingHistory
