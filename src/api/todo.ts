import apiRequest from './index'

const RESOURCE = '/todos'

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get<Todo[]>(`${RESOURCE}`)

    return response
  } catch (error) {
    throw new Error('API getTodoList error')
  }
}

export const createTodo = async (data: { title: string }) => {
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

export const getSuggestions = async (
  query: string,
  page: number,
  limit = 10
) => {
  try {
    const response = await apiRequest.get<SuggestionsPayload>(
      `/search?q=${query}&page=${page}&limit=${limit}`
    )

    return response
  } catch (error) {
    throw new Error('API getSuggestions error')
  }
}
