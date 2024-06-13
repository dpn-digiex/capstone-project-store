import React from 'react'

const SkeletonComponent = () => {
  return (
    <div className='animate-pulse'>
      <div className='mb-2 h-2.5 w-[80%] rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2 h-2.5 w-[75%] rounded-full bg-gray-200 dark:bg-gray-700'></div>
    </div>
  )
}

export default SkeletonComponent
