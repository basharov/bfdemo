import React from 'react'
import { Table } from './GenericTable.styles'

const GenericTable = ({ headerRow, children }: any) => {
  return <Table>
    <thead>
    {headerRow}
    </thead>
    <tbody>
    {children}
    </tbody>
  </Table>
}

export { GenericTable }
