import { createSlice } from '@reduxjs/toolkit'

export type BookType = any[]

const Book = createSlice({
  name: 'book',
  initialState: [],
  reducers:
    {
      set: (state, action) => action.payload,
      update: (state: any, action) => {
        const [price, count, amount] = action.payload

        const isBid = amount > 0

        const updatedRows = [...state[isBid ? 0 : 1].filter((row: any) => row[0] !== price)]
        if (count > 0) {
          updatedRows.push(action.payload)
        }


        // Prices are sorted ASC for Bids and DESC for Asks
        const sortedByPrice = updatedRows.sort((row1, row2) => {
          return isBid ? row2[0] - row1[0] : row1[0] - row2[0]
        })

        return isBid ? [sortedByPrice, state[1]] : [state[0], sortedByPrice]
      },
    },
})

export { Book }



