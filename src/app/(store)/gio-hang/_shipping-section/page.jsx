import React, { useState } from 'react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

import Select from '@/components/select'
import SkeletonComponent from '@/components/skeleton'
import useFetch from '@/hooks/useFetch'
import { getAddressInfo, getDeliveryServiceId, getTransferFee } from '@/services/delivery-service'

import styles from './index.module.css'

const ShippingSection = ({ address, setAddress, setTransferFee }) => {
  const { isLoading: isLoadingAddress, response: provinceList } = useFetch(getAddressInfo)
  const { isLoading: isLoadingService, response: serviceId } = useFetch(getDeliveryServiceId)

  const [districtList, setDistrictList] = useState([])
  const [wardList, setWarsList] = useState([])
  const [serviceDeliveryId, setServiceDeliveryId] = useState(null)

  const handleSelectProvince = async (province) => {
    try {
      const response = await getAddressInfo({ province_id: province.ProvinceID })
      if (response === null) throw new Error('Thất bại')

      setAddress({
        provinceId: province.ProvinceID,
        provinceName: province.ProvinceName,
        districtId: -1,
        districtName: '',
        wardId: -1,
        wardName: '',
        detailAddress: ''
      })
      setDistrictList(response)
      setTransferFee(null)
    } catch (error) {
      console.log(error)
      toast.error('Xảy ra lỗi, vui lòng thử lại.')
    }
  }
  const handleSelectDistrict = async (district) => {
    try {
      setServiceDeliveryId(null)
      const response = await getAddressInfo({ district_id: district.DistrictID })
      const responseServiceId = await getDeliveryServiceId(district.DistrictID)
      if (response === null) throw new Error('Thất bại')

      setServiceDeliveryId(responseServiceId)
      setAddress((prev) => ({
        ...prev,
        districtId: district.DistrictID,
        districtName: district.DistrictName,
        wardId: -1,
        wardName: '',
        detailAddress: ''
      }))
      setWarsList(response)
      setTransferFee(null)
    } catch (error) {
      console.log(error)
      toast.error('Xảy ra lỗi, vui lòng thử lại.')
    }
  }
  const handleSelectWard = async (ward) => {
    try {
      setAddress((prev) => ({ ...prev, wardId: ward.WardCode, wardName: ward.WardName, detailAddress: '' }))
      const response = await getTransferFee({
        to_district_id: address.districtId,
        to_ward_code: ward.WardCode,
        service_id: serviceDeliveryId
      })
      setTransferFee(response.total)
    } catch (error) {
      console.log(error)
      toast.error('Xảy ra lỗi, vui lòng thử lại.')
    }
  }

  if (isLoadingAddress || isLoadingService) return <SkeletonComponent />

  return (
    <div className='px-6 py-3 bg-[#515965] shadow-lg mt-1 text-xs'>
      <h3 className='text-sm font-bold'>Hình thức nhận hàng</h3>
      <h4 className='text-[11px] text-[#ccc]'>* Đơn vị vận chuyển (Giao Hàng Nhanh)</h4>

      <div className='grid gap-3 mt-2'>
        <div className='flex items-center gap-6'>
          <label htmlFor='shipping-in-place' className='flex items-center gap-1 cursor-pointer'>
            <input
              id='shipping-in-place'
              type='radio'
              name='shipping-method'
              value='in-place'
              className='h-3.5 w-3.5 accent-slate-700'
              defaultChecked
            />
            <span>Giao tận nơi</span>
          </label>
        </div>
        <div className='grid grid-cols-2 auto-rows-[1fr] gap-3 p-2 bg-slate-500 rounded-md'>
          <Select
            placeholder='Chọn Tỉnh/Thành'
            emptyPlaceholder='Không có dữ liệu'
            className='border-[0.125rem] border-slate-300 rounded-md bg-slate-500'
            dropdownClassName={styles['shipping-dropdown']}
            options={provinceList}
            valueKey='ProvinceID'
            renderKey='ProvinceName'
            filter
            inputPlaceholder='Tìm theo tỉnh/thành'
            name='shipping-province'
            onSelect={handleSelectProvince}
          />
          <Select
            key={'provice' + address.provinceId}
            placeholder='Chọn Quận/Huyện'
            emptyPlaceholder='Không có dữ liệu'
            className='border-[0.125rem] border-slate-300 rounded-md bg-slate-500'
            dropdownClassName={styles['shipping-dropdown']}
            filter
            inputPlaceholder='Tìm theo quận/huyện'
            name='shipping-district'
            disabled={address.provinceId === -1}
            options={districtList}
            valueKey='DistrictID'
            renderKey='DistrictName'
            onSelect={handleSelectDistrict}
          />
          <Select
            key={'district' + address.districtId}
            placeholder='Chọn Phường/Xã'
            emptyPlaceholder='Không có dữ liệu'
            className='border-[0.125rem] border-slate-300 rounded-md bg-slate-500'
            dropdownClassName={styles['shipping-dropdown']}
            filter
            inputPlaceholder='Tìm theo phường/xã'
            name='shipping-commune'
            disabled={address.districtId === -1}
            options={wardList}
            valueKey='WardCode'
            renderKey='WardName'
            onSelect={handleSelectWard}
          />
          <div className={clsx(styles['custom-input'], 'bg-slate-500')}>
            <input
              key={'ward' + address.wardId}
              id='shipping-street'
              name='shipping-street'
              type='text'
              placeholder='Số nhà, tên đường'
              className='p-2 border-slate-300 border-[0.125rem] rounded-md outline-none bg-transparent w-full disabled:opacity-50'
              disabled={address.wardId === -1}
              value={address.detailAddress}
              onChange={(e) => setAddress((prev) => ({ ...prev, detailAddress: e.target.value }))}
            />
            <label
              htmlFor='shipping-street'
              className={clsx(styles['custom-input-label'], {
                'opacity-50': address.wardId === -1
              })}
            >
              Số nhà, tên đường
            </label>
          </div>
        </div>
        <div className={clsx(styles['custom-input'], 'bg-[#515965]')}>
          <input
            id='shipping-note'
            name='note'
            type='text'
            placeholder='Nhập ghi chú (nếu có)'
            className='p-3 border-slate-300 border-[0.125rem] rounded-lg outline-none bg-transparent w-full'
          />
          <label htmlFor='shipping-note' className={styles['custom-input-label']}>
            Nhập ghi chú (nếu có)
          </label>
        </div>
      </div>
    </div>
  )
}

export default ShippingSection
