import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'

import { SearchData } from '../api/search'

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
  keywordData: SearchData | null
  keyword: string
  isLoading: boolean
}

const RecommandKeywordList: React.FC<RecommandKeywordListProp> = ({
  keywordData,
  keyword,
  isLoading
}) => {
  const shouldRenderList =
    keyword.trim() !== '' && keywordData && keywordData?.result?.length > 0

  if (isLoading && keyword.trim() !== '') {
    return (
      <ListContainer>
        <FaSpinner className="spinner" />
      </ListContainer>
    )
  }

  if (!shouldRenderList) {
    return null
  }

  return (
    <ListContainer>
      <ul>
        {keywordData?.result?.map((item, index) => (
          <KeywordItem key={index} item={item} keyword={keyword} />
        ))}
      </ul>
    </ListContainer>
  )
}
// TODO: 아이템 하나를 선택하면, input의 value는 초기화되고 아이템이 리스트에 ? 추가되도록 구현 TODOLIST에 추가하라는거 같음
//       리스트를 선택 -> inputText초기화 -> createTodo API에 선택한 텍스트로 createTodo 호출
// TODO: 리스트가 처음에 10개 나올 수 있도록하고 더 있으면 무한 스크롤로 최대 10개씩 받아올 수 있도록 구현
export default RecommandKeywordList
