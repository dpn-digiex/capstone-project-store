'use client'
import React from 'react'
import clsx from 'clsx'

import styles from './index.module.css'

const TableRowComponent = ({
  children,
  item,
  rowSelection,
  selectedRows,
  setSelectedRows,
  className,
  onDoubleClick
}) => {
  const handleSelectRow = (item, event) => {
    event.stopPropagation()
    const selectedRow = rowSelection.getSelection(item)
    const selectedKey = selectedRow.value
    if (event.target.checked) {
      if (rowSelection.multiple === true) {
        const selectedList = selectedRows.concat(selectedKey)
        rowSelection.onChange?.(selectedList)
        setSelectedRows(selectedList)
      } else {
        rowSelection.onChange?.(...[selectedKey])
        setSelectedRows([selectedKey])
      }
    } else {
      if (rowSelection.multiple === true) {
        const selectedList = selectedRows.filter((item) => item !== selectedKey)
        rowSelection.onChange?.(selectedList)
        setSelectedRows(selectedList)
      } else {
        rowSelection.onChange?.()
        setSelectedRows([])
      }
    }
  }
  return (
    <tr className={clsx(styles['table-row'], className)} onDoubleClick={() => onDoubleClick?.(item)}>
      {rowSelection ? (
        <td className={styles['select-cell']}>
          <input
            type='checkbox'
            className='checkbox'
            checked={selectedRows?.includes(item[rowSelection.selectKey ?? 'id'])}
            disabled={rowSelection.getSelection(item).disabled}
            onChange={(event) => handleSelectRow(item, event)}
          />
        </td>
      ) : null}
      {children}
    </tr>
  )
}

export default TableRowComponent
