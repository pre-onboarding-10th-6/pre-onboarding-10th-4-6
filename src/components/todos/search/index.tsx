import React, { useContext } from 'react'

import { createTodo } from '../../../api/todo'

import { SearchContext, SearchDispatchContext } from './context'
import * as S from './style'
import { SearchBarProps, SearchProps } from './types'

const Search = ({ children, setTodos }: SearchProps) => {
  const { input, formRef } = useContext(SearchContext)
  const { setIsLoading, setInput } = useContext(SearchDispatchContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      const trimmed = input.trim()
      if (!trimmed) {
        return alert('Please write something')
      }

      const newItem = { title: trimmed }
      const { data } = await createTodo(newItem)

      if (data) {
        return setTodos(prev => [...prev, data])
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setInput('')
      setIsLoading(false)
    }
  }

  return (
    <S.Form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </S.Form>
  )
}

Search.SearchBar = ({ LeftIcon, rightIcon }: SearchBarProps) => {
  const { input, isLoading } = useContext(SearchContext)
  const { onFocusHandler, onInputChangeHandler } = useContext(
    SearchDispatchContext
  )

  const onFocus = () => onFocusHandler(true)

  return (
    <S.SearchBox>
      {LeftIcon}
      <input
        placeholder="todo를 추가하세요"
        type="text"
        onChange={onInputChangeHandler}
        onFocus={onFocus}
        value={input}
      />
      {isLoading && rightIcon}
    </S.SearchBox>
  )
}
export default Search