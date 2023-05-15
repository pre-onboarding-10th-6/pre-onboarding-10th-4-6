import { useCallback, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'

import { useTodoDispatch } from '../context/todoContext'

import Spinner from './Spinner'

interface TodoItemProps {
  id: string
  title: string
}

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { remove } = useTodoDispatch()

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true)
      await remove(id)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      alert('Something went wrong.')
    }
  }, [id])

  return (
    <TodoItemLayout>
      <span>{title}</span>
      <TodoItemOptionBox>
        {!isLoading ? (
          <TodoItemRemoveButton onClick={handleRemoveTodo}>
            <FaTrash />
          </TodoItemRemoveButton>
        ) : (
          <Spinner />
        )}
      </TodoItemOptionBox>
    </TodoItemLayout>
  )
}

const TodoItemLayout = styled.li`
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
  letter-spacing: 1.5px;

  &:hover {
    opacity: 0.85;
    background-color: #eaeaea;
  }
`

const TodoItemOptionBox = styled.div`
  float: right;
`

const TodoItemRemoveButton = styled.button`
  background-color: transparent;
  color: orangered;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
  }
`

export default TodoItem
