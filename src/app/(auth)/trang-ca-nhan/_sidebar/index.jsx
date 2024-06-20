'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { MdOutlineLogout } from 'react-icons/md'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { PROFILE_MENU } from '@/constants'
import { useAppStore } from '@/libs/zustand'
import { logout } from '@/services/user-service'

import styles from './index.module.css'

const ProfileSidebar = () => {
  const pathname = usePathname()
  const setAccessToken = useAppStore((state) => state.setAccessToken)
  const router = useRouter()

  // [HANDLERS]
  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result === false) throw new Error('Không thể đăng xuất, vui lòng thử lại')
      setAccessToken(null)
      router.push('/dang-nhap')
      toast.success('Đăng xuất thành công')
    } catch (error) {
      toast.error(error.message)
    }
  }

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
          <button type='button' className={styles.menuItem} onClick={handleLogout}>
            <MdOutlineLogout size={24} />
            <p className={styles.menuTitle}>Đăng xuất</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar
