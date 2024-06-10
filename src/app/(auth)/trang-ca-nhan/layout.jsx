'use client'
import React from 'react'

import ProfileSidebar from './_sidebar'
import styles from './index.module.css'

const ProfileLayout = ({ children }) => {
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
