import React from 'react'

import Footer from '@/layouts/footer'
import Header from '@/layouts/header'

const StoreLayout = ({ children }) => {
  return (
    <div className='w-full h-screen'>
      <Header />
      <section className='min-h-[50vh]'>{children}</section>
      <Footer />
    </div>
  )
}

export default StoreLayout
