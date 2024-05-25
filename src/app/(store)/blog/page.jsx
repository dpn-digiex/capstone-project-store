import React from 'react'

import CategorySection from './_category-section/page'
import FeaturedSection from './_featured-section/page'

const BlogPage = () => {
  return (
    <section className='max-w-[1200px] min-w-[980px] mx-auto'>
      <FeaturedSection />
      <CategorySection />
    </section>
  )
}

export default BlogPage
