import { CommonResponse, TodoData } from '../types/types'

import apiRequest from './index'

const RESOURCE = '/todos'

export const getTodoList = async (): Promise<CommonResponse<TodoData>> => {
  try {
    const response = await apiRequest.get<CommonResponse<TodoData>>(
      `${RESOURCE}`
    )

    return response.data
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

export const createTodo = async (data: {
  title: string
}): Promise<CommonResponse<TodoData>> => {
  try {
    const response = await apiRequest.post<CommonResponse<TodoData>>(
      `${RESOURCE}`,
      data
    )
    console.log('radv', response.data)
    return response.data
  } catch (error) {
    throw new Error('API createTodo error')
  }
}

export const deleteTodo = async (id: any) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`)

    return response
  } catch (error) {
    throw new Error('API deleteTodo error')
  }
}
