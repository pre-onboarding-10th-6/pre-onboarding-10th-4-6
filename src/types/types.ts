type SearchResult = {
  q: string
  result: string[]
  qty: number
  total: number
  page: number
  limit: number
}

export type SearchResponse = {
  opcode: number
  message: string
  data: SearchResult
}
