import { useCallback, useEffect } from 'react'
import { useStateRef } from '@/Hooks/useStateRef'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectionStatus } from '@/Store/types'
import { Connection } from '@/Store/Connection/Connection'


const { WEBSOCKET_HOST } = process.env

if (!WEBSOCKET_HOST) {
  throw new Error('Missing env WEBSOCKET_HOST')
}

const useWebSocketService = ({ onOpen, onMessage }: any) => {
  const dispatch = useDispatch()

  const [webSocketConnection, setWebSocketConnection, webSocketConnectionRef] = useStateRef<WebSocket | null>(null)

  const connectionStatus: string = useSelector<any>(state => state.connection.status)
  const shouldReconnect: string = useSelector<any>(state => state.connection.shouldReconnect)

  const disconnect = useCallback(async () => {
    await webSocketConnection?.close()
  }, [webSocketConnection])

  const connect = useCallback(async () => {
    if (connectionStatus === ConnectionStatus.Connected) {
      await disconnect()
    }

    const wsConnection = await new WebSocket(WEBSOCKET_HOST)
    dispatch(Connection.actions.setConnected())
    dispatch(Connection.actions.setShouldReconnect(false))
    setWebSocketConnection(wsConnection)

    wsConnection.addEventListener('open', () => {
      onOpen(wsConnection)
    })

    wsConnection.addEventListener('error', () => {
      console.log('Failed to connect')
      setTimeout(() => {
        connect()
      }, 2000)
    })

    wsConnection.addEventListener('message', (message: MessageEvent) => {
      onMessage(message)
    })

  }, [connectionStatus, disconnect, dispatch, onMessage, onOpen, setWebSocketConnection])

  useEffect(() => {
    if (shouldReconnect && connectionStatus === ConnectionStatus.Connected) {
      connect()
    }
  }, [connect, connectionStatus, shouldReconnect])

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.Disconnected) {
      disconnect()
    }
  }, [connect, connectionStatus, disconnect, shouldReconnect])

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.Connecting) {
      connect()
    }
  }, [connect, connectionStatus])

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.Broken) {
      connect()
    }
  }, [connect, connectionStatus])

  return {
    connect,
    disconnect,
  }

}

export { useWebSocketService }
