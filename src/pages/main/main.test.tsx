import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom' //toBeInTheDocument() 를 사용하기 위해서 필요합니다!
import TodoInput from '../../components/todos/input'
import TodoList from '../../components/todos/list'

import Main from '.'

test('모든 컴포넌트 렌더링', () => {
  render(<Main />)
  render(<TodoInput setTodos={() => null} />)
  render(<TodoList todos={[]} setTodos={() => null} />)
})

// 데이터 페칭

// test('List가 비어있을 때 아무런 li태그가 없음을 확인 ', () => {})
