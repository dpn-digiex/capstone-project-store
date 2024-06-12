'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import loginSVG from '@/assets/images/login.svg'
import registerSVG from '@/assets/images/register.svg'
import { ROUTES_APP } from '@/constants'

import styles from './index.module.css'

export default function AuthLayout({ children }) {
  // [STATES]
  const pathname = usePathname()
  const [isSignUp, setIsSignUp] = useState(pathname.startsWith(ROUTES_APP.SIGN_UP))

  // [RENDER]
  return (
    <React.Fragment>
      <div
        className={clsx('scale-screen', styles.authentication, {
          [styles.signUpMode]: isSignUp
        })}
      >
        <div className={styles.formContainer}>
          <div className={styles.formSwitch}>
            {React.cloneElement(children, {
              isSignUp: isSignUp
            })}
          </div>
        </div>

        <div className={styles.panelContainer}>
          <div className={clsx(styles.panel, styles.leftPanel)}>
            <div className={styles.content}>
              <h3 className={styles.greeting}>Chào mừng quay trở lại!</h3>
              <p className={styles.description}>
                Hành trình của bạn tiếp tục tại đây. Đăng nhập vào tài khoản của bạn.
              </p>
              <p className='mb-2 text-sm'>Nếu bạn chưa có tài khoản, hãy trở thành thành viên của chúng tôi.</p>
              <Link
                href={ROUTES_APP.SIGN_UP}
                className={clsx('btn btn-rounded', styles.transparentBtn)}
                onClick={() => setIsSignUp(true)}
              >
                Đi tới đăng ký
              </Link>
            </div>
            <Image src={loginSVG} alt='Rocket SVG' className={styles.image} width={1140} height={788} priority />
          </div>

          <div className={clsx(styles.panel, styles.rightPanel)}>
            <div className={styles.content}>
              <h3 className={styles.greeting}>Trở thành thành viên của chúng tôi</h3>
              <p className={styles.description}>
                Đăng ký để mở khóa tất cả các tính năng và bắt đầu cuộc phiêu lưu của bạn với chúng tôi.
              </p>
              <p className='mb-2 text-sm'>Bạn đã sẵn sàng cho chuyến phiêu lưu?</p>
              <Link
                href={ROUTES_APP.SIGN_IN}
                className={clsx('btn btn-rounded', styles.transparentBtn)}
                onClick={() => setIsSignUp(false)}
              >
                Đi tới đăng nhập
              </Link>
            </div>
            <Image src={registerSVG} alt='Desk SVG' className={styles.image} width={1140} height={788} priority />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
