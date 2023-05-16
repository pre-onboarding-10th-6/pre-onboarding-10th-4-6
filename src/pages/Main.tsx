import { useEffect } from 'react'

import { getTodoList } from '../api/todo'
import Header from '../components/Header'
import InputTodo from '../components/InputTodo'
import TodoList from '../components/TodoList'
import { SuggestionProvider } from '../context/suggestion/SuggestionProvider'
import { useTodoDispatch } from '../context/todo/TodoContextProvider'
import { setTodos } from '../context/todo/todoReducer'

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
        <SuggestionProvider>
          <InputTodo />
        </SuggestionProvider>
        {/* <div style={{ backgroundColor: 'tomato', height: 400 }}>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </div> */}
        <TodoList />
      </div>
    </div>
  )
}

export default Main
