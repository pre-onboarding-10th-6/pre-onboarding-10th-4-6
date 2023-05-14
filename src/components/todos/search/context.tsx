import { useState, createContext } from 'react'

import useFocus from '../../../hooks/useFocus'

import { ContextProps, ContextDispatchProps, Props } from './types'

export const SearchContext = createContext<ContextProps>({
  input: '',
  result: '',
  isLoading: false,
  isFocus: false,
  formRef: null
})
export const SearchDispatchContext = createContext<ContextDispatchProps>({
  setInput: () => null,
  setIsLoading: () => null,
  onFocusHandler: () => null
})

const SearchProvider = ({ children }: Props) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isFocus, formRef, onFocusHandler } = useFocus()
  const result = ''

  const contextValue = {
    input,
    result,
    isLoading,
    isFocus,
    formRef
  }

  const contextDispatchValue = {
    setInput,
    setIsLoading,
    onFocusHandler
  }

  return (
    <SearchContext.Provider value={contextValue}>
      <SearchDispatchContext.Provider value={contextDispatchValue}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  )
}

export default SearchProvider
