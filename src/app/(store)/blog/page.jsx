import React from 'react'

import BlogListSection from './_blog-list-section/page'
import CategorySection from './_category-section/page'
import FeaturedSection from './_featured-section/page'

const BlogPage = () => {
  return (
    <div className='overflow-auto'>
      <section className='max-w-[1200px] min-w-[980px] mx-auto'>
        <FeaturedSection />
        <CategorySection />
      </section>
      <section className='max-w-[1200px] min-w-[980px] mx-auto'>
        <BlogListSection />
      </section>
    </div>
  )
}

export default BlogPage
