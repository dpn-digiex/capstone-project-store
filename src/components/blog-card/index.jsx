import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const BlogCard = ({ image, name, imageClass }) => {
  return (
    <div className='group border-b border-zinc-600 py-4'>
      <Link className='block overflow-hidden transition duration-300' href=''>
        <div className='float-left mr-4 mb-2'>
          <Image
            alt={name}
            src={image}
            width={284}
            height={160}
            priority
            className={clsx('w-full h-full rounded-lg float-left max-w-[330px]', imageClass)}
          />
        </div>

        <h3 className='group-hover:text-sky-500 leading-5 text-base text-white font-light text-ellipsis'>{name}</h3>

        <div className='text-xs text-[#999] mt-2.5'>
          <span className='text-xs text-zinc-500'>5 giờ trước</span>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
