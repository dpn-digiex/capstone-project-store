'use client'
import React from 'react'
import { GoPerson } from 'react-icons/go'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Loading from '@/app/loading'
import ButtonLink from '@/components/button-link'
import SeachComponent from '@/components/search'
import { ROUTES_APP } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { useAppStore } from '@/libs/zustand'
import { getCategoryListService } from '@/services/category-service'

const Header = () => {
  const pathname = usePathname()
  const { isLoading, response: categoryList } = useFetch(getCategoryListService)
  const accessToken = useAppStore((state) => state.accessToken)
  const cart = useAppStore((state) => state.cart)
  const user = useAppStore((state) => state.user)

  if (isLoading) return <Loading />
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
        {categoryList?.length > 0 && (
          <div className='flex items-center'>
            {categoryList.map((category) => {
              return (
                <ButtonLink
                  key={category._id}
                  href={`/${category.slug}`}
                  isSelected={pathname.includes(`/${category.slug}`)}
                  customStyle='min-w-25 max-w-[200px]'
                >
                  {category.name}
                </ButtonLink>
              )
            })}
          </div>
        )}
        <div className='ml-12 flex items-center justify-center gap-2'>
          <SeachComponent />
          <Link href={ROUTES_APP.CART}>
            <div className='relative w-9 h-9 rounded-full flex items-center justify-center bg-[#2f3033] hover:bg-[#545454] cursor-pointer'>
              <HiOutlineShoppingBag />
              {cart.length === 0 ? null : (
                <span
                  className={clsx(
                    'text-[0.5rem] leading-[0] h-4 w-4 bg-red-500 rounded-full',
                    'flex items-center justify-center',
                    'absolute top-0 right-0'
                  )}
                >
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
          <Link href={accessToken ? `${ROUTES_APP.PROFILE}/thong-tin-tai-khoan` : ROUTES_APP.SIGN_IN}>
            <div className='relative w-9 h-9 rounded-full flex items-center justify-center bg-[#2f3033] hover:bg-[#545454] cursor-pointer'>
              {user.avatar ? (
                <Image src={user.avatar} alt={user.fullName} width={36} height={36} className='rounded-full' />
              ) : (
                <GoPerson />
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
