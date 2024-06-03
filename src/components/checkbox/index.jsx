import clsx from 'clsx'

const CheckBox = ({
  className,
  checked = false,
  label,
  errors,
  checkboxClassName = '',
  disabled = false,
  customCheckedIcon = '',
  customUncheckedIcon = '',
  onCheckedChange = () => {}
}) => {
  return (
    <div className={clsx('flex items-center gap-[8px]', className)}>
      <div
        className={clsx('w-[24px] h-[24px] flex items-center justify-center cursor-pointer', checkboxClassName)}
        onClick={() => onCheckedChange(!checked)}
      >
        {disabled ? (
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 18 18' fill='none'>
            <g clipPath='url(#clip0_876_10605)'>
              <rect x='0' y='0' width='14' height='14' rx='3.5' fill='#E8EBED' stroke='#AFB6BB' />
              <path
                d='M6.60545 12.2222L6.58783 12.2399L3.90433 9.55635C3.5087 9.16073 3.5087 8.51929 3.90433 8.12367C4.29995 7.72805 4.94138 7.72805 5.337 8.12367L6.60551 9.39218L10.6632 5.3345C11.0588 4.93888 11.7002 4.93888 12.0959 5.3345C12.4915 5.73013 12.4915 6.37156 12.0959 6.76718L6.62313 12.2399L6.60545 12.2222Z'
                fill='#AFB6BB'
              />
            </g>
            <defs>
              <clipPath id='clip0_876_10605'>
                <rect width='16' height='16' fill='white' />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <>
            {checked ? (
              <>
                {customCheckedIcon ? (
                  customCheckedIcon
                ) : (
                  <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect width={16} height={16} rx={4} fill='#005DFD' />
                    <path
                      d='M6.60545 12.222L6.58783 12.2396L3.90433 9.5561C3.5087 9.16048 3.5087 8.51905 3.90433 8.12343C4.29995 7.7278 4.94138 7.7278 5.337 8.12343L6.60551 9.39194L10.6632 5.33426C11.0588 4.93864 11.7002 4.93864 12.0959 5.33426C12.4915 5.72988 12.4915 6.37131 12.0959 6.76693L6.62313 12.2397L6.60545 12.222Z'
                      fill='white'
                    />
                  </svg>
                )}
              </>
            ) : customUncheckedIcon ? (
              customUncheckedIcon
            ) : (
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H14C17.0376 0.5 19.5 2.96243 19.5 6V14C19.5 17.0376 17.0376 19.5 14 19.5H6C2.96243 19.5 0.5 17.0376 0.5 14V6Z'
                  stroke='#D0D5DD'
                />
              </svg>
            )}
          </>
        )}
      </div>
      {label && (
        <label
          className={clsx('text-text-dark text-center text-body', errors && 'text-graphics-red-dark')}
          onClick={() => onCheckedChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default CheckBox
