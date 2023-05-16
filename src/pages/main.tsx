import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaSpinner } from 'react-icons/fa'

import { getTodoList } from '../api/todo'
import Header from '../components/todos/Header'
import Todo from '../components/todos/list'
import { Todo as TodoType } from '../components/todos/list/types'
import Search from '../components/todos/search'

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoType[]>([])

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const { data } = await getTodoList()
        setTodoListData(data || [])
      } catch (error) {
        console.log('error in main')
      }
    }
    fetchTodoList()
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
        <Todo>
          <Todo.List todos={todoListData}>
            {todoListData.map(({ id, title }) => (
              <Todo.Item key={id} title={title}>
                <Todo.ItemButton id={id} setTodos={setTodoListData} />
              </Todo.Item>
            ))}
          </Todo.List>
        </Todo>
      </div>
    </div>
  )
}

export default Main
