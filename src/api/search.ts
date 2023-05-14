import apiRequest from './index'

const RESOURCE = '/search'

export interface SearchResponse {
  opcode: number
  message: string
  data: SearchData
}

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
}: SearchParams): Promise<SearchResponse> => {
  console.log('getSearchData called' + q + page + limit)
  try {
    let url = `${RESOURCE}?q=${q}`
    if (page) {
      url += `&page=${page}`
    }
    if (limit) {
      url += `&limit=${limit}`
    }
    console.log(url)

    const response = await apiRequest.get(url)
    console.log(response)

    return response
  } catch (error) {
    throw error
  }
}
