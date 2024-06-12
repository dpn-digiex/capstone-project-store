import { FaBoxOpen } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa6'
import { GoShieldCheck } from 'react-icons/go'
import { MdOutlineWifiProtectedSetup } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import Link from 'next/link'

import Comments from '@/components/comments'
import Reviews from '@/components/reviews'
import SliderGallery from '@/components/slider-gallery'
import StatusLabel from '@/components/status-label'
import { getProductDetailService } from '@/services/product-service'

import Suggestions from './_sections/suggestions'
import VariantInfo from './_sections/variant-info'
import styles from './index.module.css'

const ProductDetailPage = async ({ params }) => {
  const { productId: productSlug } = params
  const product = await getProductDetailService('6667e311614afe162269e6cc')

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
            <VariantInfo product={product} />
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
      <Suggestions productId={product._id} productData={product} />
      <Reviews productId={product._id} productData={product} />
      <Comments productId={product._id} productData={product} />
    </div>
  )
}

export default ProductDetailPage
