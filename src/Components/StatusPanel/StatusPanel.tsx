import React from 'react'
import { DisconnectedCircle, ConnectedCircle, StatusPanelContainer, RedButton } from './StatusPanel.styles'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateFrequency } from '@/types/types'
import { Config } from '@/Store/Config/Config'
import { ConnectionStatus } from '@/Store/types'
import { Connection } from '@/Store/Connection/Connection'

interface IConnectionStatus {
  connection: any
}

const StatusPanel = () => {
  const dispatch = useDispatch()

  const connectionStatus: string = useSelector<IConnectionStatus>(state => state.connection.status)
  const frequency: UpdateFrequency = useSelector<any>(state => state.config.frequency)

  const isConnected = connectionStatus === ConnectionStatus.Connected

  return <StatusPanelContainer>
    {isConnected ? <ConnectedCircle /> : <DisconnectedCircle />}
    <div>
      <button onClick={() => {
        dispatch(Connection.actions.connect())
      }} disabled={isConnected}>Connect
      </button>
      <button onClick={() => {
        dispatch(Connection.actions.disconnect())
      }
      } disabled={!isConnected}>Disconnect
      </button>
      <RedButton onClick={() => {
        dispatch(Connection.actions.break())
      }
      } disabled={!isConnected}>Break connection (debug)
      </RedButton>
    </div>
    <div>{frequency}</div>
    <div>
      <button disabled={frequency === UpdateFrequency.RealTime} onClick={() => {
        dispatch(Config.actions.setFrequency(UpdateFrequency.RealTime))
        dispatch(Connection.actions.setShouldReconnect(true))
      }}>Real-time
      </button>

      <button disabled={frequency === UpdateFrequency.Throttled} onClick={() => {
        dispatch(Config.actions.setFrequency(UpdateFrequency.Throttled))
        dispatch(Connection.actions.setShouldReconnect(true))
      }}>Throttled
      </button>

    </div>
  </StatusPanelContainer>
}


export { StatusPanel }
