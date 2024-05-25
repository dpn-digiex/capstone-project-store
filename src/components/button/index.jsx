import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const Button = ({
  children,
  type = 'button',
  customStyle = '',
  customStyleText = '',
  isDisabled = false,
  mode = 'primary',
  onClick = () => {}
}) => {
  return (
    <button type={type} className={clsx('w-full', isDisabled ? 'pointer-events-none' : '')} onClick={onClick}>
      <div
        className={clsx('cursor-pointer flex px-6 h-[60px] justify-center items-center', customStyle, {
          ['bg-[#0071e3] hover:bg-skyBlue rounded-[12px]']: mode === 'primary',
          ['bg-transparent border border-[#3e3e3f] rounded-[12px]']: mode === 'outline',
          ['!bg-[#ccc] !hover:bg-transparent cursor-default']: isDisabled
        })}
      >
        <p
          className={clsx('whitespace-nowrap overflow-hidden text-ellipsis text-xs font-medium ', customStyleText, {
            ['text-white']: mode === 'primary',
            ['text-[#3e3e3f] ']: mode === 'outline',
            ['cursor-default text-white']: isDisabled
          })}
        >
          {children}
        </p>
      </div>
    </button>
  )
}

Button.propTypes = {
  customStyle: PropTypes.string,
  customStyleText: PropTypes.string,
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf(['transparent', 'primary', 'outline'])
}

export default Button
