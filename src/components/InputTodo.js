import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { styled } from 'styled-components'

import { createTodo } from '../api/todo'
import useFocus from '../hooks/useFocus'
import useInput from '../hooks/useInput'

import SearchContents from './SearchContents'
import Spinner from './Spinner'

const InputTodo = ({ setTodos }) => {
  const { values, setValues, handleChange } = useInput('')
  const [isFocused, setIsFocused] = useState(false)
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

        const trimmed = values.trim()
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
        setValues('')
        setIsLoading(false)
        setFocus()
      }
    },
    [values, setTodos, setValues]
  )

  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Add new todo..."
          value={values}
          ref={ref}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
        />
        {!isLoading ? (
          <button className="input-submit" type="submit">
            <FaPlusCircle className="btn-plus" />
          </button>
        ) : (
          <Spinner />
        )}
        <div>{isFocused && <SearchContents values={values} />}</div>
      </Form>
    </main>
  )
}

export default InputTodo

const Form = styled.form`
  position: relative;
  width: 100%;
  width: 580px;
  margin-bottom: 20px;
  display: flex;
  border-radius: 6px;
  justify-content: space-evenly;
  border: 1px solid #dedede;

  &::focus {
    outline: none;
    margin: 0;
    padding: 0;
  }

  &::hover {
    background: red;
    border: 3px solid #dedede;
  }
`

const Input = styled.input`
  width: 85%;
  height: 45px;
  margin-right: 20px;
  padding: 0 0 0 10px;
  background-color: transparent;
  border-radius: calc(0.5 * 100px);
  border: none;
  font-size: 1rem;
  font-weight: 400;
  outline: none;

  &::placeholder {
    color: #9f9f9f;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`
