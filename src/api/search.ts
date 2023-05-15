import { ApiResponse } from './todo'

import apiRequest from './index'

const RESOURCE = '/search'

export interface SearchData {
  q: string
  page: number
  limit: number
  result: string[]
  qty: number
  total: number
}

interface SearchParams {
  q: string
  page?: number
  limit?: number
}

export const getSearchData = async ({
  q,
  page,
  limit
}: SearchParams): Promise<ApiResponse<SearchData>> => {
  try {
    let url = `${RESOURCE}?q=${q}`
    if (page) {
      url += `&page=${page}`
    }
    if (limit) {
      url += `&limit=${limit}`
    }

    const response = await apiRequest.get<SearchData>(url)

    return response
  } catch (error) {
    throw error
  }
}
