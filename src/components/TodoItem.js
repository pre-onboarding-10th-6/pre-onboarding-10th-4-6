import { useCallback, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'

import { deleteTodo } from '../api/todo'
import { StSpinner } from '../styles/common'

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
    <StItem>
      <span>{title}</span>
      <StItemOption>
        {!isLoading ? (
          <StOptionButton onClick={() => handleRemoveTodo()}>
            <StFaTrash />
          </StOptionButton>
        ) : (
          <StSpinner />
        )}
      </StItemOption>
    </StItem>
  )
}

export default TodoItem

const StFaTrash = styled(FaTrash)`
  color: orangered;
  font-size: 16px;
  &:hover {
    opacity: 0.5;
  }
`

const StItem = styled.li`
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
const StItemOption = styled.div`
  float: right;
`

const StOptionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
