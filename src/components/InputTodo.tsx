import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaPlusCircle, FaSpinner } from 'react-icons/fa'

import { SearchData, getSearchData } from '../api/search'
import { createTodo } from '../api/todo'
import useDebounce from '../hooks/useDebounce'
import useFocus from '../hooks/useFocus'
import { Todo } from '../pages/Main'

import RecommandKeyword from './RecommandKeyword'

const InputTodo = ({
  setTodos
}: {
  setTodos: (value: ((prevState: Todo[]) => Todo[]) | Todo[]) => void
}) => {
  const [inputText, setInputText] = useState<string>('')
  const debouncedInputText = useDebounce(inputText, 2000)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [keywordData, setKeywordData] = useState<SearchData | null>(null)
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
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

  const fetchKeywordData = async (
    keyword: string,
    page: number,
    limit: number
  ) => {
    if (keyword.trim() === '') {
      return
    }
    const data = await getSearchData({ q: keyword, page: page, limit: limit })
    console.log(data.data)
    setKeywordData(data.data)
  }

  useEffect(() => {
    fetchKeywordData(debouncedInputText, 1, 10)
  }, [debouncedInputText])

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
      <RecommandKeyword keywordData={keywordData} keyword={inputText} />
      {/* <button onClick={() => debouncedFetchKeywordData('q', 3, 30)}>
        TEST
      </button> */}
    </>
  )
}

export default InputTodo
