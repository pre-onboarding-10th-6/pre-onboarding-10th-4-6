import { useEffect, useState } from 'react'

import { getTodoList } from '../../api/todo'
import Header from '../../components/Header/Header'
import InputTodo from '../../components/inputTodo'
import TodoList from '../../components/TodoList/TodoList'

export interface Todo {
  title: string
  createdAt?: string
  id?: string
  updatedAt?: string
}

const Main = () => {
  const [todoListData, setTodoListData] = useState<Todo[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await getTodoList()
      setTodoListData(data || [])
    })()
  }, [])

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  )
}

export default Main
