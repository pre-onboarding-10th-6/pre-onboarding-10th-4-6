import { useCallback, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import { deleteTodo } from '../api/todo'

import Spinner from './Spinner'

const TodoItem = ({ id, title, setTodos }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true)
      await deleteTodo(id)

      setTodos(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }, [id, setTodos])

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <Spinner />
        )}
      </div>
    </li>
  )
}

export default TodoItem
