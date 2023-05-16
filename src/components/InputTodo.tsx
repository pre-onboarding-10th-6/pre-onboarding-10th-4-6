import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { searchTodo } from '../api/search'
import { createTodo, Todo } from '../api/todo'
import searchIcon from '../assets/search_icon.png'
import useFocus from '../hooks/useFocus'

import Dropdown from './Dropdown'
import Spinner from './Spinner'

interface InputTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const InputTodoWrapper = styled.form`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  border-radius: 6px;
  border: 1px solid #dedede;
  justify-content: space-evenly;
  transition: border-width 0.3s ease-in-out;
  align-items: center;
  padding-right: 16px;
  &:hover {
    border-width: 3px;
  }
  &:active {
    border: 1px solid #9f9f9f;
  }
  &:focus-within {
    border: 1px solid #9f9f9f;
  }
`

const InputStyle = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  padding: 12px 13px 12px 41px;
  background-color: transparent;
  border: none;
  background: url(${searchIcon}) no-repeat left 16.33px center / 14.12px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  &:focus {
    outline: none;
  }
`

const InputSpinner = styled(Spinner)``

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { ref, setFocus } = useFocus()
  const [searchResult, setSearchResult] = useState([])
  const [dropdown, setDropdwon] = useState(false)

  useEffect(() => {
    setFocus()
  }, [setFocus])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault()
        setIsLoading(true)

        const trimmed = inputText.trim()
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
        setInputText('')
        setIsLoading(false)
      }
    },
    [inputText, setTodos]
  )

  const debouncedFetchData = debounce(async (inputText: string) => {
    if (inputText !== '') {
      try {
        setIsLoading(true)
        const res = await searchTodo(inputText, 1, 10)
        setSearchResult(res.result)
        setDropdwon(true)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  }, 300)

  useEffect(() => {
    debouncedFetchData(inputText)
  }, [inputText])

  return (
    <>
      <InputTodoWrapper onSubmit={handleSubmit}>
        <InputStyle
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          disabled={isLoading}
        />
        {isLoading ? <InputSpinner /> : null}
      </InputTodoWrapper>
      {dropdown ? (
        <Dropdown
          searchResult={searchResult}
          keyword={inputText}
          setTodos={setTodos}
          setDropdown={setDropdwon}
          setInputText={setInputText}
        />
      ) : null}
    </>
  )
}

export default InputTodo
