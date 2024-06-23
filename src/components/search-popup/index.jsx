'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import Link from 'next/link'

import useFetch from '@/hooks/useFetch'
import { getCategoryListService } from '@/services/category-service'

import SkeletonComponent from '../skeleton'

const SearchPopup = ({ show, setShow }) => {
  const [searchValue, setSearchValue] = useState('')
  const { isLoading, response: categoryList } = useFetch(getCategoryListService)
  useEffect(() => {
    const handleEscape = async (e) => {
      if (show === true && e.key === 'Escape') {
        setShow(false)
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [show, setShow])

  if (isLoading) return <SkeletonComponent />
  return createPortal(
    <div className='fixed inset-0 bg-black/75 backdrop-blur-sm z-[99999]'>
      <div className='bg-slate-500/75 py-2 px-6 w-1/2 mx-auto mt-4 rounded-full relative'>
        <input
          type='text'
          placeholder='Tìm kiếm sản phẩm, nhấn phím ESC để thoát'
          className='py-2 w-full bg-transparent outline-none border-none'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue ? (
          <div className={clsx('absolute w-full p-4 rounded-lg bg-slate-500 top-full left-0 translate-y-1')}>
            {categoryList.map((type) => (
              <Link
                key={type._id}
                href={`/tim-kiem?category=${type.slug}&search=${searchValue}`}
                onClick={() => setShow(false)}
                className='flex items-center gap-1 text-[0.875rem] hover:bg-slate-400 cursor-pointer p-2 rounded'
              >
                <span className='italic'>Tìm kiếm cho</span>
                <p className='py-1 px-2 italic rounded bg-sky-400 text-black/75 font-bold'>{type.name}</p>
                <span>- {searchValue}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  )
}

export default SearchPopup
