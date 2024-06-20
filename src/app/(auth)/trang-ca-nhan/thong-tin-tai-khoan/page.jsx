'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import Loading from '@/app/loading'
import FormClient from '@/components/form-client'
import useFetch from '@/hooks/useFetch'
import { getProfile, updateProfile } from '@/services/user-service'
import { formatDateInputValue } from '@/utils'

import InputGroup from '../_components/input-group'

import styles from './index.module.css'

const UserInformation = () => {
  // [STATES]
  const [refreshProfile, setRefreshProfile] = useState(0)
  const { isLoading, response } = useFetch(getProfile, refreshProfile)
  // [HANDLERS]
  const handleUpdateInfo = async (e) => {
    try {
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      const response = await updateProfile(payload)
      if (response) {
        setRefreshProfile((prev) => prev + 1)
        toast.success('Cập nhật thông tin thành công.')
      }
    } catch (error) {
      console.log(error)
      toast.error('Lưu thông tin thất bại.')
    }
  }

  // [RENDERS]
  if (isLoading) return <Loading />
  return (
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
      <InputGroup
        label='Họ và tên'
        name='fullName'
        placeholder='Họ và tên'
        required
        type='text'
        defaultValue={response.fullName}
      />
      <InputGroup label='Email' name='email' placeholder='Email' required type='text' defaultValue={response.email} />
      <InputGroup
        label='Số điện thoại'
        name='phoneNumber'
        placeholder='Số điện thoại'
        type='text'
        defaultValue={response.phoneNumber}
      />
      <InputGroup
        label='Ngày sinh'
        name='dateOfBirth'
        placeholder='Ngày sinh'
        type='date'
        defaultValue={formatDateInputValue(response.dateOfBirth)}
      />
      <InputGroup
        label='Tên đăng nhập'
        placeholder='Tên đăng nhập'
        type='text'
        readOnly
        defaultValue={response.username}
      />
      <InputGroup
        label='Giới tính'
        name='gender'
        type='radio'
        options={[
          { id: 'profile-gender-male', label: 'Nam', value: 'Nam', defaultChecked: response.gender === 'Nam' },
          { id: 'profile-gender-female', label: 'Nữ', value: 'Nữ', defaultChecked: response.gender === 'Nữ' },
          { id: 'profile-gender-other', label: 'Khác', value: 'Khác', defaultChecked: response.gender === 'Khác' }
        ]}
      />
    </FormClient>
  )
}

export default UserInformation
