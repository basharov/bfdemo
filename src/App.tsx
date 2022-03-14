import React from 'react'
import { Viewport } from './Components/Viewport/Viewport'
import { GlobalStyle } from './GlobalStyle'
import { useSymbols } from '@/Hooks/useSymbols'

export const App = () => {
  useSymbols()
  return <>
    <GlobalStyle />
    <Viewport />
  </>
}
