import { createSlice } from '@reduxjs/toolkit'
import { NumberOrNull } from '@/types/types'

export interface IChannels {
  book: NumberOrNull
}

const Channels = createSlice({
  name: 'channels',
  initialState: {
    book: null,
  },
  reducers: {
    subscribe: (state, action) => {
      return { ...state, ...{ [action.payload.channel]: action.payload.chanId } }
    },
    unsubscribe: (state, action) => {
      return { ...state, ...{ [action.payload.channel]: null } }
    },
  },
})

export { Channels }
