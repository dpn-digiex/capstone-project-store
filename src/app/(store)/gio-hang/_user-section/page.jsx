import React from 'react'
import clsx from 'clsx'

import styles from './index.module.css'

const UserInfoSection = ({ user }) => {
  return (
    <div className='px-6 py-3 bg-[#515965] shadow-lg mt-1 text-xs'>
      <h3 className='text-sm font-bold'>Thông tin khách hàng</h3>
      <div className='grid gap-3 mt-2'>
        <div className='flex items-center gap-6'>
          <label htmlFor='customer-male' className='flex items-center gap-1 cursor-pointer'>
            <input
              id='customer-male'
              type='radio'
              name='customerGender'
              value='Nam'
              className='h-3.5 w-3.5 accent-slate-700'
              defaultChecked={user.gender === 'Nam' || user.gender === 'Khác'}
            />
            <span>Anh</span>
          </label>
          <label htmlFor='customer-female' className='flex items-center gap-1 cursor-pointer'>
            <input
              id='customer-female'
              type='radio'
              name='customerGender'
              value='Nữ'
              className='h-3.5 w-3.5 accent-slate-700'
              defaultChecked={user.gender === 'Nữ'}
            />
            <span>Chị</span>
          </label>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className={clsx(styles['custom-input'], 'col-span-2')}>
            <input
              id='customer-name'
              name='customerName'
              type='text'
              required
              placeholder='Họ và tên'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
              defaultValue={user.fullName ?? ''}
            />
            <label htmlFor='customer-name' className={styles['custom-input-label']}>
              Họ và tên*
            </label>
          </div>
          <div className={styles['custom-input']}>
            <input
              id='customer-phone'
              name='customerPhone'
              type='text'
              required
              placeholder='Số điện thoại'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
              defaultValue={user.phoneNumber ?? ''}
            />
            <label htmlFor='customer-phone' className={styles['custom-input-label']}>
              Số điện thoại*
            </label>
          </div>
          <div className={styles['custom-input']}>
            <input
              id='customer-email'
              name='customerEmail'
              type='text'
              required
              placeholder='Email'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
              defaultValue={user.email ?? ''}
            />
            <label htmlFor='customer-email' className={styles['custom-input-label']}>
              Email*
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfoSection
