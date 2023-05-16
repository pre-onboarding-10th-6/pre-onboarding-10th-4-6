import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'

import { createTodo } from '../../api/todo'
import useFocus from '../../hooks/useFocus'
import { TodoData } from '../../types/types'

import { Button, Circle, Input, InputForm, Spinner } from './styles'

interface InputTodoProps {
  setTodos: Dispatch<SetStateAction<TodoData[]>>
}

const InputTodo: React.FC<InputTodoProps> = ({ setTodos }) => {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
          return setTodos((prev: any) => [...prev, data])
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
    <>
      <InputForm onSubmit={handleSubmit}>
        <Input
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          disabled={isLoading}
        />
        {!isLoading ? (
          <Button type="submit">
            <Circle />
          </Button>
        ) : (
          <Spinner />
        )}
      </InputForm>
    </>
  )
}

export default InputTodo
