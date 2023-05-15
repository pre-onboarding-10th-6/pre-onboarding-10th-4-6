import React from 'react'

type HighlightTextProps = {
  text: string
  searchText: string
}

const HighlightingText: React.FC<HighlightTextProps> = ({
  text,
  searchText
}) => {
  if (!searchText) return <>{text}</>

  const regex = new RegExp(`(${searchText})`, 'gi')
  const sentence = text.split(regex)
  //   console.log('sentence', sentence)
  return (
    <>
      {sentence.map((word, idx) => (
        <span
          key={`part_${idx}`}
          style={
            word.toLowerCase() === searchText.toLowerCase()
              ? { color: '#2BC9BA' }
              : undefined
          }
        >
          {word}
        </span>
      ))}
    </>
  )
}

export default HighlightingText
