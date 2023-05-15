import { AxiosResponse } from 'axios'

import { ISuggestionReq, ISuggestionRes } from '../types/suggestion'

import apiRequest from '.'

const RESOURCE = '/search'
export const getSuggestion = async ({
  q,
  page,
  limit
}: ISuggestionReq): Promise<AxiosResponse<ISuggestionRes>> => {
  const queryParts = [`q=${q}`]
  if (page) {
    queryParts.push(`page=${page.toString()}`)
  }
  if (limit) {
    queryParts.push(`limit=${limit.toString()}`)
  }
  const query = queryParts.join('&')
  try {
    const response = await apiRequest.get(`${RESOURCE}?${query}`)
    return response
  } catch (error) {
    throw new Error('API getSuggestion error')
  }
}
