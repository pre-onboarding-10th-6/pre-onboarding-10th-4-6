import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { getTodoList } from '../api/todo'
import Header from '../components/Header'
import InputTodo from '../components/InputTodo'
import TodoList from '../components/TodoList'
import { ITodo } from '../types/todo'

const Main = () => {
  const [todoListData, setTodoListData] = useState<ITodo[]>([])

  const addTodoListData = (newTodo: ITodo) => {
    setTodoListData(_todoListData => [..._todoListData, newTodo])
  }

  const initTodoList = useCallback(async () => {
    const { data } = await getTodoList()
    setTodoListData(data || [])
  }, [])

  useEffect(() => {
    initTodoList()
  }, [])

  return (
    <StContainer>
      <StInner>
        <Header />
        <InputTodo
          setTodos={setTodoListData}
          addTodoListData={addTodoListData}
        />
        {todoListData && (
          <TodoList todos={todoListData} setTodos={setTodoListData} />
        )}
      </StInner>
    </StContainer>
  )
}

export default Main

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`

const StInner = styled.div`
  width: 100%;
  padding: 8rem 10px 4rem;
`
