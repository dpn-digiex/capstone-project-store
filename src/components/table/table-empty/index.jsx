'use client'
import React from 'react'
import { MdAllInbox } from 'react-icons/md'

import TableCellComponent from '../table-cell'
import TableRowComponent from '../table-row'

const TableEmptyComponent = ({ colSpan }) => {
  return (
    <TableRowComponent>
      <TableCellComponent colSpan={colSpan}>
        <div className='flex w-full items-center justify-center gap-2.5'>
          <MdAllInbox size={24} />
          <p className='text-large text-slate-500'>No available data</p>
        </div>
      </TableCellComponent>
    </TableRowComponent>
  )
}

export default TableEmptyComponent
