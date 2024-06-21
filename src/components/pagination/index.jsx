'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

import Select from '@/components/select'

import PageListComponent from './page-list'

const PaginationComponent = ({ totalRecord, onPageChange, currentPage = 1, currentPageSize = 10 }) => {
  // [STATES]
  const searchParams = useSearchParams()
  const current = Number(searchParams.get('page')) || currentPage
  const pageSize = Number(searchParams.get('pageSize')) || currentPageSize

  // [HANDLERS]
  const handleChangePage = (step) => {
    const listSize = Math.ceil(totalRecord / pageSize)
    return () => {
      if (current >= listSize && step > 0) return
      if (current <= 1 && step < 0) return
      const actualPage = current + step
      const newPage = actualPage >= listSize ? listSize : actualPage <= 0 ? 1 : actualPage
      onPageChange?.({ pageSize, page: newPage })
      searchParams.set({ page: newPage, pageSize })
    }
  }

  const handleChangePageSize = (option) => {
    searchParams.set({ page: 1, pageSize: option.value })
    onPageChange?.({ page: 1, pageSize: option.value })
  }

  const handleSelectPage = (page) => {
    if (page === current) return
    searchParams.set({ page, pageSize })
    onPageChange?.({ page, pageSize })
  }

  // [RENDERS]
  return (
    <div className='flex items-center justify-between'>
      <div className='left-0 flex items-center gap-[0.625rem]'>
        <span>Row per page:</span>
        <Select
          key={`${pageSize}-${current}`}
          className='w-32'
          defaultValue={pageSize.toString()}
          options={[
            { label: '10', value: 10 },
            { label: '25', value: 25 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
            { label: 'All', value: totalRecord }
          ]}
          onSelect={handleChangePageSize}
          nullable={false}
        />
      </div>
      <div className='lg:page-list-center flex items-center gap-[1rem]'>
        <PageListComponent
          totalRecord={totalRecord}
          pageSize={pageSize}
          currentPage={current}
          onSelect={handleSelectPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  )
}

export default PaginationComponent
