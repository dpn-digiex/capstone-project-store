'use client'

import { useState } from 'react'
import clsx from 'clsx'

const ListVariants = ({ list = [] }) => {
  const [selectedVariant, setSelectedVariant] = useState(list?.[0] || null)

  return (
    list.length > 0 && (
      <div className='flex flex-col'>
        <span className='mb-2 text-sm'>Phiên bản: </span>
        <div className='flex gap-2 flex-wrap'>
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'flex items-center justify-center p-2 rounded-[8px] cursor-pointer bg-[#1c1c1d] hover:bg-[#2d2d2d] max-w-[300px] h-[42px] border-[1px]',
                  {
                    ['border-skyBlue']: selectedVariant?.id === item.id,
                    ['border-[#535353]']: selectedVariant?.id !== item.id
                  }
                )}
                onClick={() => setSelectedVariant(item)}
              >
                <span className='whitespace-nowrap overflow-hidden text-ellipsis text-xs font-medium'>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  )
}

export default ListVariants
