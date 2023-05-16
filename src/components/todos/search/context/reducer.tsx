import { DropdownStatus } from '../types'

export const SEARCH_AT = {
  SEARCH_WITH_DROPDOWN: 'SEARCH_WITH_DROPDOWN',
  SET_SEARCH: 'SET_SEARCH',
  SET_SEARCH_LOADING: 'SET_SEARCH_LOADING',
  SET_DROPDOWN_STATUS: 'SET_DROPDOWN_STATUS',
  SET_FOCUS: 'SET_FOCUS'
} as const

export interface SearchReducerState {
  input: string
  result: string[]
  isSearchLoading: boolean
  dropdownStatus: DropdownStatus
  isFocus: boolean
}

export type SearchReducerAction =
  | {
      type: typeof SEARCH_AT.SEARCH_WITH_DROPDOWN
      payload: { result: string[]; isNextExist: boolean }
    }
  | {
      type: typeof SEARCH_AT.SET_SEARCH
      payload: { input: string; result: string[] }
    }
  | { type: typeof SEARCH_AT.SET_SEARCH_LOADING; payload: boolean }
  | {
      type: typeof SEARCH_AT.SET_DROPDOWN_STATUS
      payload: DropdownStatus
    }
  | { type: typeof SEARCH_AT.SET_FOCUS; payload: boolean }

const searchReducer = (
  state: SearchReducerState,
  action: SearchReducerAction
) => {
  switch (action.type) {
    case SEARCH_AT.SEARCH_WITH_DROPDOWN:
      return {
        ...state,
        input: state.input,
        dropdownStatus: action.payload.isNextExist
          ? ('next' as DropdownStatus)
          : ('none' as DropdownStatus),
        result: action.payload.result.length
          ? [
              ...state.result.filter(arr => arr !== ''),
              ...action.payload.result
            ]
          : ['']
      }
    case SEARCH_AT.SET_SEARCH:
      return {
        ...state,
        input: action.payload.input,
        result: action.payload.result
      }
    case SEARCH_AT.SET_SEARCH_LOADING:
      return { ...state, isSearchLoading: action.payload }
    case SEARCH_AT.SET_DROPDOWN_STATUS:
      return { ...state, dropdownStatus: action.payload }
    case SEARCH_AT.SET_FOCUS:
      return { ...state, isFocus: action.payload }
    default:
      return state
  }
}

export default searchReducer
