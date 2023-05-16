import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle, FaSpinner } from 'react-icons/fa'

import { createTodo } from '../api/todo'
import useFocus from '../hooks/useFocus'
import { Todo } from '../pages/Main'

import RecommandKeywordList from './RecommandKeywordList'

const InputTodo = ({
  setTodos
}: {
  setTodos: (value: ((prevState: Todo[]) => Todo[]) | Todo[]) => void
}) => {
  const [inputText, setInputText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { ref, setFocus } = useFocus()

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
          setTodos((prev: Todo[]) => [...prev, data])
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

  const handleSelect = useCallback(
    async (selectedText: string) => {
      try {
        setIsLoading(true)

        const newItem = { title: selectedText }
        const { data } = await createTodo(newItem)

        if (data) {
          setTodos((prev: Todo[]) => [...prev, data])
        }
      } catch (error) {
        console.error(error)
        alert('Something went wrong.')
      } finally {
        setInputText('')
        setIsLoading(false)
      }
    },
    [setTodos]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={handleInputChange}
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
      <RecommandKeywordList keyword={inputText} onSelect={handleSelect} />
    </>
  )
}

export default InputTodo
