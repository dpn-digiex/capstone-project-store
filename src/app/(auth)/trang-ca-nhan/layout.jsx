'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { LOCAL_STORE_ACCESS_TOKEN, LOCAL_STORE_USER, ROUTES_APP } from '@/constants'
import { useAppStore } from '@/libs/zustand'

import ProfileSidebar from './_sidebar'
import styles from './index.module.css'

const ProfileLayout = ({ children }) => {
  const accessToken = useAppStore((state) => state.accessToken)
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      localStorage.removeItem(LOCAL_STORE_ACCESS_TOKEN)
      localStorage.removeItem(LOCAL_STORE_USER)
      router.push(ROUTES_APP.SIGN_IN)
    }
  }, [accessToken, router])
  return (
    <div className={styles.profile}>
      <div className='container'>
        <div className='grid gap-6 grid-cols-[1fr,2.5fr]'>
          <div>
            <ProfileSidebar />
          </div>
          <div>
            <div className={styles.mainSection}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
