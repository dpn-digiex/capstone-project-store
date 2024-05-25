import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CategorySection = () => {
  return (
    <div className='flex my-1.5 mb-10 pl-4'>
      <div className='categories w-1/6 h-[60px] bg-[#323232] rounded-lg mr-2.5 py-1.5 px-4'>
        <Link href='/blog' className='w-full h-full block transition duration-300'>
          <Image
            src='/categories/iPhone.png'
            alt='iPhone'
            width='48'
            height='48'
            className='float-left w-[48px] h-[48px] -mt-[3px]'
          ></Image>
          <h3 className='float-right text-xs leading-[45px] text-white mr-1'>iPhone</h3>
        </Link>
      </div>
      <div className='categories w-1/6 h-[60px] bg-[#323232] rounded-lg mr-2.5 py-1.5 px-4'>
        <Link href='/blog' className='w-full h-full block transition duration-300'>
          <Image
            src='/categories/Mac.png'
            alt='Mac'
            width='48'
            height='48'
            className='float-left w-[48px] h-[48px] -mt-[3px]'
          ></Image>
          <h3 className='float-right text-xs leading-[45px] text-white mr-1'>Mac</h3>
        </Link>
      </div>
      <div className='categories w-1/6 h-[60px] bg-[#323232] rounded-lg mr-2.5 py-1.5 px-4'>
        <Link href='/blog' className='w-full h-full block transition duration-300'>
          <Image
            src='/categories/iPad.png'
            alt='iPad'
            width='48'
            height='48'
            className='float-left w-[48px] h-[48px] -mt-[3px]'
          ></Image>
          <h3 className='float-right text-xs leading-[45px] text-white mr-1'>iPad</h3>
        </Link>
      </div>
      <div className='categories w-1/6 h-[60px] bg-[#323232] rounded-lg mr-2.5 py-1.5 px-4'>
        <Link href='/blog' className='w-full h-full block transition duration-300'>
          <Image
            src='/categories/Watch.png'
            alt='Watch'
            width='48'
            height='48'
            className='float-left w-[48px] h-[48px] -mt-[3px]'
          ></Image>
          <h3 className='float-right text-xs leading-[45px] text-white mr-1'>Watch</h3>
        </Link>
      </div>
      <div className='categories w-1/6 h-[60px] bg-[#323232] rounded-lg mr-2.5 py-1.5 px-4'>
        <Link href='/blog' className='w-full h-full block transition duration-300'>
          <Image
            src='/categories/Sound.png'
            alt='Sound'
            width='48'
            height='48'
            className='float-left w-[48px] h-[48px] -mt-[3px]'
          ></Image>
          <h3 className='float-right text-xs leading-[45px] text-white mr-1'>Sound</h3>
        </Link>
      </div>
      <div className='categories w-1/6 h-[60px] bg-[#323232] rounded-lg py-1.5 px-4'>
        <Link href='/blog' className='w-full h-full block transition duration-300'>
          <Image
            src='/categories/Accessories.png'
            alt='Accessories'
            width='48'
            height='48'
            className='float-left w-[48px] h-[48px] -mt-[3px]'
          ></Image>
          <h3 className='float-right text-xs leading-[45px] text-white mr-1'>Phụ kiện</h3>
        </Link>
      </div>
    </div>
  )
}

export default CategorySection
