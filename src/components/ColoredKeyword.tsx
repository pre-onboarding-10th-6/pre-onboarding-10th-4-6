import styled from 'styled-components'

interface ColoredKeywordProps {
  text: string
  keyword: string
}

const ColoredKeyword = ({ text, keyword }: ColoredKeywordProps) => {
  const words = text.split(keyword)
  return (
    <>
      {words.map((word, index) =>
        index > 0 ? (
          <span key={word + index}>
            <Keyword>{keyword}</Keyword>
            {word}
          </span>
        ) : (
          <span key={word + index}>{word}</span>
        )
      )}
    </>
  )
}

const Keyword = styled.span`
  color: #2bc9ba;
`

export default ColoredKeyword
