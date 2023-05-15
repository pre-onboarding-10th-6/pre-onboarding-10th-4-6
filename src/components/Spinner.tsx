import { keyframes, styled } from 'styled-components'

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const SpinnerStyle = styled.span`
  width: 14.64px;
  height: 14.64px;
  border: 1px solid #4b4b4b;
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`

const Spinner = () => {
  return (
    <div>
      <SpinnerStyle />
    </div>
  )
}

export default Spinner
