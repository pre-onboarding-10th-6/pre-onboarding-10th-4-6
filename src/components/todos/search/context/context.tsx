import { AxiosResponse } from 'axios'
import { createContext, useContext, useRef, useReducer } from 'react'

import { getSearch } from '../../../../api/search'
import { createTodo } from '../../../../api/todo'
import useDebouncer from '../../../../hooks/useDebounce'
import useFocus from '../../../../hooks/useFocus'
import {
  ContextProps,
  ContextDispatchProps,
  SearchProps,
  SearchResult
} from '../types'

import searchReducer, { SEARCH_AT, SearchReducerState } from './reducer'

const SearchContext = createContext<ContextProps | null>(null)
const SearchDispatchContext = createContext<ContextDispatchProps | null>(null)

const initialState: SearchReducerState = {
  input: '',
  result: [''],
  isSearchLoading: false,
  dropdownStatus: 'none',
  isFocus: false
}

const SearchProvider = ({ children, setTodos }: SearchProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const dropdownPage = useRef(1)
  const { formRef } = useFocus((bool: boolean) =>
    dispatch({ type: SEARCH_AT.SET_FOCUS, payload: bool })
  )

  const isNextExistChecker = (res: AxiosResponse<SearchResult, any>) => {
    const total = res.data.total
    const curLen = (res.data.page - 1) * res.data.limit + res.data.qty
    console.log(`total: ${total}, curLen: ${curLen}`)
    total - curLen > 0
      ? dispatch({ type: SEARCH_AT.SET_DROPDOWN_STATUS, payload: 'next' })
      : dispatch({ type: SEARCH_AT.SET_DROPDOWN_STATUS, payload: 'none' })
  }

  const callSearchAPI = async (input: string, page: number) => {
    const res = await getSearch(`q=${input}&page=${page}`)
    console.log(`curLength: ${state.result.length}`)
    isNextExistChecker(res)
    dispatch({ type: SEARCH_AT.SEARCH, payload: res.data.result })
  }

  const callCreateTodoAPI = async (title: string) => {
    dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: true })
    const { data } = await createTodo({ title })
    setTodos(prev => [...prev, data])
    dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: false })
  }

  const debounced = useDebouncer(
    async (curInput: string) => {
      if (curInput === '') {
        dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: false })
        return
      }
      await callSearchAPI(curInput, dropdownPage.current)
    },
    (bool: boolean) =>
      dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: bool }),
    500
  )

  return (
    <SearchContext.Provider value={{ formRef, dropdownPage, state }}>
      <SearchDispatchContext.Provider
        value={{
          debounced,
          callSearchAPI,
          callCreateTodoAPI,
          dispatch
        }}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => {
  const state = useContext(SearchContext)
  if (state === null) {
    throw new Error('SearchContextProvider not found')
  }
  return state
}

export const useSearchDispatchContext = () => {
  const dispatch = useContext(SearchDispatchContext)
  if (dispatch === null)
    throw new Error(
      'SearchContextDispatchProvider must be used within a TodoProvider'
    )
  return dispatch
}

export default SearchProvider
