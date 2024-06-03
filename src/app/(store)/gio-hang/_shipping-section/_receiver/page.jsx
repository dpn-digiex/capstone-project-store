'use client'
import React, { useState } from 'react'
import clsx from 'clsx'

import styles from './index.module.css'

const Receiver = () => {
  const [receiver, setReceiver] = useState(null)
  const handleSelectReceiver = (e) => {
    if (e.target.checked === true) setReceiver(e.target.value)
    else setReceiver(null)
  }
  return (
    <div className='mt-2'>
      <label htmlFor='other-receive' className='flex items-center gap-1 cursor-pointer'>
        <input
          id='other-receive'
          type='checkbox'
          value='other-receiver'
          className='h-3.5 w-3.5 accent-slate-700'
          onChange={handleSelectReceiver}
        />
        <span>Gọi người khác nhận hàng</span>
      </label>
      {receiver === 'other-receiver' ? (
        <div className='grid gap-3 mt-2 p-2 bg-slate-500 rounded-md'>
          <div className='flex items-center gap-6'>
            <label htmlFor='receiver-male' className='flex items-center gap-1 cursor-pointer'>
              <input
                id='receiver-male'
                type='radio'
                name='receiver-gender'
                value='male'
                className='h-3.5 w-3.5 accent-slate-700'
                defaultChecked
              />
              <span>Anh</span>
            </label>
            <label htmlFor='receiver-female' className='flex items-center gap-1 cursor-pointer'>
              <input
                id='receiver-female'
                type='radio'
                name='receiver-gender'
                value='female'
                className='h-3.5 w-3.5 accent-slate-700'
              />
              <span>Chị</span>
            </label>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className={clsx(styles['custom-input'], 'bg-slate-500')}>
              <input
                id='receiver-name'
                name='receiver-name'
                type='text'
                autoComplete='off'
                required
                placeholder='Họ và tên'
                className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
              />
              <label htmlFor='receiver-name' className={styles['custom-input-label']}>
                Họ và tên*
              </label>
            </div>
            <div className={clsx(styles['custom-input'], 'bg-slate-500')}>
              <input
                id='receiver-phone'
                name='receiver-phone'
                type='text'
                autoComplete='off'
                required
                placeholder='Số điện thoại'
                className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full'
              />
              <label htmlFor='receiver-phone' className={styles['custom-input-label']}>
                Số điện thoại*
              </label>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Receiver
