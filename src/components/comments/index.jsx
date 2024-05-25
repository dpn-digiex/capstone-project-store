'use client'
import React, { useEffect, useState } from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import { IoStar } from 'react-icons/io5'

import { RAW_PRODUCT_DETAIL } from '@/app/(store)/(product)/[productType]/[productId]/raw-data'

import Button from '../button'
import ModalRating from '../modal-rating'
import ProgressBar from '../progress-bar'
import StarsRating from '../stars-rating'

import styles from './index.module.css'

const COMMENTS_DATA = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    content:
      'Vừa mua dc 2 ngày ms để ý lỏng nút giảm âm lượng, mấy nút khác rất chắc chắn , nút giảm bị lỏng như hàng dỏm ý',
    date: '2021-09-01',
    rating: 2,
    numberOfLikes: 10
  },
  {
    id: 2,
    name: 'Nguyễn Văn B',
    content: 'Sản phẩm rất tốt, giá cả hợp lý',
    date: '2021-09-02',
    rating: 4,
    numberOfLikes: 20
  },
  {
    id: 3,
    name: 'Nguyễn Văn C',
    content: 'Sản phẩm rất tốt, giá cả hợp lý',
    date: '2021-09-03',
    rating: 3,
    numberOfLikes: 30
  },
  {
    id: 4,
    name: 'Nguyễn Văn D',
    content:
      'm mới mua đt được 3 ngày, mỗi lần vô app Shopee hay sạc đt đều nóng lên bất thường, rất nóng.Shop cho m hỏi lỗi đó có được đổi máy mới không.Máy đã cập nhật ios 17.4.1',
    date: '2021-09-04',
    rating: 4,
    numberOfLikes: 40
  },
  {
    id: 5,
    name: 'Nguyễn Văn E',
    content: 'Sản phẩm rất tốt, giá cả hợp lý',
    date: '2021-09-05',
    rating: 5,
    numberOfLikes: 50
  },
  {
    id: 6,
    name: 'Nguyễn Văn F',
    content: 'Sản phẩm rất tốt, giá cả hợp lý',
    date: '2021-09-06',
    rating: 5,
    numberOfLikes: 60
  }
]

const METRICS = [
  {
    id: 1,
    rating: 5,
    totalPercentage: 0
  },
  {
    id: 2,
    rating: 4,
    totalPercentage: 0
  },
  {
    id: 3,
    rating: 3,
    totalPercentage: 0
  },
  {
    id: 4,
    rating: 2,
    totalPercentage: 0
  },
  {
    id: 5,
    rating: 1,
    totalPercentage: 0
  }
]

const Comments = ({ productId = null, productData = RAW_PRODUCT_DETAIL }) => {
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [metricComments, setMetricComments] = useState(METRICS)
  const [isShowAllComments, setIsShowAllComments] = useState(false)
  const [isOpenModalRating, setIsOpenModalRating] = useState(false)

  useEffect(() => {
    initStatesComments(productId)
  }, [])

  const initStatesComments = async (productId) => {
    console.log('fetchCommentsProduct', productId)
    setComments(COMMENTS_DATA)
    setTotalComments(COMMENTS_DATA.length)
    setAvgRating(
      +(
        COMMENTS_DATA.reduce((acc, comment) => {
          return acc + comment.rating
        }, 0) / COMMENTS_DATA.length
      ).toFixed(1)
    )
    setMetricComments(
      METRICS.map((metric) => {
        const totalRating = COMMENTS_DATA.filter((comment) => comment.rating === metric.rating).length
        return {
          ...metric,
          totalPercentage: +((totalRating / COMMENTS_DATA.length) * 100).toFixed(0)
        }
      })
    )
  }

  return (
    <section className={styles['comments-section']}>
      <div className='mx-auto max-w-[780px] p-7 border-solid border-[1px] border-[#e5e5e5] rounded-[12px]'>
        <div className='flex flex-col'>
          <h1 className='font-bold text-[1.5rem] text-black'>{`Đánh giá ${productData.name}`}</h1>
          <div className='flex gap-3 flex-wrap items-center'>
            <span className='text-orange text-[1.5rem] font-bold'>{avgRating}</span>
            <StarsRating ratedStarValue={avgRating} sizeIcon={24} isShowLabel={false} customStyle='!gap-1.5' />
            <span className='text-blue text-[0.8rem]'>{`${totalComments} đánh giá`}</span>
          </div>
          {metricComments.map((metric) => (
            <div key={metric.id} className='flex items-center gap-1 my-[4px]'>
              <span className='text-[13px] text-black w-[8px]'>{`${metric.rating}`}</span>
              <IoStar size={12} fill='' />
              <ProgressBar progress={metric.totalPercentage} customStyle='max-w-[250px]' />
              <span className='text-[13px] text-black font-bold'>{`${metric.totalPercentage}%`}</span>
            </div>
          ))}

          <div id='comments' className='flex flex-col'>
            {(isShowAllComments ? comments : comments.slice(0, 3)).map((comment) => (
              <div key={comment.id} className='flex flex-col gap-2 py-4 border-solid border-b-[1px] border-[#e5e5e5]'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-black font-bold'>{comment.name}</span>
                  <span className='text-xxs text-black'>{comment.date}</span>
                </div>
                <StarsRating ratedStarValue={comment.rating} sizeIcon={16} isShowLabel={false} customStyle='!gap-0.5' />
                <p className='text-xs text-black'>{comment.content}</p>
                <div className='flex items-center gap-1'>
                  {likes.includes(comment.id) ? (
                    <BiSolidLike stroke='#4F4F4F' fill='#4F4F4F' size={15} className='cursor-pointer' />
                  ) : (
                    <BiLike
                      stroke='#4F4F4F'
                      fill='#4F4F4F'
                      size={15}
                      className='cursor-pointer'
                      onClick={() => setLikes((prev) => [...prev, comment.id])}
                    />
                  )}
                  <span className='text-[0.65rem] text-[#4F4F4F]'>{`Hữu ích (${comment.numberOfLikes})`}</span>
                  <span className='text-[0.65rem] text-[#8f9bb3]'>{`|  Đã dùng khoảng 2 ngày`}</span>
                </div>
              </div>
            ))}

            <div className='flex gap-4 mt-6'>
              <Button mode='outline' onClick={() => setIsShowAllComments(!isShowAllComments)}>
                {isShowAllComments ? 'Thu gọn' : 'Xem tất cả đánh giá'}
              </Button>
              <Button onClick={() => setIsOpenModalRating(true)}>Viết đánh giá</Button>
            </div>
          </div>
        </div>
      </div>

      {isOpenModalRating && (
        <ModalRating productData={productData} isOpenModal={isOpenModalRating} setIsOpenModal={setIsOpenModalRating} />
      )}
    </section>
  )
}

export default Comments
