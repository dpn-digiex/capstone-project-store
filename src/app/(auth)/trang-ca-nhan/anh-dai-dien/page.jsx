'use client'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import clsx from 'clsx'
import Image from 'next/image'

import CropperComponent from '@/components/cropper'
import ImageUploadComponent from '@/components/image-upload'
import { useAppStore } from '@/libs/zustand'
import { updateAvatar } from '@/services/user-service'

const ProfileAvatar = () => {
  const [avatarSource, setAvatarSource] = useState('')
  const [previewAvatar, setPreviewAvatar] = useState('')
  const avatarRef = useRef()
  const cropperRef = useRef()
  const setUser = useAppStore((state) => state.setUser)

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    avatarRef.current = file
    const imageURL = URL.createObjectURL(avatarRef.current)
    setAvatarSource(imageURL)
  }
  const handleSetAvatar = async () => {
    try {
      const croppedImageFile = await cropperRef.current.cropImage(
        cropperRef.current.canvas,
        cropperRef.current.context,
        cropperRef.current.source
      )
      setPreviewAvatar(croppedImageFile)
      URL.revokeObjectURL(avatarSource)
      setAvatarSource('')
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleUpdateAvatar = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('image', previewAvatar)
      const result = await updateAvatar(formData)
      if (result === null) throw new Error('Thất bại')
      setUser({ avatar: result.avatar })
      toast.success('Cập nhật ảnh đại diện thành công.')
    } catch (error) {
      console.log(error)
      toast.error('Lưu ảnh thất bại, vui lòng thử lại.')
    }
  }

  return (
    <form className='flex flex-col items-center gap-2' onSubmit={handleUpdateAvatar}>
      <ImageUploadComponent
        // name='image'
        accept='.png,.jpg,.jpeg'
        acceptString='Tải lên tệp PNG, JPG hoặc JPEG'
        onChange={handleChangeAvatar}
      />
      {previewAvatar === '' ? null : (
        <div className='flex flex-col gap-2 items-center'>
          <div className={clsx('overflow-hidden rounded-full')}>
            <Image
              src={URL.createObjectURL(previewAvatar)}
              alt={previewAvatar.name}
              className={clsx('object-fill object-center rounded-full')}
              width={180}
              height={180}
            />
          </div>
          <button type='submit' className='rounded-md px-8 py-2 bg-slate-900'>
            Cập nhật
          </button>
        </div>
      )}
      {avatarSource === '' ? null : (
        <div className={clsx('fixed inset-0 bg-black/75 backdrop-blur-sm', 'flex items-center justify-center')}>
          <div className='w-[90vw] rounded-lg bg-slate-700 p-5 lg:w-1/2'>
            <div className='flex items-center justify-between'>
              <h3 className='text-header font-bold'>Update avatar</h3>
              <div
                className='cursor-pointer rounded-full bg-white/25 p-1 hover:bg-white/50'
                onClick={() => {
                  URL.revokeObjectURL(avatarSource)
                  setAvatarSource('')
                }}
              >
                <IoMdClose size={20} stroke='white' />
              </div>
            </div>
            <div className='flex items-center justify-center py-4'>
              <CropperComponent
                image={avatarSource}
                ref={cropperRef}
                width={480}
                fillStyle='rgba(0, 0, 0, 0.75)'
                fileName={avatarRef.current.name ?? 'Avatar.png'}
              />
            </div>
            <div className='flex items-center justify-center gap-4'>
              <button
                type='button'
                className='rounded-md bg-slate-500 px-8 py-2'
                onClick={() => {
                  URL.revokeObjectURL(avatarSource)
                  setAvatarSource('')
                }}
              >
                Hủy
              </button>
              <button type='button' className='rounded-md px-8 py-2 bg-slate-900' onClick={handleSetAvatar}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default ProfileAvatar
