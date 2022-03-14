import { createSlice } from '@reduxjs/toolkit'
import { UpdateFrequency } from '@/types/types'

export interface IConfig {
  symbol: string
  frequency: UpdateFrequency
  precision: number
}

const Config = createSlice({
  name: 'config',
  initialState: {
    symbol: 'btcusd',
    frequency: UpdateFrequency.RealTime,
    precision: 0,
  },
  reducers: {
    setSymbol: (state, action) =>
      ({ ...state, symbol: action.payload }),
    setFrequency: (state, action) =>
      ({ ...state, frequency: action.payload }),
    increasePrecision: (state) => {
      state.precision += 1
    },
    decreasePrecision: (state) => {
      state.precision -= 1
    },
  },
})

export { Config }
