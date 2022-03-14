import React from 'react'
import { useSelector } from 'react-redux'

import { DataView, MainContainer } from './Viewport.styles'
// import { Chart } from '@/Components/Chart/Chart'
import { BookTable } from '@/Components/BookTable/BookTable'
import { BookContainer } from '../BookTable/BookTable.styles'
import { StatusPanel } from '@/Components/StatusPanel/StatusPanel'
import { ControlPanel } from '@/Components/ControlPanel/ControlPanel'
import { useBitfinexApi } from '@/Hooks/useBitFinexApi'

const Viewport = () => {
  const { bookData } = useBitfinexApi()

  return (
    <MainContainer>
      <ControlPanel />
      <DataView>
        {
          bookData ?
            <BookContainer>
              <BookTable header="Bids" data={bookData[0] || []} />
              <BookTable header="Asks" data={bookData[1] || []} />
            </BookContainer>
            : null
        }

      </DataView>
      <StatusPanel />

    </MainContainer>
  )

}

export { Viewport }
