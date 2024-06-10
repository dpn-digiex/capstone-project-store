import React, { useId } from 'react'
import clsx from 'clsx'

const InputGroup = ({
  label,
  type = 'text',
  name,
  placeholder,
  required,
  options = [],
  setErrorList,
  validate,
  position,
  compare,
  ...props
}) => {
  const inputId = useId()

  if (type === 'radio')
    return (
      <div className='flex flex-col gap-1'>
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
    <div className='flex flex-col gap-1'>
      <label htmlFor={inputId} className='text-sm'>
        {label}
      </label>
      <input
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        required={required}
        className={clsx(
          'text-sm py-2 px-4 bg-none outline-none',
          'border border-slate-300 bg-slate-400',
          'rounded-md read-only:opacity-50 read-only:pointer-events-none'
        )}
        {...props}
      />
    </div>
  )
}

export default InputGroup
