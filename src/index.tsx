import React from 'react'
import ReactDOM from 'react-dom/client'

import GlobalErrorBoundary from './api/GlobalErrorBoundary'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
)
