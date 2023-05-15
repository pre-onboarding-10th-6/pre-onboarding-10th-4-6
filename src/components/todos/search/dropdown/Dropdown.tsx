import useInfiniteScroll from '../../../../hooks/useInfiniteScroll'
import { useSearchContext, useSearchDispatchContext } from '../context'
import * as S from '../style'

import DropdownItem from './DropdownItem'

const Dropdown = () => {
  const {
    isFocus,
    searchState,
    isSearchLoading,
    dropdownStatus,
    dropdownPage
  } = useSearchContext()
  const {
    onFocusHandler,
    setSearchState,
    setDropdownStatus,
    callSearchAPI,
    callCreateTodoAPI
  } = useSearchDispatchContext()

  const { targetRef } = useInfiniteScroll(async ([entry]) => {
    if (entry.isIntersecting && dropdownStatus === 'next') {
      const page = dropdownPage !== null ? ++dropdownPage.current : 1
      setDropdownStatus('loading')
      await callSearchAPI(searchState.input, page)
    }
  })

  const onClickHandler = async (todo: string) => {
    onFocusHandler(false)
    await callCreateTodoAPI(todo)
    setSearchState({
      input: '',
      result: ['']
    })
  }

  const DropdownIcon = () => {
    return (
      <>
        {searchState.result[0] !== '' && dropdownStatus === 'next' && (
          <S.ThreeDots />
        )}
        {dropdownStatus === 'loading' && <S.Spinner className="spinner" />}
      </>
    )
  }

  return isFocus ? (
    <S.List>
      {searchState.result.map((todo, idx) => (
        <DropdownItem
          key={idx}
          todo={todo}
          isSearchLoading={isSearchLoading}
          input={searchState.input}
          onClickHandler={onClickHandler}
          ref={targetRef}
        />
      ))}
      <DropdownIcon />
    </S.List>
  ) : (
    <></>
  )
}

export default Dropdown
