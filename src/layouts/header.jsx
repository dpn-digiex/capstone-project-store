'use client'
import React from 'react'
import { GoPerson } from 'react-icons/go'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ButtonLink from '@/components/button-link'
import SeachComponent from '@/components/search'
import { ROUTES_APP } from '@/constants'
// import useResponsive from '@/hooks/useResponsive'

const MENU_HEADER = {
  IPHONE: {
    PATH: ROUTES_APP.PRODUCT.IPHONE,
    TITLE: 'iPhone'
  },
  MAC: {
    PATH: ROUTES_APP.PRODUCT.MAC,
    TITLE: 'Mac'
  },
  IPAD: {
    PATH: ROUTES_APP.PRODUCT.IPAD,
    TITLE: 'iPad'
  },
  WATCH: {
    PATH: ROUTES_APP.PRODUCT.WATCH,
    TITLE: 'Watch'
  },
  SOUND: {
    PATH: ROUTES_APP.PRODUCT.SOUND,
    TITLE: 'Tai nghe, Loa'
  },
  ACCESSORIES: {
    PATH: ROUTES_APP.PRODUCT.ACCESSORIES,
    TITLE: 'Phụ kiện'
  },
  BLOG: {
    PATH: ROUTES_APP.BLOG,
    TITLE: 'Blog Công nghệ'
  }
}
const cartLength = 0

const Header = () => {
  const pathname = usePathname()
  // useResponsive()
  return (
    <header className='sticky top-0 z-[1000] w-full h-[60px]  bg-bgBlack'>
      <div className='container h-full flex items-center justify-between '>
        <div className='mr-12'>
          <ButtonLink href='/' customStyle='justify-start px-0 min-w-25 max-w-[200px]'>
            <div className='flex items-center'>
              <Image
                src='https://res.cloudinary.com/dgynzitgy/image/upload/v1718315464/capstone-project-cloud/panel/ectqc4orqpxn9x3fvizd.png'
                alt='logo-text'
                width={100}
                height={30}
              />
            </div>
          </ButtonLink>
        </div>
        <div className='flex items-center'>
          {Object.keys(MENU_HEADER).map((key, index) => {
            return (
              <ButtonLink
                key={`menu-header-${index}`}
                href={MENU_HEADER[key].PATH}
                isSelected={pathname.includes(MENU_HEADER[key].PATH)}
                customStyle='min-w-25 max-w-[200px]'
              >
                {MENU_HEADER[key].TITLE}
              </ButtonLink>
            )
          })}
        </div>
        <div className='ml-12 flex items-center justify-center gap-2'>
          <SeachComponent />
          <Link href={ROUTES_APP.CART}>
            <div className='relative w-9 h-9 rounded-full flex items-center justify-center bg-[#2f3033] hover:bg-[#545454] cursor-pointer'>
              <HiOutlineShoppingBag />
              {cartLength === 0 ? null : (
                <span
                  className={clsx(
                    'text-[0.5rem] leading-[0] h-4 w-4 bg-red-500 rounded-full',
                    'flex items-center justify-center',
                    'absolute top-0 right-0'
                  )}
                >
                  {cartLength}
                </span>
              )}
            </div>
          </Link>
          <Link href={ROUTES_APP.SIGN_IN}>
            <div className='relative w-9 h-9 rounded-full flex items-center justify-center bg-[#2f3033] hover:bg-[#545454] cursor-pointer'>
              <GoPerson />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
