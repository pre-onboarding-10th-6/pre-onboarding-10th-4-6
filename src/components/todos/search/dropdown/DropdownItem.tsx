import { Fragment, forwardRef } from 'react'

import * as S from '../style'
import { DropdownItemProps } from '../types'

const highlightSearchText = (text: string, query: string): JSX.Element => {
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </span>
  )
}

const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ todo, isSearchLoading, input, onClickHandler }, ref) => {
    return todo === '' ? (
      <S.DropdownItem>일치하는 검색결과가 없습니다..</S.DropdownItem>
    ) : (
      <S.DropdownItem ref={ref} onClick={() => onClickHandler(todo)}>
        {isSearchLoading ? todo : highlightSearchText(todo, input)}
      </S.DropdownItem>
    )
  }
)

export default DropdownItem
