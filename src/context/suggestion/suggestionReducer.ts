export interface SuggestionState {
  total: number
  page: number
  limit: number
  suggestions: string[]
  isLoading: boolean
}

export enum SuggestionActionTypes {
  SET_SUGGESTIONS = 'SET_SUGGESTIONS',
  CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS',
  SET_TOTAL = 'SET_TOTAL',
  SET_PAGES = 'SET_PAGES',
  SET_IS_LOADING = 'SET_IS_LOADING'
}

type SetSuggestionsAction = {
  type: SuggestionActionTypes.SET_SUGGESTIONS
  payload: SuggestionState
}

type ClearSuggestionsAction = {
  type: SuggestionActionTypes.CLEAR_SUGGESTIONS
}

type SetTotalAction = {
  type: SuggestionActionTypes.SET_TOTAL
  payload: {
    total: number
  }
}

type SetPagesAction = {
  type: SuggestionActionTypes.SET_PAGES
  payload: {
    pages: number
  }
}

type SetIsLoadingAction = {
  type: SuggestionActionTypes.SET_IS_LOADING
  payload: {
    isLoading: boolean
  }
}

export const setSuggestions = ({
  total,
  page,
  limit,
  result
}: SuggestionsPayload): SetSuggestionsAction => ({
  type: SuggestionActionTypes.SET_SUGGESTIONS,
  payload: {
    total,
    page,
    limit,
    suggestions: result,
    isLoading: false
  }
})

export const clearSuggestions = (): ClearSuggestionsAction => ({
  type: SuggestionActionTypes.CLEAR_SUGGESTIONS
})

export const setTotal = (total: number): SetTotalAction => ({
  type: SuggestionActionTypes.SET_TOTAL,
  payload: { total }
})

export const setPages = (pages: number): SetPagesAction => ({
  type: SuggestionActionTypes.SET_PAGES,
  payload: { pages }
})

export const setIsLoading = (isLoading: boolean): SetIsLoadingAction => ({
  type: SuggestionActionTypes.SET_IS_LOADING,
  payload: { isLoading }
})

export type SuggestionAction =
  | SetSuggestionsAction
  | ClearSuggestionsAction
  | SetTotalAction
  | SetPagesAction
  | SetIsLoadingAction

const suggestionReducer = (
  state: SuggestionState,
  action: SuggestionAction
) => {
  switch (action.type) {
    case SuggestionActionTypes.SET_SUGGESTIONS:
      return action.payload
    case SuggestionActionTypes.CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      }
    case SuggestionActionTypes.SET_TOTAL:
      return {
        ...state,
        total: action.payload.total
      }
    case SuggestionActionTypes.SET_PAGES:
      return {
        ...state,
        pages: action.payload.pages
      }
    case SuggestionActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    default:
      return state
  }
}

export default suggestionReducer
