import { createContext, useContext, useRef, useReducer } from 'react'

import { getSearch } from '../../../../api/search'
import { createTodo } from '../../../../api/todo'
import useTryCatchErrorHandling from '../../../../hooks/useTryCatchErrorHandling'
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

const isNextExistChecker = (data: SearchResult) => {
  const total = data.total
  const curLen = (data.page - 1) * data.limit + data.qty
  return total - curLen > 0
}

const SearchProvider = ({ children, setTodos }: SearchProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const dropdownPage = useRef(1)

  const callSearchAPI = useTryCatchErrorHandling(
    async (input: string, page: number) => {
      const { data } = await getSearch(`q=${input}&page=${page}`)
      dispatch({
        type: SEARCH_AT.SEARCH_WITH_DROPDOWN,
        payload: { result: data.result, isNextExist: isNextExistChecker(data) }
      })
    }
  )

  const callCreateTodoAPI = useTryCatchErrorHandling(async (title: string) => {
    dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: true })
    const { data } = await createTodo({ title })
    setTodos(prev => [...prev, data])
    dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: false })
  })

  return (
    <SearchContext.Provider value={{ dropdownPage, state }}>
      <SearchDispatchContext.Provider
        value={{
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
