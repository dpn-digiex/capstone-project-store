import { Inter } from 'next/font/google'

import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import ReduxProvider from '@/redux/provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
