import { FaPlusCircle, FaSpinner } from 'react-icons/fa'
import { styled } from 'styled-components'

export const InputForm = styled.form`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  border-radius: calc(0.5 * 100px);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
  justify-content: space-evenly;
`
export const Input = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 85%;
  padding-right: 5px;
  padding-left: 10px;
  border-radius: calc(0.5 * 100px);
  background-color: transparent;
`

export const Button = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`
export const Circle = styled(FaPlusCircle)`
  color: darkcyan;
  font-size: 20px;
`
export const Spinner = styled(FaSpinner)`
  font-size: 20px;
  animation: spin 2s linear infinite;
  display: flex;
  align-self: center;
`
