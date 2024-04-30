import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

const ButtonLink = ({
  href = '',
  children,
  customStyle = '',
  customStyleText = '',
  isSelected = false,
  isDisabled = false,
  mode = 'transparent'
}) => {
  return (
    <Link
      href={href}
      className={clsx('w-full', isDisabled ? 'pointer-events-none' : '')}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
    >
      <div
        className={clsx(
          'cursor-pointer hover:bg-[#2d2d2d] flex px-6 h-[60px] justify-center items-center',
          customStyle,
          {
            ['bg-grayLight']: isSelected,
            ['bg-[#0071e3] hover:bg-skyBlue rounded-[12px]']: mode === 'primary',
            ['!bg-[#ccc] !hover:bg-transparent cursor-default text-white']: isDisabled
          }
        )}
      >
        <p className={clsx('whitespace-nowrap overflow-hidden text-ellipsis text-xs font-medium', customStyleText)}>
          {children}
        </p>
      </div>
    </Link>
  )
}

ButtonLink.propTypes = {
  href: PropTypes.string,
  customStyle: PropTypes.string,
  customStyleText: PropTypes.string,
  isSelected: PropTypes.bool,
  children: PropTypes.node.isRequired,
  mode: PropTypes.oneOf(['transparent', 'primary'])
}

export default ButtonLink
