import apiRequest from '.'

export const searchTodo = async (
  keyword: string,
  page: number,
  limit: number
) => {
  try {
    const response = await apiRequest.get('search', {
      params: { q: keyword, page: page, limit: limit }
    })
    return response.data
  } catch (error) {
    throw new Error('API searchTodo error')
  }
}
