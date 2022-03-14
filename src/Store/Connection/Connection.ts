import { createAction, createSlice } from '@reduxjs/toolkit'
import { ConnectionStatus } from '@/Store/types'

export interface IConnection {
  status: ConnectionStatus
  shouldReconnect: boolean
  lastHeartbeatTimestamp: number
}

const Connection = createSlice({
  name: 'connection',
  initialState: {
    status: ConnectionStatus.Disconnected,
    shouldReconnect: false,
    lastHeartbeatTimestamp: new Date().getTime(),
  },
  reducers: {
    connect: (state) => {
      state.status = ConnectionStatus.Connecting
    },
    disconnect: (state) => {
      state.status = ConnectionStatus.Disconnected
    },
    break: (state) => {
      state.status = ConnectionStatus.Broken
    },
    reconnect: (state) => {
      state.status = ConnectionStatus.Connecting
    },
    setConnected: (state) => {
      state.status = ConnectionStatus.Connected
      state.shouldReconnect = false
    },
    setShouldReconnect: (state, action) => {
      state.shouldReconnect = action.payload
    },
    setLastHeartbeatTimestamp: (state, action) => {
      state.lastHeartbeatTimestamp = action.payload
    },
  },
})

export { Connection }
