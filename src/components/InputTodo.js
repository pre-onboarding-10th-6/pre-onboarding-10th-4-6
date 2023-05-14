import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'

import { createTodo } from '../api/todo'
import useFocus from '../hooks/useFocus'
import { StSpinner } from '../styles/common'

const InputTodo = ({ setTodos }) => {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { ref, setFocus } = useFocus()

  useEffect(() => {
    setFocus()
  }, [setFocus])

  const handleSubmit = useCallback(
    async e => {
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

  return (
    <StFormContainer onSubmit={handleSubmit}>
      <StInput
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
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
  )
}

export default InputTodo

const StFormContainer = styled.form`
  width: 100%;
  margin-bottom: 20px;
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
