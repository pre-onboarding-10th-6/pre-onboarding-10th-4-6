import { useSearchContext, useSearchDispatchContext } from '../context'
import * as S from '../style'
import { SearchBarProps } from '../types'

const SearchBar = ({ LeftIcon, rightIcon }: SearchBarProps) => {
  const { searchState, isSearchLoading } = useSearchContext()
  const { onFocusHandler, onInputChangeHandler } = useSearchDispatchContext()

  const onFocus = () => onFocusHandler(true)

  return (
    <S.SearchBox>
      {LeftIcon}
      <S.Input
        placeholder="todo를 추가하세요"
        type="text"
        onChange={onInputChangeHandler}
        onFocus={onFocus}
        value={searchState.input}
      />
      {isSearchLoading && rightIcon}
    </S.SearchBox>
  )
}
export default SearchBar
