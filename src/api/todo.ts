import baseInstance from './index'

const RESOURCE = '/todos'
interface PayloadCreate {
  title: string
}

export const getTodoList = async () => await baseInstance.get(`${RESOURCE}`)

export const createTodo = async (data: PayloadCreate) =>
  await baseInstance.post(`${RESOURCE}`, data)

export const deleteTodo = async (id: string) =>
  await baseInstance.delete(`${RESOURCE}/${id}`)
