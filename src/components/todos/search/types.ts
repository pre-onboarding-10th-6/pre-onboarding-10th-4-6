import React from 'react'

import { Todo } from '../list/types'

import { SearchReducerAction, SearchReducerState } from './context/reducer'

export interface Props {
  children?: React.ReactNode
}

export interface SearchProps extends Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export interface SearchBarProps extends Props {
  LeftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export type DropdownStatus = 'none' | 'next' | 'loading'

export interface ContextProps {
  state: SearchReducerState
  formRef: React.RefObject<HTMLFormElement>
  dropdownPage: React.MutableRefObject<number>
}

export interface ContextDispatchProps {
  debounced: (str: string) => void
  callSearchAPI: (input: string, page: number) => Promise<void>
  callCreateTodoAPI: (title: string) => Promise<void>
  dispatch: React.Dispatch<SearchReducerAction>
}

export interface SearchResult {
  q: string
  page: number
  limit: number
  result: string[]
  qty: number
  total: number
}

export interface DropdownItemProps {
  todo: string
  isSearchLoading: boolean
  input: string
  onClickHandler: (todo: string) => void
}
