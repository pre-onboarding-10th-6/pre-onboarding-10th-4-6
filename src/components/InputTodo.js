import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle, FaSpinner } from 'react-icons/fa'

import { createTodo } from '../api/todo'
import useFocus from '../hooks/useFocus'
import useInput from '../hooks/useInput'

import SearchContents from './SearchContents'

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
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
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
        <FaSpinner className="spinner" />
      )}
      {isFocused && <SearchContents values={values} />}
    </form>
  )
}

export default InputTodo
