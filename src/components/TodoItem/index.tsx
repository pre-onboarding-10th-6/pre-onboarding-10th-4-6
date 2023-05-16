import { useCallback, useState } from 'react'

import { deleteTodo } from '../../api/todo'
import { TodoData } from '../../types/types'
import { Spinner } from '../InputTodo/styles'

import { Item, ItemOption, TrashBtn } from './styles'

interface TodoItemProps {
  id: string
  title: string
  setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, setTodos }) => {
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
    <Item>
      <span>{title}</span>
      <ItemOption>
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <TrashBtn />
          </button>
        ) : (
          <Spinner />
        )}
      </ItemOption>
    </Item>
  )
}

export default TodoItem
