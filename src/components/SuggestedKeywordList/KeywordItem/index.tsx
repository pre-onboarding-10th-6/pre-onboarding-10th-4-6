import React from 'react'

import { highlightText } from '../../../utils/highlightText'

import { Highlighted, ListItem } from './styles'

interface KeywordItemProps {
  item: string
  keyword: string
  onSelect: (selectedText: string) => Promise<void>
}

const KeywordItem: React.FC<KeywordItemProps> = ({
  item,
  keyword,
  onSelect
}) => {
  const splitText = highlightText(item, keyword)
  const handleClick = () => {
    onSelect(item)
  }

  return (
    <ListItem onClick={handleClick}>
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
