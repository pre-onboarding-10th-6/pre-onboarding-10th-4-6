import { styled } from 'styled-components'

import TodoItem from './TodoItem'

const TodoList = ({ todos, setTodos }) => {
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
