import Link from 'next/link'

import SliderGallery from '@/components/slider-gallery'
import StatusLabel from '@/components/status-label'

import ListVersions from './components/list-versions'
import { getProductDetail } from './apis'
import styles from './index.module.css'
import { COLOR_LIST } from './raw-data'

const ProductDetailPage = async ({ params: { productType, productId }, searchParams }) => {
  const product = await getProductDetail({ params: { productType, productId } })
  if (!product) return null

  const { version = product.versions[0].name, color = COLOR_LIST[0].id } = searchParams
  const slug = `/${productType}/${productId}`
  const currentVersion = product.versions.find((item) => item.name === version)
  const currentVariant = product.variants.find((item) => item.versionId === currentVersion.id)
  const imgsGallery = currentVariant.options.find((item) => item.colorId === color)?.pictures
  console.log('imgsGallery', imgsGallery)

  return (
    <div className={styles['page-container']}>
      <section className={styles['section-detail']}>
        <div className={styles['gallery']}>
          <SliderGallery listImg={imgsGallery} />
        </div>
        <div className={styles['info']}>
          <div className='flex flex-col w-full'>
            <div className='flex items-center gap-2'>
              <p className='text-xl'>{product.name}</p>
              {product?.status && <StatusLabel label={product.status} />}
            </div>
            {product.versions.length > 0 && <ListVersions list={product.versions} />}
            {currentVariant.options.length > 0 && (
              <div className='flex flex-col'>
                <span>{`Màu: ${color}`}</span>
                <div className='flex gap-3 flex-wrap'>
                  {currentVariant.options.map((item, index) => {
                    return (
                      <Link key={index} href={`${slug}?version=${version}&color=${item.colorId}`}>
                        <div
                        // className={clsx(`w-[40px] h-[40px] rounded-full`,
                        //   ['border-[1px] border-[#0071e3]']: color === item.colorId
                        // )}
                        // style={{ backgroundColor: item.hex }}
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
