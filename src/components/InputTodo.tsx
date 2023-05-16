import { useCallback, useEffect, useState } from 'react'
import { FaPlusCircle, FaSpinner, FaEllipsisH } from 'react-icons/fa'

import { createTodo, getSuggestions } from '../api/todo'
import {
  useSuggestionDispatch,
  useSuggestionState
} from '../context/suggestion/SuggestionProvider'
import {
  clearSuggestions,
  setSuggestions,
  setIsLoading as setSuggestionIsLoading
} from '../context/suggestion/suggestionReducer'
import { useTodoDispatch } from '../context/todo/TodoContextProvider'
import { addTodo } from '../context/todo/todoReducer'
import useFocus from '../hooks/useFocus'
import { debounce } from '../utils'

const InputTodo = () => {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useTodoDispatch()
  const {
    suggestions,
    page,
    limit,
    total,
    isLoading: suggestionIsLoading
  } = useSuggestionState()
  const suggestionDispatch = useSuggestionDispatch()

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

  const handleInputChange = useCallback(
    debounce((x: string) => {
      if (x.length > 0) {
        suggestionDispatch(clearSuggestions())
        getSuggestions(x, 1)
          .then(res => res.data)
          .then(data => {
            suggestionDispatch(setSuggestions(data))
          })
      }
    }, 500),
    []
  )

  const fetchSuggestions = useCallback(
    debounce((x: string) => {
      getSuggestions(x, page + 1)
        .then(res => res.data)
        .then(data => {
          suggestionDispatch(
            setSuggestions({
              ...data,
              result: [...suggestions, ...data.result]
            })
          )
        })
    }, 500),
    [page, suggestions]
  )

  const handleScroll = useCallback(
    (e: any) => {
      if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight)
        if (page * limit < total) {
          suggestionDispatch(setSuggestionIsLoading(true))
          fetchSuggestions(inputText)
        }
    },
    [inputText, page]
  )

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={e => {
            setInputText(e.target.value)
            handleInputChange(e.target.value)
          }}
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
      {inputText.length > 0 && suggestions.length > 0 && (
        <ul className="suggestion-container" onScroll={handleScroll}>
          {suggestions.map((suggestion: string, i: number) => (
            <li key={i}>
              {suggestion.split(inputText).map((part: string, i: number) => (
                <span key={i}>
                  {part}
                  {i !== suggestion.split(inputText).length - 1 && (
                    <strong>{inputText}</strong>
                  )}
                </span>
              ))}
            </li>
          ))}
          <div>
            {suggestionIsLoading && <FaSpinner className="spinner" />}
            {page * limit < total && !suggestionIsLoading && (
              <FaEllipsisH className="more-suggestions" />
            )}
          </div>
        </ul>
      )}
    </>
  )
}

export default InputTodo
