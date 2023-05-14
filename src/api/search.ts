import { AxiosResponse } from 'axios'

import { SearchResult } from '../components/todos/search/types'

import baseInstance from './index'

const RESOURCE = '/search'

export const getSearch = async (
  query: string
): Promise<AxiosResponse<SearchResult>> => {
  try {
    const response = await baseInstance.get(`${RESOURCE}?${query}`)

    return response
  } catch (error) {
    throw new Error('API search error')
  }
}
