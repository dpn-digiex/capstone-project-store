'use client'
import React from 'react'

import FormClient from '@/components/form-client'

import InputGroup from '../../_components/input-group'

import styles from './index.module.css'

const AddShippingAddress = () => {
  // [HANDLERS]
  const handleAddShippingAddress = async (e) => {
    try {
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      console.log(payload)
    } catch (error) {
      console.log(error)
    }
  }

  // [RENDERS]
  return (
    <FormClient
      className={styles['add-shipping-address-form']}
      footer={
        <div className='col-span-2 flex items-center justify-center'>
          <button type='submit' className='btn border-none bg-sky-500 text-white px-8'>
            Lưu lại
          </button>
        </div>
      }
      validate
      onSubmit={handleAddShippingAddress}
      errorClassName={styles['error-message']}
    >
      <InputGroup label='Tên người nhận' name='receiverName' placeholder='Tên người nhận' required type='text' />
      <InputGroup label='Email' name='receiverEmail' placeholder='Email' required type='text' />
      <InputGroup label='Số điện thoại' name='receiverPhone' placeholder='Số điện thoại' required type='text' />
      <InputGroup label='Quốc gia' name='nation' placeholder='Chọn Quốc gia' type='select' />
      <InputGroup label='Tỉnh, thành' name='province' placeholder='Chọn Tỉnh, thành' type='select' />
      <InputGroup label='Quận, huyện' name='district' placeholder='Chọn Quận, huyện' type='select' />
      <InputGroup label='Phường, xã' name='commune' placeholder='Chọn Phường, xã' type='select' />
      <InputGroup label='Số nhà, tên đường' name='street' placeholder='Số nhà, tên đường' type='text' />
    </FormClient>
  )
}

export default AddShippingAddress
