import baseInstance from './index'

const RESOURCE = '/todos'

export const getTodoList = async () => {
  try {
    const response = await baseInstance.get(`${RESOURCE}`)

    return response
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

interface PayloadCreate {
  title: string
}

export const createTodo = async (data: PayloadCreate) => {
  try {
    const response = await baseInstance.post(`${RESOURCE}`, data)

    return response
  } catch (error) {
    throw new Error('API createTodo error')
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const response = await baseInstance.delete(`${RESOURCE}/${id}`)

    return response
  } catch (error) {
    throw new Error('API deleteTodo error')
  }
}
