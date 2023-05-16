import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { getTodoList } from '../../api/todo'
import ErrorBoundary from '../../components/ErroBoundary'
import InputTodo from '../../components/InputTodo'
import SearchBar from '../../components/SearchBar'
import TodoList from '../../components/TodoList'
import { TodoData } from '../../types/types'

import { Title, Header, MainWrap, MainContent } from './styles'

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoData | []>([])

  useEffect(() => {
    async function getTodo() {
      const res = await getTodoList()
      const { opcode, data } = res
      if (opcode === 200) {
        setTodoListData(data)
      }
    }
    getTodo()
  }, [])
  console.log('rr', todoListData)
  return (
    <ErrorBoundary>
      <MainWrap>
        <MainContent>
          <Header>
            <Title>Todos</Title>
          </Header>
          <InputTodo
            setTodos={setTodoListData as Dispatch<SetStateAction<TodoData[]>>}
          />
          <SearchBar
            setTodos={setTodoListData as Dispatch<SetStateAction<TodoData[]>>}
          />
          <TodoList
            todos={todoListData as TodoData[]}
            setTodos={setTodoListData as Dispatch<SetStateAction<TodoData[]>>}
          />
        </MainContent>
      </MainWrap>
    </ErrorBoundary>
  )
}

export default Main
