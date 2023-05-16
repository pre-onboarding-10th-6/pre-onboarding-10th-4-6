import { AxiosResponse } from 'axios'

import { ICreateTodo, ITodo } from '../types/todo'

import apiRequest from './index'

const RESOURCE = '/todos'

export const getTodoList = async (): Promise<AxiosResponse<ITodo[]>> => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`)

    return response
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

export const createTodo = async (
  data: ICreateTodo
): Promise<AxiosResponse<ITodo>> => {
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
