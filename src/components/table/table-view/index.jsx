'use client'
import React, { useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import clsx from 'clsx'

import PaginationComponent from '@/components/pagination'
import { getType } from '@/utils'

import styles from '../index.module.css'
import TableCellComponent from '../table-cell'
import TableEmptyComponent from '../table-empty'
import TableRowComponent from '../table-row'

const TableViewComponent = ({
  columns = [],
  data = [],
  renderKey = 'name',
  columnKey = 'id',
  pagination = false,
  totalRecord = 0,
  currentPage = 1,
  currentPageSize = 10,
  onPageChange,
  rowSelection,
  keyExtractor,
  onSort,
  onDoubleClick
}) => {
  // [STATES]
  const [selectedRows, setSelectedRows] = useState([])
  const [sortColumns, setSortColumns] = useState([])

  // [HANDLERS]
  const getCheckAllProps = () => {
    const rowList = data.map((item) => rowSelection.getSelection(item))
    const selectableRows = rowList.filter((row) => !row.disabled)
    if (selectableRows.length === 0) return false
    return selectableRows.length === selectedRows.length
  }
  const handleSelectAll = (event) => {
    const rowList = data.map((item) => rowSelection.getSelection(item))
    const selectableRows = rowList.filter((row) => !row.disabled)
    if (event.target.checked) {
      const selectedList = selectableRows.map((row) => row.value)
      rowSelection.onChange?.(selectedList)
      setSelectedRows(selectedList)
    } else {
      rowSelection.onChange?.([])
      setSelectedRows([])
    }
  }
  const handleSort = (columnName) => {
    const sortItem = sortColumns.find((column) => column.name === columnName)
    if (!sortItem) {
      const newSortColumns = [
        {
          name: columnName,
          order: 1
        }
      ]
      setSortColumns(newSortColumns)
      onSort?.(newSortColumns)
      return
    }
    if (sortItem.order === 1) {
      const newSortColumns = sortColumns.map((column) => {
        if (column.name === sortItem.name) return { name: sortItem.name, order: -1 }
        return column
      })
      setSortColumns(newSortColumns)
      onSort?.(newSortColumns)
      return
    }
    if (sortItem.order === -1) {
      const newSortColumns = sortColumns.filter((column) => column.name !== sortItem.name)
      setSortColumns(newSortColumns)
      onSort?.(newSortColumns)
      return
    }
  }

  // [RENDERS]
  return (
    <div className={styles['table-container']}>
      <div className={styles['table-wrapper']}>
        <table className={clsx(styles['table'], 'text-left')}>
          <thead className={styles['table-header']}>
            <tr className={styles['table-header-row']}>
              {rowSelection ? (
                <th className={styles['table-header-cell']}>
                  <input
                    name='select-all'
                    type='checkbox'
                    className={clsx('checkbox', {
                      hidden: rowSelection.multiple !== true
                    })}
                    checked={getCheckAllProps()}
                    onChange={handleSelectAll}
                  />
                </th>
              ) : null}
              {columns.map((column) => (
                <th key={column[columnKey]} className={clsx(styles['table-header-cell'], 'text-nowrap')}>
                  <div className='flex items-center justify-between gap-2'>
                    {column[renderKey]}
                    {getType(onSort).includes('function') && column.except !== true ? (
                      <div className='cursor-pointer' onClick={() => handleSort(column[columnKey])}>
                        <MdArrowDropUp
                          fill='white'
                          size={8}
                          className={clsx({
                            'fill-black/50': sortColumns.find((c) => c.name === column[columnKey])?.order === 1
                          })}
                        />
                        <MdArrowDropDown
                          fill='white'
                          size={8}
                          className={clsx({
                            'fill-black/50': sortColumns.find((c) => c.name === column[columnKey])?.order === -1
                          })}
                        />
                      </div>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='table-body'>
            {data.map((item, index) => (
              <TableRowComponent
                key={keyExtractor?.({ item })}
                item={item}
                rowSelection={rowSelection}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                className={clsx({
                  'blink blink-new': index === 0 && Date.now() - Number(location.state?.createdAt) <= 5000,
                  'blink blink-update':
                    item.id === Number(location.state?.id) && Date.now() - Number(location.state?.updatedAt) <= 5000
                })}
                onDoubleClick={onDoubleClick}
              >
                {columns.map((column) => (
                  <TableCellComponent key={column[columnKey]}>{item[column[columnKey]]}</TableCellComponent>
                ))}
              </TableRowComponent>
            ))}
            {!data || data.length === 0 ? <TableEmptyComponent colSpan={columns.length + 2} /> : null}
          </tbody>
        </table>
      </div>
      {pagination === true && totalRecord > 0 ? (
        <PaginationComponent
          totalRecord={totalRecord}
          onPageChange={onPageChange}
          currentPage={currentPage}
          currentPageSize={currentPageSize}
        />
      ) : null}
    </div>
  )
}

export default TableViewComponent
