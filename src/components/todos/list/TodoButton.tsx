import { useState } from 'react'
import { FaSpinner, FaTrash } from 'react-icons/fa'

import { deleteTodo } from '../../../api/todo'
import useTryCatchErrorHandling from '../../../hooks/useTryCatchErrorHandling'

import { Todo } from './types'

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  id: string
}

const TodoButton = ({ setTodos, id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const tryCatchHandleRemoveTodo = useTryCatchErrorHandling(async () => {
    setIsLoading(true)
    await deleteTodo(id)
    setTodos(prev => prev.filter(item => item.id !== id))
    setIsLoading(false)
  })

  return (
    <div className="item-option">
      {!isLoading ? (
        <button onClick={tryCatchHandleRemoveTodo}>
          <FaTrash className="btn-trash" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </div>
  )
}

export default TodoButton
