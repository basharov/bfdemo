import { useDispatch } from 'react-redux'
import { Symbols } from '@/Store/Symbols/Symbols'
import { useEffect } from 'react'

const useSymbols = () => {
  const dispatch = useDispatch()

  const populateSymbols = async () => {
    const result = await fetch('/api/symbols')
    const data = await result.json()
    dispatch(Symbols.actions.set(data))
  }

  useEffect(() => {
    populateSymbols()
  })

}

export { useSymbols }
