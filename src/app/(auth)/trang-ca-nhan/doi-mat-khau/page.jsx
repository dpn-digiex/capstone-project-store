'use client'
import React from 'react'

import FormClient from '@/components/form-client'

import InputGroup from '../_components/input-group'

import styles from './index.module.css'

const ChangePassword = () => {
  return (
    <FormClient
      className={styles['profile-change-password']}
      footer={
        <div className='flex items-center justify-center'>
          <button type='submit' className='btn border-none bg-sky-500 text-white px-8'>
            Lưu lại
          </button>
        </div>
      }
    >
      <InputGroup label='Mật khẩu cũ' name='oldPassword' placeholder='Mật khẩu cũ' required type='text' />
      <InputGroup label='Mật khẩu mới' name='newPassword' placeholder='Mật khẩu mới' required type='text' />
      <InputGroup
        label='Nhập lại mật khẩu'
        name='confirmPassword'
        placeholder='Nhập lại mật khẩu'
        required
        type='text'
      />
    </FormClient>
  )
}

export default ChangePassword
