import { useWebSocketService } from '@/Hooks/useWebSocketService'
import { useCallback, useEffect, useRef } from 'react'
import {
  Channel,
  isBookStreamMessage,
  isInitialBookStateMessage,
  isSubscriptionStatusMessage,
  UpdateFrequency,
} from '@/types/types'
import { useDispatch, useSelector } from 'react-redux'
import { Channels } from '@/Store/Channels/Channels'
import { Book } from '@/Store/Book/Book'
import { createSubscribeToChannelMessage } from '@/Hooks/utils'

const useBitfinexApi = () => {
  const dispatch = useDispatch()

  const channels: any = useSelector<any>(state => state.channels)

  const precision: number = useSelector<any>(state => state.config.precision)
  const frequency: UpdateFrequency = useSelector<any>(state => state.config.frequency)

  const symbol: any = useSelector<any>(state => state.config.symbol)

  const channelsRef = useRef(channels)
  const precisionRef = useRef(precision)
  const frequencyRef = useRef(frequency)

  useEffect(() => {
    channelsRef.current = channels
    precisionRef.current = precision
    frequencyRef.current = frequency
  }, [channels, frequency, precision])

  const handleIncomingMessage = useCallback((message: MessageEvent) => {
    const data = JSON.parse(message.data)
    const channelsSubscribed = channelsRef.current

    if (isSubscriptionStatusMessage(data)) {
      dispatch(Channels.actions.subscribe(data))
    } else if (isInitialBookStateMessage(data, channelsSubscribed.book)) {
      const bidsAsksDivided = data[1].reduce<any>((accum, row) => {
        return row[2] > 0 ? [[...accum[0], row], accum[1]] : [accum[0], [...accum[1], row]]
      }, [[], []])
      dispatch(Book.actions.set(bidsAsksDivided))
    } else if (isBookStreamMessage(data, channelsSubscribed.book)) {
      const [chanId, details] = data
      dispatch(Book.actions.update(details))
    }
  }, [dispatch])

  const subscribeToBookChannel = useCallback((wsConnection) => {
    wsConnection.send(createSubscribeToChannelMessage(Channel.Book, symbol, frequencyRef.current, precisionRef.current))
  }, [frequencyRef, precisionRef, symbol])

  const { connect, disconnect } = useWebSocketService({
    onOpen: subscribeToBookChannel,
    onMessage: handleIncomingMessage,
  })

  const bookData: any = useSelector<any>(state => state.book)

  return { bookData }
}

export { useBitfinexApi }
