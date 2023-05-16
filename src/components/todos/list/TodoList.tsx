import { Todo } from './types'

interface Props {
  todos: Todo[]
  children?: React.ReactNode
}

const TodoList = ({ todos, children }: Props) => {
  return todos.length ? (
    <ul>{children}</ul>
  ) : (
    <div className="empty-list">...</div>
  )
}
export default TodoList
