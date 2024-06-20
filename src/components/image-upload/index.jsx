'use client'
import React, { useId } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import clsx from 'clsx'
const ImageUploadComponent = ({ disabled, name, onChange, accept, acceptString, multiple = false, error }) => {
  const inputId = useId()
  return (
    <div
      className={clsx('flex w-full flex-col items-center justify-center gap-1', {
        'pointer-events-none opacity-70': disabled
      })}
    >
      <label
        htmlFor={inputId}
        className={clsx(
          'flex w-full cursor-pointer flex-col items-center justify-center',
          'rounded-md border-[0.125rem] border-dashed border-white/50',
          'bg-slate-500/50 hover:bg-slate-500/75',
          {
            'error-field': !!error
          }
        )}
      >
        <div className='upload-container flex flex-col items-center justify-center py-2'>
          <IoImageOutline size={32} stroke='#FFFFFF80' />
          <p className='upload-action mb-1 font-semibold text-white/50'>Tải hình ảnh lên</p>
          <p className='text-small text-white/50'>{acceptString}</p>
        </div>
        <input
          disabled={disabled}
          id={inputId}
          type='file'
          name={name}
          className='hidden'
          accept={accept}
          multiple={multiple}
          onChange={(e) => onChange?.(e)}
          onClick={(e) => (e.target.value = null)}
        />
      </label>
      <p
        className={clsx('w-full italic text-red-500', {
          hidden: !error
        })}
      >
        {error}
      </p>
    </div>
  )
}

export default ImageUploadComponent
