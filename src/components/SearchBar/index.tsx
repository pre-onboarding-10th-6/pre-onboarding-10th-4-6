import React, { useEffect, useRef, useState } from 'react'

import useClickAndBlur from '../../hooks/useClickAndBlur'
import useDebouncingSearch from '../../hooks/useDebouncingSearch'
import HighlightingText from '../HighlightingText'

import { DropDown, DropDownItem, Input } from './styles'

const SearchBar: React.FC = () => {
  const scrollRef = useRef<HTMLUListElement>(null)
  const [searchText, setSearchText] = useState<string>('')
  const { isClicked, handleClick, handleBlur } = useClickAndBlur()
  const { searchResult, handleSearch, loadMoreResults, total, setPage } =
    useDebouncingSearch(500)

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
  const handleItemClick = (item: string) => {
    console.log('item', item)
    setSearchText('')
    handleSearch('')
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
  console.log('searchText', searchResult)
  //   console.log('total', total)
  return (
    <>
      <Input
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
        </DropDown>
      )}
    </>
  )
}

export default SearchBar
