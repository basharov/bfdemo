import { combineReducers } from 'redux'
import { Connection, IConnection } from '@/Store/Connection/Connection'
import { Config, IConfig } from '@/Store/Config/Config'
import { Symbols, SymbolsType } from '@/Store/Symbols/Symbols'
import { Channels, IChannels } from '@/Store/Channels/Channels'
import { Book, BookType } from '@/Store/Book/Book'

interface IRootReducer {
  config: IConfig
  connection: IConnection
  symbols: SymbolsType
  channels: IChannels
  book: BookType
}

const Reducer = combineReducers<any>({
  config: Config.reducer,
  connection: Connection.reducer,
  symbols: Symbols.reducer,
  channels: Channels.reducer,
  book: Book.reducer,
})

export { Reducer }
