import { useEffect, useState } from 'react'

import { getTodoList } from '../api/todo'
import Header from '../components/Header'
import InputTodo from '../components/todos/input'
import TodoList from '../components/todos/list'
import { Todo } from '../components/todos/list/types'

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
