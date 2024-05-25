import React from 'react'

import Footer from '@/layouts/footer'
import Header from '@/layouts/header'

const StoreLayout = ({ children }) => {
  return (
    <div className='w-full h-screen'>
      <Header />
      <div className='min-h-[50vh]'>{children}</div>
      <Footer />
    </div>
  )
}

export default StoreLayout
