import { FaApple } from 'react-icons/fa'

import Banner from '@/components/banner'
import Card from '@/components/card'

const MAPPING_TITLE = {
  ['iphone']: 'iPhone',
  ['ipad']: 'iPad',
  ['mac']: 'Macbook',
  ['apple-watch']: 'Apple Watch',
  ['am-thanh']: 'Tai nghe, loa',
  ['phu-kien']: 'Phụ kiện'
}

const ProductTypePage = async ({ isDefaultPage = false, params }) => {
  const bannerResponse = await fetch('http://localhost:3000//api/banner')
  const banners = await bannerResponse.json()

  const response = await fetch('http://localhost:3000/api/product', { cache: 'no-store' })
  const productList = await response.json()

  return (
    <div className='container'>
      <div className='flex items-end justify-center py-8'>
        {params?.productType !== 'phu-kien' && <FaApple className='w-12 h-12' />}
        <span className='text-3xl text-center'>{isDefaultPage ? 'iPhone' : MAPPING_TITLE?.[params?.productType]}</span>
      </div>
      <Banner banners={banners} />
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8'>
        {productList.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            name={product.name}
            currentPrice={product.currentPrice}
            originPrice={product.originPrice}
            discount={product.discount}
            message={product.message}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductTypePage
