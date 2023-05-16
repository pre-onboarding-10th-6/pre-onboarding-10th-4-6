interface Props {
  title: string
  children: React.ReactNode
}

const TodoItem = ({ title, children }: Props) => {
  return (
    <li className="item">
      <span>{title}</span>
      {children}
    </li>
  )
}

export default TodoItem
