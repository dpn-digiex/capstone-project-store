'use client'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

import DropdownSelect from '../dropdown-select'

import styles from './index.module.css'

const LIST_TABS = {
  ['iphone']: [
    {
      searchParams: 'all-iphone',
      name: 'Tất cả'
    },
    {
      searchParams: 'iphone-15',
      name: 'iPhone 15'
    },
    {
      searchParams: 'iphone-14',
      name: 'iPhone 14'
    },
    {
      searchParams: 'iphone-13',
      name: 'iPhone 13'
    },
    {
      searchParams: 'iphone-12',
      name: 'iPhone 12'
    },
    {
      searchParams: 'iphone-11',
      name: 'iPhone 11'
    }
  ],
  ['mac']: [
    {
      searchParams: 'all-macbook',
      name: 'Tất cả'
    },
    {
      searchParams: 'macbook-pro',
      name: 'Macbook Pro'
    },
    {
      searchParams: 'macbook-air',
      name: 'Macbook Air'
    },
    {
      searchParams: 'imac',
      name: 'iMac'
    },
    {
      searchParams: 'mac-mini',
      name: 'Mac Mini'
    },
    {
      searchParams: 'mac-studio',
      name: 'Mac Studio'
    },
    {
      searchParams: 'display',
      name: 'Display'
    }
  ],
  ['ipad']: [
    {
      searchParams: 'all-ipad',
      name: 'Tất cả'
    },
    {
      searchParams: 'ipad-pro-m4',
      name: 'iPad Pro M4'
    },
    {
      searchParams: 'ipad-air-m2',
      name: 'iPad Air M2'
    },
    {
      searchParams: 'ipad-9',
      name: 'iPad 9'
    },
    {
      searchParams: 'ipad-10',
      name: 'iPad 10'
    },
    {
      searchParams: 'ipad-air-m1',
      name: 'iPad Air M1'
    },
    {
      searchParams: 'ipad-pro-m2',
      name: 'iPad Pro M2'
    },
    {
      searchParams: 'ipad-mini',
      name: 'iPad Mini'
    }
  ],
  ['apple-watch']: [
    {
      searchParams: 'all-apple-watch',
      name: 'Tất cả'
    },
    {
      searchParams: 'apple-watch-ultra-2',
      name: 'Apple Watch Ultra 2'
    },
    {
      searchParams: 'apple-watch-series-9',
      name: 'Apple Watch Series 9'
    },
    {
      searchParams: 'apple-watch-se-2023',
      name: 'Apple Watch SE 2023'
    },
    {
      searchParams: 'apple-watch-series-8',
      name: 'Apple Watch Series 8'
    },
    {
      searchParams: 'apple-watch-se-2022',
      name: 'Apple Watch SE 2022'
    }
  ],
  ['am-thanh']: [
    {
      searchParams: 'all-am-thanh',
      name: 'Tất cả'
    },
    {
      searchParams: 'tai-nghe',
      name: 'Tai nghe'
    },
    {
      searchParams: 'loa',
      name: 'Loa'
    }
  ],
  ['phu-kien']: [
    {
      searchParams: 'all-phu-kien',
      name: 'Tất cả'
    },
    {
      searchParams: 'phu-kien-iphone',
      name: 'Phụ kiện iPhone'
    },
    {
      searchParams: 'phu-kien-mac',
      name: 'Phụ kiện Mac'
    },
    {
      searchParams: 'phu-kien-ipad',
      name: 'Phụ kiện iPad'
    },
    {
      searchParams: 'phu-kien-apple-watch',
      name: 'Phụ kiện Apple Watch'
    },
    {
      searchParams: 'sac-du-phong',
      name: 'Sạc dự phòng'
    },
    {
      searchParams: 'adapter-sac',
      name: 'Adapter sạc'
    },
    {
      searchParams: 'cap-sac',
      name: 'Cáp sạc'
    },
    {
      searchParams: 'hub-cap-chuyen-doi',
      name: 'Hub, cáp chuyển đổi'
    },
    {
      searchParams: 'op-lung-vi-da-iphone',
      name: 'Ốp lưng, ví da iPhone'
    },
    {
      searchParams: 'op-lung-ipad',
      name: 'Ốp lưng iPad'
    },
    {
      searchParams: 'chuot-may-tinh',
      name: 'Chuột máy tính'
    },
    {
      searchParams: 'ban-phim-but',
      name: 'Bàn phím & Bút'
    },
    {
      searchParams: 'airtag',
      name: 'Airtag'
    },
    {
      searchParams: 'apple-tv',
      name: 'Apple TV'
    },
    {
      searchParams: 'mieng-dan',
      name: 'Miếng dán'
    },
    {
      searchParams: 'tui-dung-airpods',
      name: 'Túi đựng AirPods'
    },
    {
      searchParams: 'balo-tui-chong-soc',
      name: 'Balo, túi chống sốc'
    },
    {
      searchParams: 'gia-do-laptop',
      name: 'Giá đỡ laptop'
    },
    {
      searchParams: 'day-apple-watch',
      name: 'Dây Apple Watch'
    },
    {
      searchParams: 'micro-thu-am-podcast-livestream',
      name: 'Micro thu âm Podcast/Livestream'
    }
  ]
}

const LIST_OPTIONS_DROPDOWN = ['Nổi bật', 'Mới ra mắt', 'Bán chạy', 'Giá thấp đến cao', 'Giá cao đến thấp']

const FilterProduct = ({ productType = 'iphone' }) => {
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState()

  useEffect(() => {
    setTabs(LIST_TABS[productType])
    setActiveTab(LIST_TABS[productType][0].name)
  }, [])

  const handleTabClick = (tab) => {
    setActiveTab(tab.name)
  }

  return (
    <div id='filter-product' className='flex flex-col'>
      <div className={styles.tabs}>
        {tabs.length > 0 &&
          tabs.map((tab, index) => (
            <div
              key={index}
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
