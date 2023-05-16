import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'

import { SearchData, getSearchData } from '../api/search'
import useDebounce from '../hooks/useDebounce'

import KeywordItem from './KeywordItem'

const ListContainer = styled.div`
  width: 100%;
  max-height: 164px;
  overflow-y: scroll;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
    0px 2px 4px rgba(50, 50, 50, 0.1);
`
interface RecommandKeywordListProp {
  keyword: string
  onSelect: (selectedText: string) => Promise<void>
}
const RecommandKeywordList: React.FC<RecommandKeywordListProp> = ({
  keyword,
  onSelect
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [keywordData, setKeywordData] = useState<SearchData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debouncedKeyword = useDebounce(keyword, 500)

  const shouldRenderList =
    keyword.trim() !== '' && keywordData && keywordData?.result?.length > 0

  const handleMoreButtonClick = () => {
    setCurrentPage(prevPageNumber => prevPageNumber + 1)
  }

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
      limit: 10
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
          {isLoading ? (
            <FaSpinner className="spinner" />
          ) : (
            <FaChevronDown onClick={handleMoreButtonClick} />
          )}
        </li>
      </ul>
    </ListContainer>
  )
}
export default RecommandKeywordList
