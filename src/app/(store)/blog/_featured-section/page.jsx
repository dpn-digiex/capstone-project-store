import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedSection = () => {
  return (
    <div className='my-8 overflow-hidden'>
      <div className='my-4 mx-0 pl-4'>
        <div className='w-[65.6%] mr-2 float-left'>
          <Link href='/blog' className='transition duration-300'>
            <div className='group relative mb-1 overflow-hidden rounded-l-3xl'>
              <Image
                src='/blogs/blog1.png'
                alt='Telegram Web là gì? Cách đăng nhập Telegram Web để nhắn tin ngay trên trình duyệt mà không cần tải app'
                width='1920'
                height='1280'
                className='group-hover:scale-125 transition-all ease-in-out duration-500'
              ></Image>
              <h3 className='absolute bottom-0 bg-gradient-to-b from-transparent to-black text-white font-bold text-2xl leading-8 px-6 py-8'>
                Telegram Web là gì? Cách đăng nhập Telegram Web để nhắn tin ngay trên trình duyệt mà không cần tải app
              </h3>
            </div>
          </Link>
        </div>
        <div className='w-[32.4%] float-left'>
          <Link href='/blog' className='transition duration-300'>
            <div className='group relative mb-1 overflow-hidden rounded-tr-3xl'>
              <Image
                src='/blogs/blog2.png'
                alt='Cách đăng nhập Zalo bằng mã QR cực nhanh và tiện lợi, không cần phải nhớ hay sợ lộ mật khẩu'
                width='1920'
                height='1280'
                className='group-hover:scale-125 transition-all ease-in-out duration-500'
              ></Image>
              <h3 className='absolute bottom-0 bg-gradient-to-b from-transparent to-black text-white font-bold text-xs leading-4 p-4'>
                Cách đăng nhập Zalo bằng mã QR cực nhanh và tiện lợi, không cần phải nhớ hay sợ lộ mật khẩu
              </h3>
            </div>
          </Link>
        </div>
        <div className='w-[32.4%] float-left'>
          <Link href='/blog' className='transition duration-300'>
            <div className='group relative w-full mb-1 overflow-hidden rounded-br-3xl'>
              <Image
                src='/blogs/blog3.png'
                alt='Cách đăng xuất Facebook trên điện thoại, máy tính để bảo vệ tài khoản của bạn khỏi những người lạ'
                width='1920'
                height='1280'
                className='group-hover:scale-125 transition-all ease-in-out duration-500'
              ></Image>
              <h3 className='absolute bottom-0 bg-gradient-to-b from-transparent to-black text-white font-bold text-xs leading-4 p-4'>
                Cách đăng xuất Facebook trên điện thoại, máy tính để bảo vệ tài khoản của bạn khỏi những người lạ
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedSection
