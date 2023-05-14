import { useCallback, useEffect, useMemo, useState, RefObject } from 'react'
import { FaPlusCircle, FaSpinner } from 'react-icons/fa'

import { SearchData, getSearchData } from '../api/search'
import { createTodo } from '../api/todo'
import useFocus from '../hooks/useFocus'
import { Todo } from '../pages/Main'
import debounce from '../utils/debounce'

import RecommandKeyword from './RecommandKeyword'

const InputTodo = ({
  setTodos
}: {
  setTodos: (value: ((prevState: Todo[]) => Todo[]) | Todo[]) => void
}) => {
  const [inputText, setInputText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [keywordData, setKeywordData] = useState<SearchData[]>([])
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
  const { ref, setFocus } = useFocus()

  useEffect(() => {
    setFocus()
  }, [setFocus])

  useEffect(() => {
    console.log(inputText)
  }, [inputText])

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
        const data = await createTodo(newItem)

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

  const fetchKeywordData = async (keyword: string) => {
    const data = await getSearchData({ q: keyword })
    setKeywordData(prevKeywordData => [...prevKeywordData, data])
  }

  const debouncedFetchKeywordData = useMemo(
    () => debounce(fetchKeywordData, 1000),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value
    setInputText(prevKeyword => {
      if (prevKeyword !== newKeyword) {
        // debouncedFetchKeywordData(newKeyword)
      }
      return newKeyword
    })
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
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {!isLoading ? (
          <button className="input-submit" type="submit">
            <FaPlusCircle className="btn-plus" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </form>
      {isInputFocused && <RecommandKeyword />}
      <button onClick={() => debouncedFetchKeywordData('lorem')}>TEST</button>
    </>
  )
}

export default InputTodo
