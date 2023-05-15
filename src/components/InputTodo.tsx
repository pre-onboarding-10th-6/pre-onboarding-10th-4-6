import { ChangeEvent, Dispatch, useCallback, useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'

import { getSuggestion } from '../api/suggestion'
import { createTodo } from '../api/todo'
import useCloseDropdown from '../hooks/useCloseDropDown'
import useDebounce from '../hooks/useDebounce'
import useFocus from '../hooks/useFocus'
import { StSpinner } from '../styles/common'
import { ITodo } from '../types/todo'

import SuggestList from './suggestList'

interface IProps {
  setTodos: Dispatch<React.SetStateAction<ITodo[]>>
}

const InputTodo = ({ setTodos }: IProps) => {
  const [inputText, setInputText] = useState<string>('')
  const [suggestList, setSuggestList] = useState<string[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { ref, setFocus } = useFocus()
  const [isOpenDropdown, dropdownRef, dropdownHandler] = useCloseDropdown(false)
  const debounceInput = useDebounce(inputText)

  useEffect(() => {
    setFocus()
  }, [setFocus])

  const getSuggestList = useCallback(async () => {
    if (debounceInput === '') {
      setSuggestList(undefined)
      return
    }
    try {
      const { data } = await getSuggestion({ q: debounceInput })
      const { result } = data
      setSuggestList(result)
      if (!isOpenDropdown) {
        dropdownHandler()
      }
    } catch (error) {
      console.error(error)
      setSuggestList(undefined)
    }
  }, [debounceInput])

  useEffect(() => {
    getSuggestList()
  }, [getSuggestList])

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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  return (
    <>
      <StFormContainer onSubmit={handleSubmit}>
        <StInput
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={onChangeInput}
          disabled={isLoading}
        />
        {!isLoading ? (
          <StSubmitButton type="submit">
            <StFaPlusCircle />
          </StSubmitButton>
        ) : (
          <StSpinner />
        )}
      </StFormContainer>
      {isOpenDropdown && (
        <SuggestList
          suggestList={suggestList}
          dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </>
  )
}

export default InputTodo

const StFormContainer = styled.form`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  border-radius: calc(0.5 * 100px);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
  justify-content: space-evenly;
`
const StInput = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 85%;
  padding-right: 5px;
  padding-left: 10px;
  border-radius: calc(0.5 * 100px);
  /* background-color: transparent; */
  height: 45px;
  outline: none;
  border: none;
`

const StSubmitButton = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 45px;
  outline: none;
  border: none;
  :hover {
    color: orangered;
    text-decoration: underline;
  }
`

const StFaPlusCircle = styled(FaPlusCircle)`
  color: darkcyan;
  font-size: 20px;
`
