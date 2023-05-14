import '@testing-library/jest-dom' //toBeInTheDocument() 를 사용하기 위해서 필요합니다!
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { deleteTodo } from '../../../api/todo'

import TodoItem from './TodoItem'
const id = '1'
const title = 'Test Todo'
const setTodos = jest.fn()

test('<TodoItem>에 todo title이 전달되었을 시 잘 그려지는지 확인', () => {
  render(<TodoItem id={id} title={title} setTodos={setTodos} />)

  const li = screen.getByText(title)
  expect(li).toBeInTheDocument()
})

jest.mock('../../../api/todo', () => ({
  deleteTodo: jest.fn(() => Promise.resolve())
}))

// describe('deleteTodo API', () => {
//   describe('deleteTodo API', () => {
//     it('버튼이 클릭되었을 때 deleteTodo API가 잘 호출되는지 확인', async () => {
//       const { getByRole } = render(
//         <TodoItem id={id} title={title} setTodos={setTodos} />
//       )
//       const button = getByRole('button')

//       fireEvent.click(button)

//       await waitFor(() => expect(deleteTodo).toHaveBeenCalledWith(id))
//     })

//     it('deleteTodo API가 성공적으로 호출되었을 때 list가 화면에서 사라졌는지 확인', async () => {
//       const { getByText, queryByText } = render(
//         <TodoItem id={id} title={title} setTodos={setTodos} />
//       )

//       const button = screen.getByRole('button')

//       fireEvent.click(button)

//       await waitFor(() => expect(deleteTodo).toHaveBeenCalledWith(id))

//       expect(queryByText(title)).not.toBeInTheDocument()
//     })
//   })
// })

// delete API 호출
