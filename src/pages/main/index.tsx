import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaSpinner } from 'react-icons/fa'

import { getTodoList } from '../../api/todo'
import Header from '../../components/Header'
import TodoList from '../../components/todos/list'
import { Todo } from '../../components/todos/list/types'
import Search from '../../components/todos/search'
import SearchProvider from '../../components/todos/search/context'
import Dropdown from '../../components/todos/search/dropdown'

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
        <SearchProvider>
          <Search setTodos={setTodoListData}>
            <Search.SearchBar
              LeftIcon={<BiSearch />}
              rightIcon={<FaSpinner className="spinner" />}
            />
            <Dropdown>
              <Dropdown.Item>hi</Dropdown.Item>
              <Dropdown.Item>hi2</Dropdown.Item>
              <Dropdown.Item>Hello</Dropdown.Item>
              <Dropdown.Item>test</Dropdown.Item>
            </Dropdown>
          </Search>
        </SearchProvider>
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  )
}

export default Main
