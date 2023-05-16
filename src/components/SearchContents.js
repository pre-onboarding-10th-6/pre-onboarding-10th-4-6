import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { getSearchList } from '../api/search'

const SearchContents = ({ values }) => {
  const [matchingItems, setMatchingItems] = useState([])

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const response = await getSearchList(values)
        const data = response?.data.result

        setMatchingItems(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [values])

  return (
    <>
      {values.length > 0 && (
        <SearchWrapper>
          <SearchContainer>
            {matchingItems?.map((item, idx) => (
              <Suggestions key={idx}>
                {item.includes(values) && (
                  <SuggestedItem>
                    {item.split(values)[0]}
                    <IncludedItem>{values}</IncludedItem>
                    {item.split(values)[1]}
                  </SuggestedItem>
                )}
              </Suggestions>
            ))}
          </SearchContainer>
        </SearchWrapper>
      )}
    </>
  )
}

export default SearchContents

const SearchWrapper = styled.div`
  background: red;
`

const SearchContainer = styled.ul`
  position: absolute;
  top: 49px;
  left: 0;
  width: 100%;
  max-height: 164px;
  padding: 9px 5px;
  background: #fff;
  border: 1px solid #dedede;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
    0px 2px 4px rgba(50, 50, 50, 0.1);
  border-radius: 5px;
  overflow-y: scroll;
  z-index: 99;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.48);
    margin 10px;
  }

  &::-webkit-scrollbar-track {
    width: 4px;
    border-radius: 2px;
    background: none;
  }
`

const Suggestions = styled.li`
  padding: 6px 12px;
  text-decoration: none;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: #f2f2f2;
    border-radius: 3px;
    cursor: pointer;
  }
`

const SuggestedItem = styled.div``

const IncludedItem = styled.span`
  color: #2bc9ba;
`
