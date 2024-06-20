import React from 'react'
import clsx from 'clsx'

import { formatCurrency } from '@/utils'

const SummarySection = ({ transferFee = 0, total = 0, isSubmitable = false }) => {
  return (
    <div className='px-6 py-3 bg-[#515965] shadow-lg mt-1 text-xs rounded-b-lg'>
      <div className='flex items-center justify-between py-2 border-b-[0.0625rem] border-slate-500'>
        <span className='text-[0.75rem] text-white/50'>Phí vận chuyển (dự kiến):</span>
        <span className='text-[0.75rem] text-white/50'>{formatCurrency(transferFee)}</span>
      </div>
      <div className='flex items-center justify-between py-2 border-b-[0.0625rem] border-slate-500'>
        <span className='font-bold'>Tổng tiền:</span>
        <span className='font-bold text-red-400'>{formatCurrency(total)}</span>
      </div>
      <div className='flex items-center justify-between py-2'>
        <span className=''>Điểm tích lũy quà tặng VIP:</span>
        <span className=''>{total / 1000} điểm</span>
      </div>
      <button
        className={clsx(
          'flex items-center justify-center w-full p-3 rounded-lg bg-sky-500 font-bold',
          'disabled:opacity-50 disabled:pointer-events-none'
        )}
        type='submit'
        disabled={!isSubmitable}
      >
        Đặt hàng
      </button>
      <p className='text-[0.65rem] text-center mt-3'>Bạn có thể lựa chọn các hình thức thanh toán ở bước sau</p>
    </div>
  )
}

export default SummarySection
