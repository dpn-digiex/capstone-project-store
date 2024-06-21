import { Toaster } from 'react-hot-toast'
import { Inter } from 'next/font/google'

import Footer from '@/layouts/footer'
import Header from '@/layouts/header'

import './globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'PTT Shop'
}
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Toaster position='top-right' />
        <div className='w-full h-screen'>
          <Header />
          <div className='min-h-[50vh]'>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
