import { SearchResponse } from '../types/types'

import apiRequest from '.'

export const getSearchItemList = async (
  searchWord: string,
  page: number,
  limit: number
): Promise<SearchResponse> => {
  try {
    const response = await apiRequest.get<SearchResponse>('/search', {
      params: { q: searchWord, page: page, limit: limit }
    })

    return response.data
  } catch (error) {
    console.error('API getSearchItemList error:', error)
    throw new Error('API getSearchItemList error')
  }
}
