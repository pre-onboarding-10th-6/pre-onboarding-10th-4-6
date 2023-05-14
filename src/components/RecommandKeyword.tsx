import React from 'react'
import styled from 'styled-components'

import { highlightText } from '../utils/highlightText'

const mockData = {
  opcode: 200,
  message: 'OK',
  data: {
    q: 'lorem',
    result: [
      'Maecenas in lorem sit amet felis volutpat dapibus vulputate at dui.',
      'Nam porta lorem ut turpis pellentesque, et efficitur felis ullamcorper.',
      'Duis fringilla turpis vel lorem eleifend, sit amet hendrerit velit gravida.',
      'Cras in felis eget augue cursus placerat ac eget lorem.',
      'Sed id orci quis mi porttitor pulvinar cursus eget lorem.',
      'Fusce tincidunt lorem ac purus elementum, ut fermentum lacus mollis.',
      'Nam commodo lorem ac posuere dignissim.',
      'Etiam eu elit finibus enim consequat scelerisque aliquam vulputate lorem.',
      'Donec in lorem id eros ornare aliquam ut a nisi.',
      'Donec efficitur nulla eget lorem sollicitudin, in blandit massa dictum.'
    ],
    qty: 10,
    total: 19,
    page: 1,
    limit: 10
  }
}

const ListContainer = styled.div`
  width: 100%;
  max-height: 164px;
  overflow-y: scroll;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
    0px 2px 4px rgba(50, 50, 50, 0.1);
`

const ListItem = styled.li`
  list-style-type: none;
  padding: 6px 12px;
  border-radius: 3px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    opacity: 0.85;
    background-color: #eaeaea;
    border: 1px solid #dedede;
  }
`
const Highlighted = styled.span`
  color: red;
`
interface RecommandKeywordProps {
  keyword: string
}

const RecommandKeyword: React.FC<RecommandKeywordProps> = ({ keyword }) => {
  console.log(keyword)

  return (
    <ListContainer>
      <ul>
        {mockData.data.result.map((item, index) => {
          const splitText = highlightText(item, keyword)
          return (
            <ListItem key={index}>
              {splitText.map((text, i) =>
                text.toLowerCase() === keyword.toLowerCase() ? (
                  <Highlighted key={i}>{text}</Highlighted>
                ) : (
                  text
                )
              )}
            </ListItem>
          )
        })}
      </ul>
    </ListContainer>
  )
}

export default RecommandKeyword
