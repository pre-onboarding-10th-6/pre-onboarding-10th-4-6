import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaSpinner } from 'react-icons/fa'

import ErrorBoundary from '../api/Errorboundary'
import { getTodoList } from '../api/todo'
import Header from '../components/todos/Header'
import Todo from '../components/todos/list'
import { Todo as TodoType } from '../components/todos/list/types'
import Search from '../components/todos/search'
import useTryCatchErrorHandling from '../hooks/useTryCatchErrorHandling'

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoType[]>([])
  const fetchTodoList = useTryCatchErrorHandling(async () => {
    const { data } = await getTodoList()
    setTodoListData(data || [])
  })

  useEffect(() => {
    fetchTodoList()
  }, [])

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <ErrorBoundary fallback={<div>Search Fallback</div>}>
          <Search setTodos={setTodoListData}>
            <Search.Form>
              <Search.SearchBar
                LeftIcon={<BiSearch />}
                rightIcon={<FaSpinner className="spinner" />}
              />
              <Search.Dropdown />
            </Search.Form>
          </Search>
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Todo Fallback</div>}>
          <Todo>
            <Todo.List todos={todoListData}>
              {todoListData.map(({ id, title }) => (
                <Todo.Item key={id} title={title}>
                  <Todo.ItemButton id={id} setTodos={setTodoListData} />
                </Todo.Item>
              ))}
            </Todo.List>
          </Todo>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Main
