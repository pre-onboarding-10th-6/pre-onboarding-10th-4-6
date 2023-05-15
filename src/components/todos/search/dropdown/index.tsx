import { Fragment, useContext, useRef } from 'react'

import { getSearch } from '../../../../api/search'
import { createTodo } from '../../../../api/todo'
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll'
import { Todo } from '../../list/types'
import { SearchContext, SearchDispatchContext } from '../context'

import * as S from './style'

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

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Dropdown = ({ setTodos }: Props) => {
  const {
    isFocus,
    input,
    result,
    isSearchLoading,
    dropdownStatus,
    dropdownPage
  } = useContext(SearchContext)
  const {
    setInput,
    onFocusHandler,
    setResult,
    setDropdownStatus,
    callSearchAPI
  } = useContext(SearchDispatchContext)

  const { targetRef, isIntersecting } = useInfiniteScroll(async ([entry]) => {
    console.log(dropdownStatus)
    if (entry.isIntersecting && dropdownStatus === 'next') {
      const page = dropdownPage !== null ? ++dropdownPage.current : 1
      setDropdownStatus('loading')
      await callSearchAPI(input, page)
    }
  })

  // search.tsx -> handleSubmit과 유사
  const onClickHandler = async (todo: string) => {
    try {
      const { data } = await createTodo({ title: todo })
      if (data) {
        return setTodos(prev => [...prev, data])
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong.')
    } finally {
      setInput('')
      onFocusHandler(false)
      setResult([''])
    }
  }

  return isFocus ? (
    <S.List>
      {result.map((todo, idx) =>
        todo === '' ? (
          <S.DropdownItem key={idx}>
            일치하는 검색결과가 없습니다..
          </S.DropdownItem>
        ) : (
          <S.DropdownItem
            key={idx}
            ref={targetRef}
            onClick={() => onClickHandler(todo)}
          >
            {isSearchLoading ? todo : highlightSearchText(todo, input)}
          </S.DropdownItem>
        )
      )}
      {result[0] !== '' && dropdownStatus === 'next' && <S.ThreeDots />}
      {dropdownStatus === 'loading' && <S.Spinner className="spinner" />}
    </S.List>
  ) : (
    <></>
  )
}

export default Dropdown
