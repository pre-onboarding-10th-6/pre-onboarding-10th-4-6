import TodoItem from '../../components/TodoItem'
import { TodoData } from '../../types/types'

import { EmptyList } from './styles'

interface TodoListProps {
  todos: TodoData[]
  setTodos: React.Dispatch<React.SetStateAction<TodoData[]>>
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  // console.log('tt', todos)
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <EmptyList>...</EmptyList>
  )
}
export default TodoList
