import React from 'react'

const StatusLabel = ({ color = '#ff9f00', label }) => {
  return (
    <i
      className={`w-fit min-w-[30px] max-w-[200px] px-2 flex items-center justify-center truncate text-[${color}] text-xxs border-[1px] border-orange rounded-full`}
    >
      {label}
    </i>
  )
}

export default StatusLabel
