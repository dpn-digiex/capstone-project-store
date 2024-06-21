'use client'
import React from 'react'
import clsx from 'clsx'

import styles from './index.module.css'

const TableCellComponent = ({ children, colSpan = 1, required, className, ...props }) => {
  return (
    <td className={clsx(styles['table-cell'], className)} colSpan={colSpan} {...props}>
      <div
        className={clsx(styles['cell-content'], 'table-cell-content', {
          'required-field': required
        })}
      >
        {children}
      </div>
    </td>
  )
}

export default TableCellComponent
