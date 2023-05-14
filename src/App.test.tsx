import { render } from '@testing-library/react'

import '@testing-library/jest-dom' //toBeInTheDocument() 를 사용하기 위해서 필요합니다!
import App from './App'

// describe('<App />', () => {
//   it('App render', () => {
//     render(<App />)
//   })
// })

test('renders App Component', () => {
  render(<App />)
})
