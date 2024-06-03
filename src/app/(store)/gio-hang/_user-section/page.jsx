import React from 'react'

import styles from './index.module.css'

const UserInfoSection = () => {
  return (
    <div className='px-6 py-3 bg-[#515965] shadow-lg mt-1 text-xs'>
      <h3 className='text-sm font-bold'>Thông tin khách hàng</h3>
      <div className='grid gap-3 mt-2'>
        <div className='flex items-center gap-6'>
          <label htmlFor='customer-male' className='flex items-center gap-1 cursor-pointer'>
            <input
              id='customer-male'
              type='radio'
              name='customer-gender'
              value='male'
              className='h-3.5 w-3.5 accent-slate-700'
              defaultChecked
            />
            <span>Anh</span>
          </label>
          <label htmlFor='customer-female' className='flex items-center gap-1 cursor-pointer'>
            <input
              id='customer-female'
              type='radio'
              name='customer-gender'
              value='female'
              className='h-3.5 w-3.5 accent-slate-700'
            />
            <span>Chị</span>
          </label>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className={styles['custom-input']}>
            <input
              id='customer-name'
              name='customer-name'
              type='text'
              required
              placeholder='Họ và tên'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
            />
            <label htmlFor='customer-name' className={styles['custom-input-label']}>
              Họ và tên*
            </label>
          </div>
          <div className={styles['custom-input']}>
            <input
              id='customer-phone'
              name='customer-phone'
              type='text'
              required
              placeholder='Số điện thoại'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
            />
            <label htmlFor='customer-phone' className={styles['custom-input-label']}>
              Số điện thoại*
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoSection
