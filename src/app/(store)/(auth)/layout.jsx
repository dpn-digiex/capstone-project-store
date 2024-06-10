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
        className={clsx(styles.authentication, {
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
              <h3 className={styles.greeting}>Good to Have You Back!</h3>
              <p className={styles.description}>Your journey continues here. Log in to your account.</p>
              <Link
                href={ROUTES_APP.SIGN_UP}
                className={clsx('btn', 'btn-rounded', styles.transparentBtn)}
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </Link>
            </div>
            <Image src={loginSVG} alt='Rocket SVG' className={styles.image} width={1140} height={788} priority />
          </div>

          <div className={clsx(styles.panel, styles.rightPanel)}>
            <div className={styles.content}>
              <h3 className={styles.greeting}>To be one of us</h3>
              <p className={styles.description}>Sign up to unlock all the features and start your adventure with us.</p>
              <Link
                href={ROUTES_APP.SIGN_IN}
                className={clsx('btn', 'btn-rounded', styles.transparentBtn)}
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </Link>
            </div>
            <Image src={registerSVG} alt='Desk SVG' className={styles.image} width={1140} height={788} priority />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
