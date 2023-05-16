import { useCallback, useState } from 'react'
import { FaSpinner, FaTrash } from 'react-icons/fa'

import { deleteTodo } from '../api/todo'
import { useTodoDispatch } from '../context/todo/TodoContextProvider'
import { removeTodo } from '../context/todo/todoReducer'

type Props = {
  id: string
  title: string
}

const TodoItem = ({ id, title }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useTodoDispatch()

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true)
      await deleteTodo(id)

      dispatch(removeTodo(id))
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  )
}

export default TodoItem
