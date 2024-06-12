import React from 'react'

import Banner from '@/components/banner'
import FlashSale from '@/components/flash-sale'
import { getProductHomePageService } from '@/services/product-service'

import AccessoriesSection from './_product-section/accessories/page'
import IPadSection from './_product-section/iPad/page'
import IPhoneSection from './_product-section/iPhone/page'
import MacSection from './_product-section/mac/page'
import SoundSection from './_product-section/sound/page'
import WatchSection from './_product-section/watch/page'

const HomePage = async () => {
  const bannerResponse = await fetch('http://localhost:3000/api/banner')
  const banners = await bannerResponse.json()

  const productList = await getProductHomePageService()
  return (
    <div className=''>
      <Banner banners={banners} />
      <div className='container'>
        <FlashSale renderSize={6} />
        <IPhoneSection productList={productList['iPhone']} />
        <MacSection productList={productList['Mac']} />
        <IPadSection productList={productList['iPad']} />
        <WatchSection productList={productList['Watch']} />
        <SoundSection productList={productList['Tai nghe, Loa']} />
        <AccessoriesSection productList={productList['Phụ kiện']} />
      </div>
    </div>
  )
}

export default HomePage
