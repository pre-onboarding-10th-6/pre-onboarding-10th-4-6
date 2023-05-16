import './App.css'
import { TodoProvider } from './context/todo/TodoContextProvider'
import Main from './pages/Main'

const App = () => {
  return (
    <TodoProvider>
      <Main />
    </TodoProvider>
  )
}

export default App
