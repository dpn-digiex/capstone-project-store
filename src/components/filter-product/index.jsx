'use client'
import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import DropdownSelect from '../dropdown-select'

import styles from './index.module.css'

const LIST_OPTIONS_DROPDOWN = ['Nổi bật', 'Mới ra mắt', 'Bán chạy', 'Giá thấp đến cao', 'Giá cao đến thấp']

const FilterProduct = ({ subCategories = [] }) => {
  const tabs = useRef([{ name: 'Tất cả', _id: null }].concat(subCategories))
  const [activeTab, setActiveTab] = useState(tabs.current[0]?.name)
  const router = useRouter()

  const handleTabClick = (tab) => {
    setActiveTab(tab.name)
    router.push(`?sub=${tab._id ?? ''}`)
  }

  return (
    <div id='filter-product' className='flex flex-col'>
      <div className={styles.tabs}>
        {tabs.current.length > 0 &&
          tabs.current.map((tab, index) => (
            <div
              key={tab._id + '' + index}
              className={clsx(styles.tab, {
                [styles.active]: activeTab === tab.name
              })}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </div>
          ))}
      </div>
      <div className='flex justify-end items-center mt-2'>
        <DropdownSelect options={LIST_OPTIONS_DROPDOWN} />
      </div>
    </div>
  )
}

export default FilterProduct
