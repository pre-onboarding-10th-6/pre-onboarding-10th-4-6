import React from 'react'
import styled from 'styled-components'

import { SearchData } from '../api/search'
import { highlightText } from '../utils/highlightText'

const ListContainer = styled.div`
  width: 100%;
  max-height: 164px;
  overflow-y: scroll;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
    0px 2px 4px rgba(50, 50, 50, 0.1);
`

const ListItem = styled.li`
  list-style-type: none;
  padding: 6px 12px;
  border-radius: 3px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    opacity: 0.85;
    background-color: #eaeaea;
    border: 1px solid #dedede;
  }
`
const Highlighted = styled.span`
  color: red;
`
interface RecommandKeywordProp {
  keywordData: SearchData | null
  keyword: string
}

const RecommandKeyword: React.FC<RecommandKeywordProp> = ({
  keywordData,
  keyword
}) => {
  const shouldRenderList =
    keyword.trim() !== '' && keywordData && keywordData?.result?.length > 0
  return (
    <ListContainer>
      {shouldRenderList ? (
        <ul>
          {keywordData?.result?.map((item, index) => {
            const splitText = highlightText(item, keyword)
            return (
              <ListItem key={index}>
                {splitText.map((text, i) =>
                  text.toLowerCase() === keyword.toLowerCase() ? (
                    <Highlighted key={i}>{text}</Highlighted>
                  ) : (
                    text
                  )
                )}
              </ListItem>
            )
          })}
        </ul>
      ) : keyword.trim() !== '' &&
        keywordData?.result &&
        keywordData?.result.length !== 0 ? (
        <p>Loading...</p>
      ) : null}
    </ListContainer>
  )
}

export default RecommandKeyword
