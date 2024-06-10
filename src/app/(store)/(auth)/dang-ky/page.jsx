'use client'
import React, { useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import {
  MdMailOutline,
  MdOutlineLock,
  MdOutlinePerson,
  MdOutlineVisibility,
  MdOutlineVisibilityOff
} from 'react-icons/md'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import FormClient from '@/components/form-client'
import Input from '@/components/form-client/input'
import { ROUTES_APP } from '@/constants'

import styles from './index.module.css'

const SignUp = () => {
  // [STATES]
  const pathname = usePathname()
  const [showPassword, setShowPassword] = useState(false)

  // [HANDLER FUNCTIONS]
  const handleRegister = async (e) => {
    try {
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      console.log(payload)
    } catch (error) {
      console.log(error.message)
    }
  }

  // [RENDER]
  return (
    <FormClient
      validate
      defaultValidate={false}
      onSubmit={handleRegister}
      className={clsx(styles.authForm, styles.signInForm, {
        [styles.signUpMode]: pathname.startsWith(ROUTES_APP.SIGN_UP)
      })}
      header={<FormHeader />}
      footer={<FormFooter />}
    >
      <Input type='text' required placeholder='Họ và tên*'>
        <FaRegCircleUser />
      </Input>
      <Input type='email' name='email' required placeholder='Email*'>
        <MdMailOutline />
      </Input>
      <Input type='text' required placeholder='Tên đăng nhập*'>
        <MdOutlinePerson />
      </Input>
      <Input
        type={showPassword === true ? 'text' : 'password'}
        required
        name='password'
        placeholder='Mật khẩu*'
        suffix={<PasswordSuffix isShow={showPassword} setShow={setShowPassword} />}
      >
        <MdOutlineLock />
      </Input>
    </FormClient>
  )
}

export default SignUp

// [CUSTOM RENDERED ELEMENTS]
const FormHeader = () => {
  return <h2 className={styles.title}>Sign up</h2>
}
const FormFooter = () => {
  return (
    <button type='submit' className={clsx('btn', 'btn-rounded', styles.solidBtn)}>
      Sign up
    </button>
  )
}
const PasswordSuffix = ({ isShow = false, setShow }) => {
  if (isShow === true) return <MdOutlineVisibility onClick={() => setShow(false)} className='fill-[#acacac] text-2xl' />
  return <MdOutlineVisibilityOff onClick={() => setShow(true)} className='fill-[#acacac] text-2xl' />
}
