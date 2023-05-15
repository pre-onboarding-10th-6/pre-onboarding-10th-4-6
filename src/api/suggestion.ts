import { URLSearchParams } from 'url'

import { AxiosResponse } from 'axios'

import { ISuggestionReq, ISuggestionRes } from '../types/suggestion'

import apiRequest from '.'

const RESOURCE = '/search'
export const getSuggestion = async ({
  q,
  page,
  limit
}: ISuggestionReq): Promise<AxiosResponse<ISuggestionRes[]>> => {
  const params = new URLSearchParams({ q })
  if (page) {
    params.append('page', page.toString())
  }
  if (limit) {
    params.append('limit', limit.toString())
  }
  try {
    const response = await apiRequest.get(`${RESOURCE}?${params}`)
    return response
  } catch (error) {
    throw new Error('API getSuggestion error')
  }
}
