import useInfiniteScroll from '../../../../hooks/useInfiniteScroll'
import { useSearchContext, useSearchDispatchContext } from '../context/context'
import { SEARCH_AT } from '../context/reducer'
import * as S from '../style'

import DropdownItem from './DropdownItem'

const Dropdown = () => {
  const { state, dropdownPage } = useSearchContext()
  const { dispatch, callSearchAPI, callCreateTodoAPI } =
    useSearchDispatchContext()

  const { targetRef } = useInfiniteScroll(async ([entry]) => {
    if (entry.isIntersecting && state.dropdownStatus === 'next') {
      const page = dropdownPage !== null ? ++dropdownPage.current : 1
      dispatch({ type: SEARCH_AT.SET_DROPDOWN_STATUS, payload: 'loading' })
      await callSearchAPI(state.input, page)
    }
  })

  const onClickHandler = async (todo: string) => {
    dispatch({ type: SEARCH_AT.SET_FOCUS, payload: false })
    await callCreateTodoAPI(todo)
    dispatch({
      type: SEARCH_AT.SET_SEARCH,
      payload: { input: '', result: [''] }
    })
    alert('선택한 Todo가 생성되었습니다')
  }

  const DropdownIcon = () => {
    return (
      <>
        {state.result[0] !== '' && state.dropdownStatus === 'next' && (
          <S.ThreeDots />
        )}
        {state.dropdownStatus === 'loading' && (
          <S.Spinner className="spinner" />
        )}
      </>
    )
  }

  return state.isFocus ? (
    <S.List>
      {state.result.map((todo, idx) => (
        <DropdownItem
          key={idx}
          todo={todo}
          isSearchLoading={state.isSearchLoading}
          input={state.input}
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
