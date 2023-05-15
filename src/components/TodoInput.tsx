import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'

import { useTodoDispatch } from '../context/todoContext'
import useFocus from '../hooks/useFocus'
import useInput from '../hooks/useInput'

import Spinner from './Spinner'

const TodoInput = () => {
  const { value, handleChange, reset } = useInput('')
  const { ref, setFocus } = useFocus<HTMLInputElement>()
  const [isLoading, setIsLoading] = useState(false)

  const { add } = useTodoDispatch()

  useEffect(() => {
    setFocus()
  }, [setFocus])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault()
        setIsLoading(true)
        const trimmed = value.trim()
        if (!trimmed) {
          return alert('Please write something')
        }
        const newItem = { title: trimmed }
        await add(newItem)
      } catch (error) {
        console.error(error)
        alert('Something went wrong.')
      } finally {
        reset()
        setIsLoading(false)
      }
    },
    [value]
  )

  return (
    <TodoInputLayout onSubmit={handleSubmit}>
      <input
        placeholder="Add new todo..."
        ref={ref}
        value={value}
        onChange={handleChange}
        disabled={isLoading}
      />
      {!isLoading ? (
        <TodoInputSubmitButton>
          <FaPlusCircle />
        </TodoInputSubmitButton>
      ) : (
        <Spinner />
      )}
    </TodoInputLayout>
  )
}

const TodoInputLayout = styled.form`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0 0 20px 0;
  border-radius: 50px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);

  input {
    width: 85%;
    height: 45px;
    padding: 0 5px 0 10px;
    border-radius: 50px;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 400;
  }
`

const TodoInputSubmitButton = styled.button.attrs({ type: 'submit' })`
  display: flex;
  align-items: center;
  height: 45px;
  background: transparent;
  color: darkcyan;
  font-size: 20px;

  &:hover {
    opacity: 0.5;
  }
`

export default TodoInput
