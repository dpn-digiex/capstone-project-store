import React from 'react'
import { MdDelete, MdEdit, MdLocationOn } from 'react-icons/md'

const AddressCard = ({ address = {} }) => {
  return (
    <div className='py-4 px-4 rounded-md bg-slate-400'>
      <div className='flex items-center justify-between border-b border-slate-300 pb-4'>
        <span className='flex items-center gap-1 text-base'>
          <MdLocationOn /> Địa chỉ
        </span>
        <div className='flex items-center gap-2'>
          <button className='btn btn-rounded border-none bg-sky-500 text-white py-1.5 gap-1 font-normal text-sm'>
            <MdEdit /> Sửa
          </button>
          <button className='btn btn-rounded border-none bg-red-500 text-white py-1.5 gap-1 font-normal text-sm'>
            <MdDelete /> Xóa
          </button>
        </div>
      </div>
      <div className='pt-2 flex flex-col gap-3'>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>Tên người nhận:</span>
          <span>Nguyễn Văn B</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>Email:</span>
          <span>nguyenvanb@gmail.com</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>Số điện thoại:</span>
          <span>0123456789</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>Địa chỉ:</span>
          <span>01 Võ Văn Ngân, P. Linh Chiểu, Tp. Thủ Đức, Tp. Hồ Chí Minh, Việt Nam</span>
        </div>
      </div>
    </div>
  )
}

export default AddressCard
