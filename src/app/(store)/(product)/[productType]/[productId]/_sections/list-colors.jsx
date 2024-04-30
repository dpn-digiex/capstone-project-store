'use client'

import { useState } from 'react'
import clsx from 'clsx'

const ListColors = ({ list = [] }) => {
  const [selectedColor, setSelectedColor] = useState(list?.[0] || null)

  return (
    list.length > 0 && (
      <div className='flex flex-col'>
        <span className='mb-2 text-sm'>{`Màu: ${selectedColor.name}`}</span>
        <div className='flex gap-3 flex-wrap'>
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(`w-[40px] h-[40px] rounded-full cursor-pointer`, {
                  ['border-[2px] border-solid border-skyBlue']: selectedColor.id === item.id
                })}
                style={{ backgroundColor: item.hex }}
                onClick={() => setSelectedColor(item)}
              />
            )
          })}
        </div>
      </div>
    )
  )
}

export default ListColors
