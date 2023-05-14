import { useContext } from 'react'

import { SearchContext } from '../context'

import * as S from './style'

const highlightSearchText = (text: string, query: string): JSX.Element => {
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : <>{part}</>
      )}
    </span>
  )
}

const Dropdown = () => {
  const { isFocus, input, result, isLoading } = useContext(SearchContext)

  return isFocus ? (
    <S.List>
      {result.map((todo, idx) =>
        todo === '' ? (
          <S.DropdownItem key={idx}>
            일치하는 검색결과가 없습니다..
          </S.DropdownItem>
        ) : (
          <S.DropdownItem key={idx}>
            {isLoading ? todo : highlightSearchText(todo, input)}
          </S.DropdownItem>
        )
      )}
    </S.List>
  ) : (
    <></>
  )
}

export default Dropdown
