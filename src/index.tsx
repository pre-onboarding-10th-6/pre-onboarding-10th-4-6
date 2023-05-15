import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AxiosClient } from './axiosClient'
import { TodoProvider } from './context/todoContext'
import { TodoService } from './service/TodoService'

const axiosClient = new AxiosClient(
  process.env.REACT_APP_API_URL || '',
  process.env.REACT_APP_TOKEN || ''
)
const todoService = new TodoService(axiosClient)

ReactDOM.render(
  <StrictMode>
    <TodoProvider todoService={todoService}>
      <App />
    </TodoProvider>
  </StrictMode>,
  document.getElementById('root')
)
