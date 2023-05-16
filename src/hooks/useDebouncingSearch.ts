import { useState } from 'react'

import { getSearchItemList } from '../api/search'

const useDebouncingSearch = (delay: number) => {
  const [searchResult, setSearchResult] = useState<string[]>([])
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)

  const handleSearch = async (searchWord: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const timeout = setTimeout(async () => {
      const res = await getSearchItemList(searchWord, page, limit)
      const { opcode, data } = res
      console.log('1', res)
      if (opcode === 200 && data.result.length > 0) {
        setSearchResult(data.result)
        setTotal(data.total)
        if (data.total > data.qty) {
          setPage(prevPage => prevPage + 1)
        }
      } else {
        setSearchResult([])
      }
    }, delay)

    setTimeoutId(timeout)
  }

  const loadMoreResults = async (searchWord: string) => {
    const timeout = setTimeout(async () => {
      console.log(`page:${page},q:${searchWord}`)
      const res = await getSearchItemList(searchWord, page, limit)
      const { opcode, data } = res
      console.log(`total:${data.total}, length:${searchResult.length}`)
      if (opcode === 200 && data.result.length > 0) {
        setSearchResult(prevResults => [...prevResults, ...data.result])
        if (data.total > searchResult.length) {
          setPage(prevPage => prevPage + 1)
        }

        if (data.total === searchResult.length) {
          setTotal(data.total)
        }
      }
    }, delay)
    setTimeoutId(timeout)
  }

  return {
    searchResult,
    handleSearch,
    loadMoreResults,
    total,
    setPage,
    setSearchResult
  }
}

export default useDebouncingSearch
