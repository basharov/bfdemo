import React from 'react'
import { ControlPanelContainer } from './ControlPanel.styles'
import { useDispatch, useSelector } from 'react-redux'
import { Config, IConfig } from '@/Store/Config/Config'
import { Connection, IConnection } from '@/Store/Connection/Connection'

export interface IConnectionStatus {
  connection: IConnection
  config: IConfig
}

const ControlPanel = () => {
  const dispatch = useDispatch()

  const symbols: string[] = useSelector<any>(state => state.symbols)
  const precision: number = useSelector<IConnectionStatus>(state => state.config.precision)

  return <ControlPanelContainer>
    <div>
      P{precision}
      <button
        onClick={() => {
          dispatch(Config.actions.decreasePrecision())
          dispatch(Connection.actions.setShouldReconnect(true))
        }}
        disabled={precision === 0}>Decrease precision
      </button>
      <button
        onClick={() => {
          dispatch(Config.actions.increasePrecision())
          dispatch(Connection.actions.setShouldReconnect(true))
        }
        }
        disabled={precision === 4}>Increase precision
      </button>
    </div>
    <select name="" id="" onChange={(e) => {
      dispatch(Config.actions.setSymbol(e.currentTarget.value))
      dispatch(Connection.actions.setShouldReconnect(true))
    }
    }>
      {symbols.map(symbol => {
        return <option key={symbol} value={symbol}>{symbol.toUpperCase()}</option>
      })}
    </select>
  </ControlPanelContainer>
}


export { ControlPanel }
