import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaSpinner } from 'react-icons/fa'

import { getTodoList } from '../../api/todo'
import Header from '../../components/Header'
import TodoList from '../../components/todos/list'
import { Todo } from '../../components/todos/list/types'
import Search from '../../components/todos/search'

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
        <Search setTodos={setTodoListData}>
          <Search.Form>
            <Search.SearchBar
              LeftIcon={<BiSearch />}
              rightIcon={<FaSpinner className="spinner" />}
            />
            <Search.Dropdown />
          </Search.Form>
        </Search>
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  )
}

export default Main
