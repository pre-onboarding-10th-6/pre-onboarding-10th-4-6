import styled from 'styled-components'

export const ListItem = styled.li`
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
export const Highlighted = styled.span`
  color: red;
`
