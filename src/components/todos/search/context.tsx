import { AxiosResponse } from 'axios'
import React, { useState, createContext, useRef } from 'react'

import { getSearch } from '../../../api/search'
import useDebouncer from '../../../hooks/useDebounce'
import useFocus from '../../../hooks/useFocus'

import {
  ContextProps,
  ContextDispatchProps,
  Props,
  SearchResult,
  DropdownStatus
} from './types'

export const SearchContext = createContext<ContextProps>({
  input: '',
  result: [''],
  isSearchLoading: false,
  isFocus: false,
  formRef: null,
  dropdownStatus: 'none',
  dropdownPage: null
})

export const SearchDispatchContext = createContext<ContextDispatchProps>({
  setInput: () => null,
  setIsSearchLoading: () => null,
  onFocusHandler: () => null,
  onInputChangeHandler: () => null,
  setResult: () => null,
  setDropdownStatus: () => null,
  callSearchAPI: () => {
    return Promise.resolve()
  }
})

const SearchProvider = ({ children }: Props) => {
  // const [searchState, setSearchState] = useState({
  //   input: '',
  //   result: '',
  //   isSearchLoading: false
  //   isSearchFocus: false,
  // })
  const [input, setInput] = useState('')
  const [result, setResult] = useState([''])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const { isFocus, formRef, onFocusHandler } = useFocus()
  const dropdownPage = useRef(1)
  const [dropdownStatus, setDropdownStatus] = useState<DropdownStatus>('none')

  const isNextExistChecker = (res: AxiosResponse<SearchResult, any>) => {
    const total = res.data.total
    const curLen = (res.data.page - 1) * res.data.limit + res.data.qty
    console.log(`total: ${total}, curLen: ${curLen}`)
    total - curLen > 0 ? setDropdownStatus('next') : setDropdownStatus('none')
  }

  const callSearchAPI = async (input: string, page: number) => {
    try {
      const res = await getSearch(`q=${input}&page=${page}`)
      console.log(`curLength: ${result.length}`)
      isNextExistChecker(res)
      setResult(
        res.data.result.length
          ? [...result.filter(arr => arr !== ''), ...res.data.result]
          : ['']
      )
    } catch (error) {
      console.error(error)
    }
  }

  const debounced = useDebouncer(
    async (curInput: string) => {
      if (curInput === '') {
        setIsSearchLoading(false)
        return
      }
      setIsSearchLoading(true)
      await callSearchAPI(curInput, dropdownPage.current)
      setIsSearchLoading(false)
    },
    setIsSearchLoading,
    500
  )

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setResult([''])
    dropdownPage.current = 1
    debounced(e.target.value)
  }

  const contextValue = {
    input,
    result,
    isSearchLoading,
    isFocus,
    formRef,
    dropdownStatus,
    dropdownPage
  }

  const contextDispatchValue = {
    setInput,
    setIsSearchLoading,
    onFocusHandler,
    onInputChangeHandler,
    setResult,
    setDropdownStatus,
    callSearchAPI
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
