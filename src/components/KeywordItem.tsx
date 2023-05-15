import React from 'react'
import styled from 'styled-components'

import { highlightText } from '../utils/highlightText'

interface KeywordItemProps {
  item: string
  keyword: string
}

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

const KeywordItem: React.FC<KeywordItemProps> = ({ item, keyword }) => {
  const splitText = highlightText(item, keyword)

  return (
    <ListItem>
      {splitText.map((text, i) =>
        text.toLowerCase() === keyword.toLowerCase() ? (
          <Highlighted key={i}>{text}</Highlighted>
        ) : (
          text
        )
      )}
    </ListItem>
  )
}

export default KeywordItem
