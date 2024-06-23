import { FaApple } from 'react-icons/fa'

import { BANNERS_RAW } from '@/app/api/banner/route'
import Banner from '@/components/banner'
import Card from '@/components/card'
import FilterProduct from '@/components/filter-product'
import { getCategoryListService } from '@/services/category-service'
import { getProductListByCategoryService } from '@/services/product-service'

import BtnViewMore from './_components/btnViewMore'

const MAPPING_TITLE = {
  ['iphone']: 'iPhone',
  ['ipad']: 'iPad',
  ['mac']: 'Macbook',
  ['apple-watch']: 'Apple Watch',
  ['am-thanh']: 'Tai nghe, loa',
  ['phu-kien']: 'Phụ kiện'
}

const ProductTypePage = async ({ isDefaultPage = false, params, searchParams }) => {
  const banners = BANNERS_RAW

  const categoryList = await getCategoryListService()
  const activeCategory = categoryList.find((category) => category.slug === params.productType)
  const response = await getProductListByCategoryService({
    category_id: activeCategory?._id,
    sub_category_id: searchParams.sub,
    page_number: 1,
    page_size: searchParams.pageSize ?? 8
  })
  const productList = response.products
  const pagination = response.pagination // currentPage, pageSize, totalProducts, totalPages

  return (
    <div className='container'>
      <div className='flex items-center justify-center py-8 h-[100px]'>
        {params?.productType !== 'phu-kien' && (
          <div className='w-[45px] h-[45px] flex items-start justify-center'>
            <FaApple size={38} />
          </div>
        )}
        <span className='text-[30px] text-center'>
          {isDefaultPage ? 'iPhone' : MAPPING_TITLE?.[params?.productType]}
        </span>
      </div>
      <Banner banners={banners} />
      <div className='my-8'>
        <FilterProduct productType={params?.productType} subCategories={activeCategory?.subCategories} />
      </div>
      {productList?.length === 0 ? (
        <p className='text-center pb-10 text-white/50 text-lg'>Sản phẩm đang cập nhật...</p>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8'>
          {productList.map((product) => (
            <Card
              key={product._id}
              image={product.mainImageUrl}
              name={product.name}
              currentPrice={product.currentPrice}
              originPrice={product.originPrice}
              discount={product.discount}
              message={product.message}
              redirectUrl={`${params?.productType}/${product.slug}`}
              variants={product.variants}
            />
          ))}
        </div>
      )}
      {pagination.currentPage * pagination.pageSize < pagination.totalProducts ? (
        <BtnViewMore
          count={pagination.totalProducts - pagination.pageSize * pagination.currentPage}
          pageSize={pagination.pageSize}
          currentPage={pagination.currentPage}
          loadSize={8}
        />
      ) : null}
    </div>
  )
}

export default ProductTypePage
