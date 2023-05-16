import React from 'react'
import { styled } from 'styled-components'

import { createTodo, Todo } from '../api/todo'

const DropdownBoxStyle = styled.ul`
  width: 100%;
  height: 164px;
  padding: 9px 5px 0;
  overflow-y: scroll;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0px #3232321a, 0px 0px 1px 0px #3232320d;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.48);
    width: 4px;
    height: 72px;
    background-clip: padding-box;
    border-top: 8px solid transparent;
    border-right: 4px solid transparent;
  }
`
const DropdownItemStyle = styled.li`
  width: 100%;
  height: 28px;
  padding: 6px 0 2px 12px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  border-radius: 3px;
  &:hover {
    background-color: #f2f2f2;
  }
  &:active {
    background-color: #d5f4f1;
  }
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`

const HighlightedWordStyle = styled.span`
  color: #2bc9ba;
`

const highlightKeywords = (keyword: string, result: string) => {
  const regex = new RegExp(keyword, 'gi')
  const parts = result.split(regex)
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 && <HighlightedWordStyle>{keyword}</HighlightedWordStyle>}
      {part}
    </React.Fragment>
  ))
}

interface DropdownProps {
  searchResult: string[]
  keyword: string
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>
  setInputText: React.Dispatch<React.SetStateAction<string>>
}

const Dropdown = ({
  searchResult,
  keyword,
  setTodos,
  setDropdown,
  setInputText
}: DropdownProps) => {
  const handleResultClick = async (el: string) => {
    try {
      const { data } = await createTodo({ title: el })
      setTodos(prev => [...prev, data])
    } catch (error) {
      console.error(error)
    } finally {
      setDropdown(false)
      setInputText('')
    }
  }
  return (
    <DropdownBoxStyle>
      {searchResult.length === 0 ? (
        <div>추천 검색어가 없습니다.</div>
      ) : (
        searchResult.map((el, index) => (
          <DropdownItemStyle
            key={index}
            onClick={() => {
              handleResultClick(el)
            }}
          >
            {highlightKeywords(keyword, el)}
          </DropdownItemStyle>
        ))
      )}
    </DropdownBoxStyle>
  )
}

export default Dropdown
