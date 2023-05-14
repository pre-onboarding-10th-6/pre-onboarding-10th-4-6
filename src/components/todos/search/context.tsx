import React, { useState, createContext } from 'react'

import { getSearch } from '../../../api/search'
import useDebouncer from '../../../hooks/useDebounce'
import useFocus from '../../../hooks/useFocus'

import { ContextProps, ContextDispatchProps, Props } from './types'

export const SearchContext = createContext<ContextProps>({
  input: '',
  result: [''],
  isLoading: false,
  isFocus: false,
  formRef: null
})
export const SearchDispatchContext = createContext<ContextDispatchProps>({
  setInput: () => null,
  setIsLoading: () => null,
  onFocusHandler: () => null,
  onInputChangeHandler: () => null
})

const SearchProvider = ({ children }: Props) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isFocus, formRef, onFocusHandler } = useFocus()
  const [result, setResult] = useState([''])

  const debounced = useDebouncer(
    async (curInput: string) => {
      if (curInput === '') {
        setResult([''])
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const res = await getSearch(`q=${curInput}`)
        setResult(res.data.result.length ? res.data.result : [''])
      } catch (error) {
        console.error(error)
        setResult([''])
      } finally {
        setIsLoading(false)
      }
    },
    setIsLoading,
    500
  )

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    debounced(e.target.value)
  }

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
    onFocusHandler,
    onInputChangeHandler
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
