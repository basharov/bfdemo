export enum UpdateFrequency {
  RealTime = 'F0',
  Throttled = 'F1'
}

export type NumberOrNull = number | null

export enum Channel {
  Book = 'book',
}

export enum EventResponse {
  Subscribed = 'subscribed',
  Unsubscribed = 'unsubscribed'
}

export enum EventRequest {
  Subscribe = 'subscribe',
  Unsubscribe = 'unsubscribe'
}

export type SubscriptionStatusMessage = { event: 'subscribed'; channel: string; chanId: string; }
export const isSubscriptionStatusMessage = (o: any): o is SubscriptionStatusMessage =>
  'event' in o
  && 'channel' in o
  && 'chanId' in o
  && (o.event === EventResponse.Subscribed || o.event === EventResponse.Unsubscribed)

export type InitialBookStateMessage = [number, number[][]]
export const isInitialBookStateMessage = (o: any, bookChannelId: NumberOrNull): o is InitialBookStateMessage =>
  Array.isArray(o) && o[0] === bookChannelId && Array.isArray(o[1]) && o[1].every(val => Array.isArray(val))

export type BookStreamMessage = [number, number[]]
export const isBookStreamMessage = (o: any, bookChannelId: NumberOrNull): o is BookStreamMessage =>
  Array.isArray(o) && o[0] === bookChannelId && Array.isArray(o[1]) && o[1].length === 3
