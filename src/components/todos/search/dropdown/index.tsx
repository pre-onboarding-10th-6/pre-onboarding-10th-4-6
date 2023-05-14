import { useContext } from 'react'

import { createTodo } from '../../../../api/todo'
import { Todo } from '../../list/types'
import { SearchContext, SearchDispatchContext } from '../context'

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

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Dropdown = ({ setTodos }: Props) => {
  const { isFocus, input, result, isLoading } = useContext(SearchContext)
  const { setInput, onFocusHandler, setResult } = useContext(
    SearchDispatchContext
  )

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
          <S.DropdownItem key={idx} onClick={() => onClickHandler(todo)}>
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
