import React, { useState } from 'react'

const PAYMENT_METHODS = [
  // {
  //   value: 'cod',
  //   label: 'Thanh toán tiền mặt khi nhận hàng'
  // },
  {
    value: 'transfer',
    label: 'Chuyển khoản ngân hàng'
  }
]
const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState({ value: 'transfer', label: 'Chuyển khoản ngân hàng' })
  return (
    <div className='text-sm flex flex-col gap-3'>
      <span className='font-bold'>Chọn hình thức thanh toán:</span>
      <div className='flex flex-col gap-2'>
        {PAYMENT_METHODS.map((method) => (
          <label key={method.value} htmlFor={method.value} className='flex items-center gap-1 cursor-pointer'>
            <input
              id={method.value}
              type='radio'
              name='payment-method'
              value={method.value}
              className='h-3.5 w-3.5 accent-slate-700'
              defaultChecked={selectedMethod.value === method.value}
              onChange={() => setSelectedMethod(method)}
            />
            <span>{method.label}</span>
          </label>
        ))}
      </div>
      <button className='mx-12 p-3 uppercase bg-sky-500 rounded-md'>Xác nhận</button>
      <div className='flex flex-col items-center g-2'>
        <span>
          Khi cần hỗ trợ vui lòng gọi <u className='text-sky-300'>0321654987</u> (08h00 - 21h30)
        </span>
      </div>
    </div>
  )
}

export default PaymentMethods
