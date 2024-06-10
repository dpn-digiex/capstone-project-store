'use client'
import React from 'react'

import FormClient from '@/components/form-client'

import InputGroup from '../_components/input-group'

import styles from './index.module.css'

const UserInformation = () => {
  // [HANDLERS]
  const handleUpdateInfo = async (e) => {
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
    <div>
      <FormClient
        className={styles['profile-user-info']}
        footer={
          <div className='col-span-2 flex items-center justify-center'>
            <button type='submit' className='btn border-none bg-sky-500 text-white px-8'>
              Lưu lại
            </button>
          </div>
        }
        validate
        onSubmit={handleUpdateInfo}
        errorClassName={styles['error-message']}
      >
        <InputGroup label='Họ và tên' name='fullName' placeholder='Họ và tên' required type='text' />
        <InputGroup label='Email' name='email' placeholder='Email' required type='text' />
        <InputGroup label='Số điện thoại' name='phone' placeholder='Số điện thoại' required type='text' />
        <InputGroup label='Ngày sinh' name='birthday' placeholder='Ngày sinh' required type='date' />
        <InputGroup label='Tên đăng nhập' placeholder='Tên đăng nhập' required type='text' readOnly />
        <InputGroup
          label='Giới tính'
          name='gender'
          required
          type='radio'
          options={[
            { id: 'profile-gender-male', label: 'Nam', value: 'male', defaultChecked: true },
            { id: 'profile-gender-female', label: 'Nữ', value: 'female' },
            { id: 'profile-gender-orther', label: 'Khác', value: 'orther' }
          ]}
        />
      </FormClient>
    </div>
  )
}

export default UserInformation
