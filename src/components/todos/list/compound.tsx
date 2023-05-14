import { useState } from 'react'
import { FaSpinner, FaTrash } from 'react-icons/fa'

import { deleteTodo } from '../../../api/todo'

import { Todo } from './types'

interface Props {
  children?: React.ReactNode
}

const TodoList = ({ children }: Props) => {
  return <ul>{children}</ul>
}

interface ItemProps {
  id: string
  title: string
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

TodoList.Item = ({ id, title, setTodos }: ItemProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRemoveTodo = async () => {
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
  }

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

export default TodoList
