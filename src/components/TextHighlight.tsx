import { styled } from 'styled-components'

import { COLORS } from '../styles/palatte'

interface IProps {
  targetText: string
  searchText: string
}

const TextHighlight = ({ targetText, searchText }: IProps) => {
  if (!searchText) {
    return <>{targetText}</>
  }

  const regex = new RegExp(`(${searchText})`, 'gi')
  const parts = targetText.split(regex)

  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part.match(regex) ? <StHighlightText>{part}</StHighlightText> : part}
        </span>
      ))}
    </>
  )
}

export default TextHighlight

const StHighlightText = styled.mark`
  color: ${COLORS.GREEN_500};
  background-color: transparent;
`
