import React from 'react'

import { formatCurrency } from '@/utils'

const SummarySection = ({ total = 0 }) => {
  return (
    <div className='px-6 py-3 bg-[#515965] shadow-lg mt-1 text-xs rounded-b-lg'>
      <div className='flex items-center justify-between py-2 border-b-[0.0625rem] border-slate-500'>
        <span className='font-bold'>Tổng tiền:</span>
        <span className='font-bold text-[#ed1c24]'>{formatCurrency(total)}</span>
      </div>
      <div className='flex items-center justify-between py-2'>
        <span className=''>Điểm tích lũy quà tặng VIP:</span>
        <span className=''>{total / 1000} điểm</span>
      </div>
      <button className='flex items-center justify-center w-full p-3 rounded-lg bg-sky-600 font-bold' type='button'>
        Đặt hàng
      </button>
      <p className='text-[0.65rem] text-center mt-3'>Bạn có thể lựa chọn các hình thức thanh toán ở bước sau</p>
    </div>
  )
}

export default SummarySection
