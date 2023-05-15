import styled from 'styled-components'

interface IProps {
  suggestList: string[] | undefined
  dropdownRef: React.RefObject<HTMLDivElement>
}
const SuggestList = ({ suggestList, dropdownRef }: IProps) => {
  return (
    <StWrap>
      <StSuggestListContainer ref={dropdownRef}>
        <StUl>
          {suggestList?.map(v => {
            return <StLi key={v}>{v}</StLi>
          })}
        </StUl>
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
  width: 100%;
  height: 200px;
  overflow: scroll;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
`
const StUl = styled.ul``

const StLi = styled.li`
  list-style: none;
  padding: 8px 12px;
`
