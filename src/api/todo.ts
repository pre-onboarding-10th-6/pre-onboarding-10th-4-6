import { Todo } from '../pages/Main'

import apiRequest from './index'

const RESOURCE = '/todos'

export interface ApiResponse<T> {
  opcode: number
  message: string
  data: T
}

export const getTodoList = async (): Promise<ApiResponse<Todo[]>> => {
  try {
    const response = await apiRequest.get<Todo[]>(`${RESOURCE}`)
    return response
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

export const createTodo = async (
  data: Record<string, unknown>
): Promise<ApiResponse<Todo>> => {
  try {
    const response = await apiRequest.post<Todo>(`${RESOURCE}`, data)
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
