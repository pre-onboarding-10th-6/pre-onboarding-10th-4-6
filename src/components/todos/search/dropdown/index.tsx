import { useContext } from 'react'

import { SearchContext } from '../context'

import * as S from './style'

interface Props {
  children?: React.ReactNode
}

const Dropdown = ({ children }: Props) => {
  const { isFocus } = useContext(SearchContext)
  console.log(isFocus)
  return isFocus ? <S.List>{children}</S.List> : <></>
}

Dropdown.Item = ({ children }: Props) => {
  return <S.DropdownItem>{children}</S.DropdownItem>
}

export default Dropdown
