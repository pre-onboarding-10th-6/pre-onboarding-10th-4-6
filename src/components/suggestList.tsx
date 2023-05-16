import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { getSuggestion } from '../api/suggestion'
import { StSpinner } from '../styles/common'
import { ISuggestionRes } from '../types/suggestion'
import throttle from '../utils/throttle'

interface IProps {
  suggest: ISuggestionRes
  dropdownRef: React.RefObject<HTMLDivElement>
}
const SuggestList = ({ suggest, dropdownRef }: IProps) => {
  const { q, page: initPage, result, total, limit } = suggest
  const [list, setList] = useState(result)
  const [page, setPage] = useState(initPage)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(e => {
      if (loading) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (!dropdownRef.current) {
        return
      }
      const scrollHeight = dropdownRef.current?.scrollHeight
      const scrollTop = dropdownRef.current?.scrollTop
      const clientHeight = dropdownRef.current?.clientHeight
      const scrolledHeight = Math.ceil(scrollTop + clientHeight)

      if (scrollHeight <= scrolledHeight) {
        setPage(_page => _page + 1)
      }
    })
    dropdownRef.current?.addEventListener('scroll', handleScroll)

    return () => {
      dropdownRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getSuggestListByPage = useCallback(async () => {
    if (page >= total) {
      alert('마지막페이지입니다.')
      return
    }
    setLoading(true)
    try {
      const { data } = await getSuggestion({ q, page, limit })
      setList(prevList => [...prevList, ...data.result])
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    if (page === 1) {
      return
    }
    getSuggestListByPage()
  }, [getSuggestListByPage])

  return (
    <StWrap>
      <StSuggestListContainer>
        <StSuggestListWrap ref={dropdownRef}>
          <StUl>
            {list?.map((v, idx) => {
              return <StLi key={v + idx.toString()}>{v}</StLi>
            })}
          </StUl>
        </StSuggestListWrap>
        {loading && (
          <StSpinnerWrap>
            <StSpinner />
          </StSpinnerWrap>
        )}
      </StSuggestListContainer>
    </StWrap>
  )
}

export default SuggestList
const StWrap = styled.div`
  position: relative;
`
const StSuggestListContainer = styled.div`
  position: absolute;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
  z-index: 10;
`
const StSuggestListWrap = styled.div`
  width: 100%;
  height: 200px;
  overflow: scroll;
`
const StUl = styled.ul``

const StLi = styled.li`
  list-style: none;
  padding: 8px 12px;
`
const StSpinnerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
`
