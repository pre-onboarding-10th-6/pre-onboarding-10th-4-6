import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'

import { SearchData, getSearchData } from '../api/search'
import useDebounce from '../hooks/useDebounce'
import useIntersectionObserver from '../hooks/useInfiniteScroll'

import KeywordItem from './KeywordItem'

const ListContainer = styled.div`
  width: 100%;
  max-height: 164px;
  overflow-y: scroll;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
    0px 2px 4px rgba(50, 50, 50, 0.1);
`
const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`

interface RecommandKeywordListProp {
  keyword: string
  onSelect: (selectedText: string) => Promise<void>
}

const PAGE_LIMIT = 10
const DELAY_TIME = 500

const RecommandKeywordList: React.FC<RecommandKeywordListProp> = ({
  keyword,
  onSelect
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [keywordData, setKeywordData] = useState<SearchData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const debouncedKeyword = useDebounce(keyword, DELAY_TIME)
  const totalResults = keywordData?.total || 0
  const totalPages = Math.ceil(totalResults / PAGE_LIMIT) ?? 0
  const isLastPage = currentPage >= totalPages

  const shouldRenderList =
    keyword.trim() !== '' && keywordData && keywordData?.result?.length > 0

  const handleMoreButtonClick = () => {
    if (isLastPage) {
      return
    }
    setCurrentPage(prevPageNumber => prevPageNumber + 1)
  }
  const { targetRef } = useIntersectionObserver(
    handleMoreButtonClick,
    isLoading
  )

  useEffect(() => {
    setCurrentPage(1)
    setKeywordData(null)
  }, [debouncedKeyword])

  useEffect(() => {
    if (debouncedKeyword.trim() === '') {
      setKeywordData(null)
      return
    }
    setIsLoading(true)
    getSearchData({
      q: debouncedKeyword,
      page: currentPage,
      limit: PAGE_LIMIT
    })
      .then(({ data }) => {
        setKeywordData(prevData => {
          if (prevData && currentPage > 1) {
            return {
              ...data,
              result: [...prevData.result, ...data.result]
            }
          } else {
            return data
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [debouncedKeyword, currentPage])

  if (!shouldRenderList) {
    return null
  }

  return (
    <ListContainer>
      <ul>
        {keywordData?.result?.map((item, index) => (
          <KeywordItem
            key={index}
            item={item}
            keyword={keyword}
            onSelect={onSelect}
          />
        ))}

        <li>
          <LoadMoreContainer ref={targetRef}>
            {!isLastPage && (
              <>
                {isLoading ? (
                  <FaSpinner className="spinner" />
                ) : (
                  <FaChevronDown />
                )}
              </>
            )}
          </LoadMoreContainer>
        </li>
      </ul>
    </ListContainer>
  )
}
export default RecommandKeywordList
