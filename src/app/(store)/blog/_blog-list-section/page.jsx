import React from 'react'

import BlogCard from '@/components/blog-card'

const BlogListSection = async () => {
  const response = await fetch('http://localhost:3000/api/blog', { cache: 'no-store' })
  const blogList = await response.json()
  return (
    <div className='float-left w-[63.3%] mr-2'>
      <div className='py-5 px-2.5'>
        <h1 className='inline-block text-white font-bold text-bold leading-[23px] px-2.5 tracking-[.03em]'>MỚI NHẤT</h1>
      </div>
      <div className='mb-4 mx-0 pl-5'>
        {blogList.map((blog) => (
          <BlogCard key={blog.id} image={blog.image} name={blog.name} />
        ))}
      </div>
    </div>
  )
}

export default BlogListSection
