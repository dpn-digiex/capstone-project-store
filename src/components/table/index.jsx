'use client'
import React from 'react'

import TableEditComponent from './table-edit/TableEditComponent'
import TableViewComponent from './table-view'

const TableComponent = () => {
  return (
    <p>
      Please use <span className='font-bold text-red-500'>{`<TableComponent.View />`}</span> component to render a table
      in view mode or <span className='font-bold text-red-500'>{`<TableComponent.Edit />`}</span> if you want to edit
      table data
    </p>
  )
}

export default TableComponent

TableComponent.View = TableViewComponent
TableComponent.Edit = TableEditComponent
