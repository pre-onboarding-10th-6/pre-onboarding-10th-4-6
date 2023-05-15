export interface TodoData {
  title: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface SearchData {
  q: string
  result: string[]
  qty: number
  total: number
  page: number
  limit: number
}

export interface CommonResponse<T> {
  opcode: number
  message: string
  data: T
}
