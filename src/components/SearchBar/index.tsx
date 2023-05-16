import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'

import { createTodo } from '../../api/todo'
import useClickAndBlur from '../../hooks/useClickAndBlur'
import useDebouncingSearch from '../../hooks/useDebouncingSearch'
import useFocus from '../../hooks/useFocus'
import { TodoData } from '../../types/types'
import HighlightingText from '../HighlightingText'
import { Spinner } from '../InputTodo/styles'

import { DropDown, DropDownItem, Input, SpinnerWrapper } from './styles'

interface InputTodoProps {
  setTodos: Dispatch<SetStateAction<TodoData[]>>
}
const SearchBar: React.FC<InputTodoProps> = ({ setTodos }) => {
  const { ref, setFocus } = useFocus()
  const scrollRef = useRef<HTMLUListElement>(null)
  const [searchText, setSearchText] = useState<string>('')
  const { isClicked, handleClick, handleBlur } = useClickAndBlur()
  const {
    searchResult,
    handleSearch,
    loadMoreResults,
    total,
    setPage,
    setSearchResult
  } = useDebouncingSearch(500)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value
    setPage(1)
    setSearchText(searchWord)
    handleSearch(searchWord)
  }

  const handleScroll = () => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop + scrollRef.current.clientHeight ===
        scrollRef.current.scrollHeight &&
      searchResult.length < total
    ) {
      loadMoreResults(searchText)
    }
  }
  const handleItemClick = async (item: string) => {
    const { data } = await createTodo({ title: item })
    if (data) {
      setTodos((prev: any) => [...prev, data])
      setSearchText('')
      setSearchResult([])
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, searchText, searchResult, total])
  // console.log('searchText', searchResult)
  //   console.log('total', total)
  return (
    <>
      <Input
        ref={ref}
        value={searchText}
        placeholder="검색어 입력"
        onClick={handleClick}
        onBlur={handleBlur}
        style={{ borderColor: isClicked ? '#9f9f9f' : undefined }}
        data-cy="search-input"
        onChange={handleChange}
      />
      {searchResult.length > 0 && (
        <DropDown ref={scrollRef} data-cy="search-dropdown">
          {searchResult.map((item, idx) => (
            <DropDownItem
              key={idx}
              data-cy="dropdown-item"
              onClick={() => handleItemClick(item)}
            >
              <HighlightingText text={item} searchText={searchText} />
            </DropDownItem>
          ))}

          {searchResult.length < total && (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          )}
        </DropDown>
      )}
    </>
  )
}

export default SearchBar
