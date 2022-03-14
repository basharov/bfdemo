import { createSlice } from '@reduxjs/toolkit'

export type SymbolsType = string[]

const Symbols = createSlice({
  name: 'symbols',
  initialState: [],
  reducers: {
    set: (state, action) => action.payload,
  },
})

export { Symbols }
