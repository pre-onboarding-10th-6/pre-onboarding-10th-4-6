export interface ISuggestionReq {
  q: string
  page?: number
  limit?: number
}

export interface ISuggestionRes {
  q: string
  page: number
  limit: number
  result: string[]
  qty: number
  total: number
}
