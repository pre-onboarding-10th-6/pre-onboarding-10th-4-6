import { FaSpinner } from 'react-icons/fa'
import styled from 'styled-components'

import { spin } from './animation'

export const StSpinner = styled(FaSpinner)`
  font-size: 20px;
  animation: ${spin} 2s linear infinite;
  display: flex;
  align-self: center;
`
