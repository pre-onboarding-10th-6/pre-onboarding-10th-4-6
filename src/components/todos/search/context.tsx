import { AxiosResponse } from 'axios'
import React, { useState, createContext, useContext, useRef } from 'react'

import { getSearch } from '../../../api/search'
import { createTodo } from '../../../api/todo'
import useDebouncer from '../../../hooks/useDebounce'
import useFocus from '../../../hooks/useFocus'

import {
  ContextProps,
  ContextDispatchProps,
  SearchProps,
  SearchResult,
  DropdownStatus
} from './types'

const SearchContext = createContext<ContextProps | undefined>(undefined)
const SearchDispatchContext = createContext<ContextDispatchProps | undefined>(
  undefined
)

const SearchProvider = ({ children, setTodos }: SearchProps) => {
  const [searchState, setSearchState] = useState({
    input: '',
    result: ['']
  })
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
    const res = await getSearch(`q=${input}&page=${page}`)
    console.log(`curLength: ${searchState.result.length}`)
    isNextExistChecker(res)
    setSearchState({
      input,
      result: res.data.result.length
        ? [...searchState.result.filter(arr => arr !== ''), ...res.data.result]
        : ['']
    })
  }

  const callCreateTodoAPI = async (title: string) => {
    setIsSearchLoading(true)
    const { data } = await createTodo({ title })
    setTodos(prev => [...prev, data])
    setIsSearchLoading(false)
  }

  const debounced = useDebouncer(
    async (curInput: string) => {
      if (curInput === '') {
        setIsSearchLoading(false)
        return
      }
      await callSearchAPI(curInput, dropdownPage.current)
    },
    setIsSearchLoading,
    500
  )

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      input: e.target.value,
      result: ['']
    })
    dropdownPage.current = 1
    debounced(e.target.value)
  }

  const contextValue = {
    searchState,
    isSearchLoading,
    isFocus,
    formRef,
    dropdownStatus,
    dropdownPage
  }

  const contextDispatchValue = {
    setIsSearchLoading,
    onFocusHandler,
    onInputChangeHandler,
    setSearchState,
    setDropdownStatus,
    callSearchAPI,
    callCreateTodoAPI
  }

  return (
    <SearchContext.Provider value={contextValue}>
      <SearchDispatchContext.Provider value={contextDispatchValue}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const state = useContext(SearchContext)
  if (!state) {
    throw new Error('SearchContextProvider not found')
  }
  return state
}

export const useSearchDispatchContext = () => {
  const dispatch = useContext(SearchDispatchContext)
  if (!dispatch) {
    throw new Error('SearchContextDispatchProvider not found')
  }
  return dispatch
}

export default SearchProvider
