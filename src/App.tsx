import './App.css'
import ErrorBoundary from './api/Errorboundary'
import Main from './pages/main'

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Error Fallback</div>}>
      <Main />
    </ErrorBoundary>
  )
}

export default App
