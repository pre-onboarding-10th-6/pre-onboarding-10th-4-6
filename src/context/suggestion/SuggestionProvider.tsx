import React, { createContext, useContext, useReducer } from 'react'

import suggestionReducer, {
  SuggestionState,
  SuggestionAction
} from './suggestionReducer'

const initialState: SuggestionState = {
  suggestions: [],
  total: 0,
  limit: 0,
  page: 0,
  isLoading: false
}

const SuggestionStateContext = createContext<SuggestionState | null>(null)
const SuggestionDispatchContext =
  createContext<React.Dispatch<SuggestionAction> | null>(null)

function SuggestionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(suggestionReducer, initialState)

  return (
    <SuggestionStateContext.Provider value={state}>
      <SuggestionDispatchContext.Provider value={dispatch}>
        {children}
      </SuggestionDispatchContext.Provider>
    </SuggestionStateContext.Provider>
  )
}

const useSuggestionState = () => {
  const context = useContext(SuggestionStateContext)
  if (!context)
    throw new Error(
      'useSuggestionContext must be used within a SuggestionProvider'
    )
  return context
}

const useSuggestionDispatch = () => {
  const context = useContext(SuggestionDispatchContext)
  if (!context)
    throw new Error(
      'useSuggestionDispatch must be used within a SuggestionProvider'
    )
  return context
}

export { SuggestionProvider, useSuggestionState, useSuggestionDispatch }
