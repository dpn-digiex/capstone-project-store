'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const BtnViewMore = ({ pageSize, count, loadSize = 8 }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('pageSize', String(pageSize + loadSize))

    // Use router.push to update the URL without reloading the page
    const newUrl = `?${params.toString()}`
    router.push(newUrl)
  }
  return (
    <div
      onClick={handleLoadMore}
      className='bg-[#323232] p-4 rounded-lg mb-4 w-1/3 mx-auto flex items-center justify-center cursor-pointer'
    >
      Xem thêm {count} sản phẩm
    </div>
  )
}

export default BtnViewMore
