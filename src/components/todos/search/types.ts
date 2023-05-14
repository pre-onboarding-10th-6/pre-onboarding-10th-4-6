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

export interface ContextProps {
  input: string
  result: string[]
  isLoading: boolean
  isFocus: boolean
  formRef: React.RefObject<HTMLFormElement> | null
}

export interface ContextDispatchProps {
  setInput: React.Dispatch<React.SetStateAction<string>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  onFocusHandler: (bool: boolean) => void
  onInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SearchResult {
  q: string
  page: number
  limit: number
  result: string[]
  qty: number
  total: number
}
