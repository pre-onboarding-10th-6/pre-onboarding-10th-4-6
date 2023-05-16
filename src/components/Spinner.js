import { FaSpinner } from 'react-icons/fa'
import { keyframes, styled } from 'styled-components'

const Spinner = () => {
  return (
    <SpinnerWrap>
      <FaSpinner className="spinner-icon" />
    </SpinnerWrap>
  )
}

export default Spinner

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`
const SpinnerWrap = styled.div`
  font-size: 20px;
  animation: ${spin} 2s linear infinite;
  display: flex;
  align-self: center;
`
