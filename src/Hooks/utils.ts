import { Channel, EventRequest, UpdateFrequency } from '@/types/types'

export const createSubscribeToChannelMessage = (channel: Channel, symbolId: string, frequency: UpdateFrequency, precision: number) =>
  JSON.stringify({
    event: EventRequest.Subscribe,
    channel,
    symbol: `t${symbolId.toUpperCase()}`,
    freq: frequency,
    prec: `P${precision}`,
  })
