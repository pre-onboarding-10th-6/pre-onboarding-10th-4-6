import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { getTodoList } from '../api/todo'
import Header from '../components/Header'
import InputTodo from '../components/InputTodo'
import TodoList from '../components/TodoList'

const Main = () => {
  const [todoListData, setTodoListData] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await getTodoList()
      setTodoListData(data || [])
    })()
  }, [])

  return (
    <Container>
      <Inner>
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </Inner>
    </Container>
  )
}

export default Main

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`

const Inner = styled.div`
  width: 100%;
  padding: 8rem 10px 4rem;
`
