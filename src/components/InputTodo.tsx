import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle, FaSpinner } from 'react-icons/fa'

import { createTodo } from '../api/todo'
import { useTodoDispatch } from '../context/TodoContextProvider'
import { addTodo } from '../context/todoReducer'
import useFocus from '../hooks/useFocus'

const InputTodo = () => {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useTodoDispatch()

  const { ref, setFocus } = useFocus() as {
    ref: React.RefObject<HTMLInputElement>
    setFocus: () => void
  } // TODO: Fix this

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
          return dispatch(addTodo(data))
        }
      } catch (error) {
        console.error(error)
        alert('Something went wrong.')
      } finally {
        setInputText('')
        setIsLoading(false)
      }
    },
    [inputText]
  )

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  )
}

export default InputTodo
