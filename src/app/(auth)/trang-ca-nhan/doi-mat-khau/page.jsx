'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

import FormClient from '@/components/form-client'
import { changePassword } from '@/services/user-service'

import InputGroup from '../_components/input-group'

import styles from './index.module.css'

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [resetForm, setResetForm] = useState(0)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChangePassword = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      const result = await changePassword(payload)
      if (result === false) throw new Error('Thất bại')
      setResetForm((prev) => prev + 1)
      setNewPassword('')
      toast.success('Thay đổi mật khẩu thành công.')
    } catch (error) {
      console.log(error)
      toast.error('Thay đổi mật khẩu thất bại, vui lòng thử lại.')
    }
  }
  return (
    <FormClient
      key={resetForm}
      onSubmit={handleChangePassword}
      className={styles['profile-change-password']}
      footer={
        <div className='flex items-center justify-center'>
          <button type='submit' className='btn border-none bg-sky-500 text-white px-8'>
            Lưu lại
          </button>
        </div>
      }
      validate
      compare={{ password: newPassword }}
    >
      <InputGroup
        label='Mật khẩu cũ'
        name='oldPassword'
        placeholder='Mật khẩu cũ'
        required
        type={showOldPassword === true ? 'text' : 'password'}
        suffix={<PasswordSuffix isShow={showOldPassword} setShow={setShowOldPassword} />}
      />
      <InputGroup
        label='Mật khẩu mới'
        name='newPassword'
        placeholder='Mật khẩu mới'
        required
        type={showNewPassword === true ? 'text' : 'password'}
        data-validate-type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        suffix={<PasswordSuffix isShow={showNewPassword} setShow={setShowNewPassword} />}
      />
      <InputGroup
        label='Nhập lại mật khẩu'
        name='confirmPassword'
        placeholder='Nhập lại mật khẩu'
        required
        type={showConfirmPassword === true ? 'text' : 'password'}
        data-validate-type='confirm-password'
        suffix={<PasswordSuffix isShow={showConfirmPassword} setShow={setShowConfirmPassword} />}
      />
    </FormClient>
  )
}

export default ChangePassword

const PasswordSuffix = ({ isShow = false, setShow }) => {
  if (isShow === true) return <MdOutlineVisibility onClick={() => setShow(false)} className='fill-white text-2xl' />
  return <MdOutlineVisibilityOff onClick={() => setShow(true)} className='fill-white text-2xl' />
}
