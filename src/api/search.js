import apiRequest from './index'

export const getSearchList = async keyword => {
  try {
    if (!keyword) {
      return
    }
    const response = await apiRequest.get(`search?q=${keyword}&page=1&limit=10`)
    console.log(response)
    return response
  } catch (error) {
    throw new Error('API getSearchList error')
  }
}
