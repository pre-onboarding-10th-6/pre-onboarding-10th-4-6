import apiRequest from './index'

const RESOURCE = '/todos'

export interface Todo {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`)

    return response
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

export const createTodo = async (data: { [key: string]: string }) => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data)

    return response
  } catch (error) {
    throw new Error('API createTodo error')
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`)

    return response
  } catch (error) {
    throw new Error('API deleteTodo error')
  }
}
