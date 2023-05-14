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
