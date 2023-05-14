import { Todo } from '../pages/Main'

import apiRequest from './index'

const RESOURCE = '/todos'

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`)
    return response
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

export const createTodo = async (data: { title: string }): Promise<Todo> => {
  console.log('createTodo')

  try {
    const response = await apiRequest.post(`${RESOURCE}`, JSON.stringify(data))

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
