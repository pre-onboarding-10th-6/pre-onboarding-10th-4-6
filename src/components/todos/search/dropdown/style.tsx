import styled from 'styled-components'

export const List = styled.ul`
  border: 1px solid rgb(194, 200, 206);
  border-radius: 20px;
  padding: 12px;
  padding-bottom: 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px 16px;
`

export const DropdownItem = styled.li`
  list-style: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  padding: 8px;
  p {
    margin: 0;
  }
  &.focused {
    background: rgb(248, 249, 250);
  }
  &:hover {
    background: rgb(248, 249, 250);
  }
`
