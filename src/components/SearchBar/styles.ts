import { styled } from 'styled-components'

export const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 45px;
  border: 1px solid #dedede;
  box-shadow: 0 0 3px #dedede;

  &:hover {
    outline: 2px solid #dedede;
  }
  &:focus {
    border-color: #9f9f9f;
    outline: none;
  }

  &::placeholder {
    color: #dedede;
  }
`

export const DropDown = styled.ul`
  width: 100%;
  max-height: 164px;
  border-radius: 5px;
  padding: 9px 5px;
  border: 1px solid #dedede;
  overflow-y: auto;
`

export const DropDownItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 12px;
  width: 100%;
  letter-spacing: 1.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
