'use client'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PROFILE_MENU } from '@/constants'

import styles from './index.module.css'

const ProfileSidebar = () => {
  const pathname = usePathname()
  // [RENDER]
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarBottom}>
        <div className={styles.menuContainer}>
          {PROFILE_MENU.map((menu) => (
            <Link
              key={menu.id}
              href={menu.path}
              className={clsx(styles.menuItem, {
                [styles.menuActive]: pathname.startsWith(menu.path)
              })}
            >
              {menu.icon}
              <p className={styles.menuTitle}>{menu.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar
