import { BsThreeDots } from 'react-icons/bs'
import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgb(194, 200, 206);
  border-radius: 42px;
  padding: 12px 20px;
  gap: 8px;
  input {
    font-size: 16px;
    flex: 1 1 80%;
    outline: none;
    border: none;
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      cursor: pointer;
    }
  }
`

export const List = styled.ul`
  border: 1px solid rgb(194, 200, 206);
  border-radius: 20px;
  padding: 24px;
  padding-bottom: 16px;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 184px;
  overflow-y: auto;
  overflow-x: hidden;
`

export const DropdownItem = styled.li`
  list-style: none;
  cursor: pointer;
  height: 28px;
  display: flex;
  padding: 4px;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

export const ThreeDots = styled(BsThreeDots)`
  width: 16px;
  flex: none;
  margin: 0 auto;
`

export const Spinner = styled(FaSpinner)`
  height: 16px;
  flex: none;
  margin: 4px auto 0px;
`

export const Input = styled.input``
