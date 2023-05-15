import TodoItem from './TodoItem'
import { Todo } from './types'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  children?: React.ReactNode
}

const TodoList = ({ todos, setTodos, children }: Props) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  )
}
export default TodoList
