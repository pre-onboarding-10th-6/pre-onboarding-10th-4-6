import { useEffect, useState } from 'react'

import { getTodoList } from '../../api/todo'
import { TodoData } from '../../types/types'

import { Title, Header, MainWrap, MainContent } from './styles'

const Main2 = () => {
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
    <MainWrap>
      <MainContent>
        <Header>
          <Title>Todos</Title>
        </Header>
      </MainContent>
    </MainWrap>
  )
}

export default Main2
