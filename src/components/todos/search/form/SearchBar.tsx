import useDebouncer from '../../../../hooks/useDebounce'
import { useSearchContext, useSearchDispatchContext } from '../context/context'
import { SEARCH_AT } from '../context/reducer'
import * as S from '../style'
import { SearchBarProps } from '../types'

const SearchBar = ({ LeftIcon, rightIcon }: SearchBarProps) => {
  const { state, dropdownPage } = useSearchContext()
  const { dispatch, callSearchAPI } = useSearchDispatchContext()

  const debounced = useDebouncer(
    async (curInput: string) => {
      if (curInput === '') {
        dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: false })
        return
      }
      await callSearchAPI(curInput, dropdownPage.current)
    },
    (bool: boolean) =>
      dispatch({ type: SEARCH_AT.SET_SEARCH_LOADING, payload: bool }),
    500
  )

  const onFocus = () => dispatch({ type: SEARCH_AT.SET_FOCUS, payload: true })
  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SEARCH_AT.SET_SEARCH,
      payload: { input: e.target.value, result: [''] }
    })
    dropdownPage.current = 1
    debounced(e.target.value)
  }

  return (
    <S.SearchBox>
      {LeftIcon}
      <S.Input
        placeholder="todo를 추가하세요"
        type="text"
        onChange={onInputChangeHandler}
        onFocus={onFocus}
        value={state.input}
      />
      {state.isSearchLoading && rightIcon}
    </S.SearchBox>
  )
}
export default SearchBar
