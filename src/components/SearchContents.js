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

  //   const searchSubstring = (matchingItems, values) => {
  //     return matchingItems.includes(values)
  //   }

  return (
    <>
      {values.length > 0 && (
        <div className="container">
          <SearchContainer>
            <Text>{values}</Text>
            {matchingItems?.map((item, idx) => (
              <>
                {item.includes(values) ? (
                  <IncludedList key={idx}>
                    {item.split(values)[0]}
                    <span style={{ color: '#2BC9BA' }}>{values}</span>
                    {item.split(values)[1]}
                  </IncludedList>
                ) : (
                  item
                )}
              </>
            ))}
          </SearchContainer>
        </div>
      )}
    </>
  )
}

export default SearchContents

const SearchContainer = styled.ul`
  position: absolute;
  top: 500px;
  left: 0;
  width: 500px;
  height: 300px;
  background: blue;
`

const Text = styled.div`
  color: #2bc9ba;
`

const IncludedList = styled.li`
  color: #fff;
`
