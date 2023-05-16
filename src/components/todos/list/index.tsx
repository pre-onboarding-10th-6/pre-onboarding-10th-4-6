import TodoButton from './TodoButton'
import TodoItem from './TodoItem'
import TodoList from './TodoList'

interface Props {
  children: React.ReactNode
}

const Todo = ({ children }: Props) => {
  return <>{children}</>
}

Todo.List = TodoList
Todo.Item = TodoItem
Todo.ItemButton = TodoButton

export default Todo
