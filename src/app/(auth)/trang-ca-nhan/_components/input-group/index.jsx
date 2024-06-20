import React, { useId } from 'react'
import clsx from 'clsx'

import Select from '@/components/select'

import styles from './index.module.css'

const InputGroup = ({
  label,
  type = 'text',
  name,
  placeholder,
  required,
  options = [],
  suffix,
  setErrorList,
  validate,
  position,
  compare,
  ...props
}) => {
  const inputId = useId()

  if (type === 'select')
    return (
      <div className='flex flex-col gap-1 w-full' data-max-w='none'>
        <span className='text-sm'>{label}</span>
        <Select
          options={options}
          renderKey='label'
          valueKey='value'
          placeholder={placeholder}
          name={name}
          className={styles['input-select']}
        />
      </div>
    )
  if (type === 'radio')
    return (
      <div className='flex flex-col gap-1' data-max-w='none'>
        <span className='text-sm'>{label}</span>
        <div className='flex items-center gap-4'>
          {options.map((option) => (
            <div className='flex items-center gap-1 cursor-pointer' key={option.id}>
              <label htmlFor={option.id} className='text-sm cursor-pointer'>
                {option.label}
              </label>
              <input
                type='radio'
                id={option.id}
                name={name}
                defaultChecked={option.defaultChecked}
                value={option.value}
                className='w-5 h-5 accent-slate-700 cursor-pointer'
              />
            </div>
          ))}
        </div>
      </div>
    )
  return (
    <div className='flex flex-col gap-1' data-max-w='none'>
      <label htmlFor={inputId} className='text-sm'>
        {label}
      </label>
      <div className={clsx('flex items-center', 'border border-slate-300 bg-slate-400', 'rounded-md px-4')}>
        <input
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          className={clsx(
            'text-sm py-2 bg-none outline-none flex-1',
            'read-only:opacity-50 read-only:pointer-events-none',
            'placeholder:text-slate-300 bg-transparent'
          )}
          {...props}
        />
        {suffix}
      </div>
    </div>
  )
}

export default InputGroup
