import React from 'react'

import Card from '@/components/card'
import { getCategoryListService } from '@/services/category-service'
import { getProductListByCategoryService } from '@/services/product-service'

import BtnViewMore from './_components/btnViewMore'

const SearchPage = async ({ searchParams }) => {
  const categoryList = await getCategoryListService()
  const activeCategory = categoryList.find((category) => category.slug === searchParams.category)
  const response = await getProductListByCategoryService({
    category_id: activeCategory?._id,
    page_number: 1,
    page_size: searchParams.pageSize ?? 8,
    search: searchParams.search
  })
  const productList = response.products
  const pagination = response.pagination // currentPage, pageSize, totalProducts, totalPages
  return (
    <div className='container'>
      <h1 className='text-lg mt-4'>
        Kết quả tìm kiếm cho: <span className='capitalize'>{searchParams.category}</span> - {searchParams.search}
      </h1>
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
              redirectUrl={`${searchParams.category}/${product.slug}`}
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

export default SearchPage
