'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineLock, MdOutlinePerson, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'

import FormClient from '@/components/form-client'
import Input from '@/components/form-client/input'
import { LOCAL_STORE_CACHE_ROUTE, ROUTES_APP } from '@/constants'
import { useAppStore } from '@/libs/zustand'
import { login } from '@/services/user-service'
import { getLocalStore } from '@/utils'

import styles from './index.module.css'

const SignIn = () => {
  // [STATES]
  const pathname = usePathname()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const setAccessToken = useAppStore((state) => state.setAccessToken)
  const setUser = useAppStore((state) => state.setUser)

  // [HANDLER FUNCTIONS]
  const handleLogin = async (e) => {
    try {
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      const result = await login(payload)
      const cacheRoute = getLocalStore(LOCAL_STORE_CACHE_ROUTE)
      if (cacheRoute) {
        router.push(cacheRoute)
      } else {
        router.push(`${ROUTES_APP.PROFILE}/thong-tin-tai-khoan`)
      }
      if (result === false) throw new Error('Đăng nhập thất bại, vui lòng thử lại')
      setUser(result)
      setAccessToken(result.accessToken)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // [RENDER]
  return (
    <FormClient
      validate
      defaultValidate={false}
      onSubmit={handleLogin}
      className={clsx(styles.authForm, styles.signInForm, {
        [styles.signUpMode]: pathname.startsWith(ROUTES_APP.SIGN_UP)
      })}
      header={<FormHeader />}
      footer={<FormFooter />}
    >
      <Input type='text' required name='username' placeholder='Tên đăng nhập*'>
        <MdOutlinePerson />
      </Input>
      <Input
        type={showPassword === true ? 'text' : 'password'}
        required
        placeholder='Mật khẩu*'
        name='password'
        suffix={<PasswordSuffix isShow={showPassword} setShow={setShowPassword} />}
      >
        <MdOutlineLock />
      </Input>
    </FormClient>
  )
}

export default SignIn

// [CUSTOM RENDERED COMPONENTS]
const FormHeader = () => {
  return <h2 className={styles.title}>Đăng nhập</h2>
}
const FormFooter = () => {
  return (
    <React.Fragment>
      <button type='submit' className={clsx('btn', 'btn-rounded', styles.solidBtn)}>
        Đăng nhập
      </button>
    </React.Fragment>
  )
}
const PasswordSuffix = ({ isShow = false, setShow }) => {
  if (isShow === true) return <MdOutlineVisibility onClick={() => setShow(false)} className='fill-[#acacac] text-2xl' />
  return <MdOutlineVisibilityOff onClick={() => setShow(true)} className='fill-[#acacac] text-2xl' />
}
