import React from 'react'
import clsx from 'clsx'

import Select from '@/components/select'

import Receiver from './_receiver/page'
import styles from './index.module.css'

const ShippingSection = () => {
  return (
    <div className='px-6 py-3 bg-[#515965] shadow-lg mt-1 text-xs'>
      <h3 className='text-sm font-bold'>Hình thức nhận hàng</h3>
      <div className='grid gap-3 mt-2'>
        <div className='flex items-center gap-6'>
          <label htmlFor='shipping-in-place' className='flex items-center gap-1 cursor-pointer'>
            <input
              id='shipping-in-place'
              type='radio'
              name='shipping-method'
              value='in-place'
              className='h-3.5 w-3.5 accent-slate-700'
              defaultChecked
            />
            <span>Giao tận nơi</span>
          </label>
        </div>
        <div className='grid grid-cols-2 auto-rows-[1fr] gap-3 p-2 bg-slate-500 rounded-md'>
          <Select
            placeholder='Chọn Tỉnh/Thành'
            emptyPlaceholder='Không có dữ liệu'
            className='border-[0.125rem] border-slate-300 rounded-md bg-slate-500'
            dropdownClassName={styles['shipping-dropdown']}
            options={[
              { value: 1, label: 'Hồ Chí Minh' },
              { value: 2, label: 'Hà Nội' },
              { value: 3, label: 'Bình Thuận' }
            ]}
            filter
            inputPlaceholder='Tìm theo tỉnh/thành'
            name='shipping-province'
          />
          <Select
            placeholder='Chọn Quận/Huyện'
            emptyPlaceholder='Không có dữ liệu'
            className='border-[0.125rem] border-slate-300 rounded-md bg-slate-500'
            dropdownClassName={styles['shipping-dropdown']}
            filter
            inputPlaceholder='Tìm theo quận/huyện'
            name='shipping-district'
          />
          <Select
            placeholder='Chọn Phường/Xã'
            emptyPlaceholder='Không có dữ liệu'
            className='border-[0.125rem] border-slate-300 rounded-md bg-slate-500'
            dropdownClassName={styles['shipping-dropdown']}
            filter
            inputPlaceholder='Tìm theo phường/xã'
            name='shipping-commune'
          />
          <div className={clsx(styles['custom-input'], 'bg-slate-500')}>
            <input
              id='shipping-street'
              name='shipping-street'
              type='text'
              placeholder='Số nhà, tên đường'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
            />
            <label htmlFor='shipping-street' className={styles['custom-input-label']}>
              Số nhà, tên đường
            </label>
          </div>
        </div>
        <div className={clsx(styles['custom-input'], 'bg-[#515965]')}>
          <input
            id='shipping-note'
            name='shipping-note'
            type='text'
            placeholder='Nhập ghi chú (nếu có)'
            className='p-3 border-slate-300 border-[0.125rem] rounded-lg outline-none bg-transparent w-full'
          />
          <label htmlFor='shipping-note' className={styles['custom-input-label']}>
            Nhập ghi chú (nếu có)
          </label>
        </div>
      </div>
      <Receiver />
    </div>
  )
}

export default ShippingSection
