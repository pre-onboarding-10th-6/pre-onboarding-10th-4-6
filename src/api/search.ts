import { AxiosResponse } from 'axios'

import { SearchResult } from '../components/todos/search/types'

import baseInstance from './index'

const RESOURCE = '/search'

export const getSearch = async (
  query: string
): Promise<AxiosResponse<SearchResult>> =>
  await baseInstance.get(`${RESOURCE}?${query}`)
