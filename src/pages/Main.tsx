import { useEffect } from 'react'

import { getTodoList } from '../api/todo'
import Header from '../components/Header'
import InputTodo from '../components/InputTodo'
import TodoList from '../components/TodoList'
import { useTodoDispatch } from '../context/TodoContextProvider'
import { setTodos } from '../context/todoReducer'

const Main = () => {
  const dispatch = useTodoDispatch()

  useEffect(() => {
    ;(async () => {
      const { data } = await getTodoList()
      dispatch(setTodos(data || []))
    })()
  }, [])

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo />
        <TodoList />
      </div>
    </div>
  )
}

export default Main
