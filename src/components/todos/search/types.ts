import React from 'react'

import { Todo } from '../list/types'

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
  input: string
  result: string[]
  isSearchLoading: boolean
  isFocus: boolean
  formRef: React.RefObject<HTMLFormElement> | null
  dropdownStatus: 'none' | 'next' | 'loading'
  dropdownPage: React.MutableRefObject<number> | null
}

export interface ContextDispatchProps {
  setInput: React.Dispatch<React.SetStateAction<string>>
  setIsSearchLoading: React.Dispatch<React.SetStateAction<boolean>>
  onFocusHandler: (bool: boolean) => void
  onInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  setResult: React.Dispatch<React.SetStateAction<string[]>>
  setDropdownStatus: React.Dispatch<React.SetStateAction<DropdownStatus>>
  callSearchAPI: (input: string, page: number) => Promise<void>
}

export interface SearchResult {
  q: string
  page: number
  limit: number
  result: string[]
  qty: number
  total: number
}
