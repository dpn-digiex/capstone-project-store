import { FaBoxOpen } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa6'
import { GoShieldCheck } from 'react-icons/go'
import { MdOutlineWifiProtectedSetup } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import Link from 'next/link'

import ButtonLink from '@/components/button-link'
import Comments from '@/components/comments'
import Reviews from '@/components/reviews'
import SliderGallery from '@/components/slider-gallery'
import StatusLabel from '@/components/status-label'
import { formatCurrency } from '@/utils'

import ListColors from './_sections/list-colors'
import ListVariants from './_sections/list-variants'
import Suggestions from './_sections/suggestions'
import styles from './index.module.css'
import { RAW_PRODUCT_DETAIL } from './raw-data'

const ProductDetailPage = async ({ params, searchParams }) => {
  const product = RAW_PRODUCT_DETAIL
  const { version = null, color = null } = searchParams

  return (
    <div className={styles['page-container']}>
      <section className={styles['section-detail']}>
        <div className={styles['gallery']}>
          <SliderGallery listImg={product.images} />
        </div>
        <div className={styles['info']}>
          <div className='flex flex-col w-full gap-3'>
            <div className='flex items-center gap-2'>
              <p className='text-[1.8rem] font-bold'>{product.name}</p>
              {product?.status && <StatusLabel label={product.status} />}
            </div>
            <span className='text-xs'>Giá và khuyến mãi tại: Hồ Chí Minh</span>
            <div className='flex flex-wrap gap-2'>
              <span className='text-[1.5rem] font-bold'>{formatCurrency(product.currentPrice)}</span>
              <span className='text-[1.375rem] line-through'>{formatCurrency(product.price)}</span>
              <span className='text-[1.375rem]'>{`${product.discount}%`}</span>
            </div>
            {product.variantOpts.length > 0 && <ListVariants list={product.variantOpts} />}
            {product.colorOpts.length > 0 && <ListColors list={product.colorOpts} />}
            <div className='flex flex-col bg-[#2f3033] p-4 rounded-[10px]'>
              <p className='text-sm font-bold'>Khuyễn mãi</p>
              <p className='text-xs'>Giá và khuyến mãi dự kiến áp dụng đến 23:00 | 01/05</p>
              <div className='border-b-[1px] border-solid border-[#414141] my-2' />
              <li className='text-xs'>
                Nhập mã VNPAYTGDD2 giảm ngay 1% (tối đa 200.000đ) khi thanh toán qua VNPAY-QR, áp dụng cho đơn hàng từ 3
                Triệu
                <Link href='/' className='text-skyBlue cursor-pointer'>
                  (Xem chi tiết tại đây)
                </Link>
              </li>
            </div>
            <ButtonLink href='/payment' customStyle={'w-full'} customStyleText='text-[1rem] !font-bold' mode='primary'>
              Mua ngay
            </ButtonLink>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <div className='w-[32px] h-[32px] flex items-center justify-center'>
                  <FaBoxOpen size={30} />
                </div>
                <p className='text-xs font-normal'>
                  Bộ sản phẩm gồm: Sách hướng dẫn, Thùng máy, Cáp ( USB-C to MagSafe 3 ), Sạc Laptop Apple ( 30W USB-C )
                </p>
              </div>
              <div className='flex gap-2'>
                <div className='w-[32px] h-[32px] flex items-center justify-center'>
                  <MdOutlineWifiProtectedSetup size={30} />
                </div>
                <span className='text-xs font-normal'>
                  Hư gì đổi nấy 12 tháng tại các cửa hàng trên toàn quốc{' '}
                  <Link href='/' className='text-skyBlue cursor-pointer'>
                    (Xem chi tiết chính sách bảo hành, đổi trả)
                  </Link>
                </span>
              </div>
              <div className='flex gap-2'>
                <div className='w-[32px] h-[32px] flex items-center justify-center'>
                  <GoShieldCheck size={28} />
                </div>
                <p className='text-xs font-normal'>Bảo hành chính hãng 1 năm</p>
              </div>
              <div className='flex gap-2'>
                <div className='w-[32px] h-[32px] flex items-center justify-center'>
                  <TbTruckDelivery size={28} />
                </div>
                <p className='text-xs font-normal'>
                  Giao hàng nhanh toàn quốc{' '}
                  <Link href='/' className='text-skyBlue cursor-pointer'>
                    (Xem chi tiết chính sách giao hàng)
                  </Link>
                </p>
              </div>
              <div className='flex gap-2'>
                <div className='w-[32px] h-[32px] flex items-center justify-center'>
                  <FaPhone size={20} />
                </div>
                <p className='text-xs font-normal text-center'>
                  Tổng đài{' '}
                  <a href='tel:+84947443063' className='text-skyBlue cursor-pointer'>
                    (0947.443.064){' '}
                  </a>
                  (7:30 - 22:00)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Suggestions productId={product.id} productData={product} />
      <Reviews productId={product.id} productData={product} />
      <Comments productId={product.id} productData={product} />
    </div>
  )
}

export default ProductDetailPage
