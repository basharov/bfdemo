import React, { FC } from 'react'
import { BookRow, MainContainer, TableHeader } from './BookTable.styles'
import { GenericTable } from '@/Components/GenericTable/GenericTable'

interface IBookTableProps {
  header: string
  data: number[][]
}

const BookTable: FC<IBookTableProps> = ({header, data }: IBookTableProps) => {
  return <MainContainer>
    <TableHeader>{header}</TableHeader>
    <GenericTable headerRow={
      <tr>
        <th>Price</th>
        <th>Count</th>
        <th>Amount</th>
      </tr>}>
      {data?.map((row) => {
        return <BookRow key={row[0]}>
          <td>{(row[0])}</td>
          <td>{(row[1])}</td>
          <td>{Math.abs(row[2])}</td>
        </BookRow>
      })}
    </GenericTable>
  </MainContainer>
}

export { BookTable }
