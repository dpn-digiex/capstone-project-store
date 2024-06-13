'use client'
import React from 'react'
import { GoPerson } from 'react-icons/go'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ButtonLink from '@/components/button-link'
import SeachComponent from '@/components/search'
import SkeletonComponent from '@/components/skeleton'
import { ROUTES_APP } from '@/constants'
import useFetch from '@/hooks/useFetch'
import { getCategoryListService } from '@/services/category-service'
const cartLength = 0

const Header = () => {
  const pathname = usePathname()
  const { isLoading, response: categoryList } = useFetch(getCategoryListService)

  if (isLoading) return <SkeletonComponent />
  return (
    <header className='sticky top-0 z-[1000] w-full h-[60px]  bg-bgBlack'>
      <div className='container h-full flex items-center justify-between '>
        <div className='mr-12'>
          <ButtonLink href='/' customStyle='justify-start px-0 min-w-25 max-w-[200px]'>
            LOGO_STORE
          </ButtonLink>
        </div>
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
