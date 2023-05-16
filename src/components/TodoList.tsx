import { Dispatch } from 'react'
import { styled } from 'styled-components'

import { ITodo } from '../types/todo'

import TodoItem from './TodoItem'

interface IProps {
  todos: ITodo[]
  setTodos: Dispatch<React.SetStateAction<ITodo[]>>
}
const TodoList = ({ todos, setTodos }: IProps) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <StEmptyList>...</StEmptyList>
  )
}
export default TodoList

const StEmptyList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  margin-left: 0.75rem;
  color: #ececec;
`
