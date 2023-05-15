import searchReducer, {
  SearchReducerState,
  SearchReducerAction,
  SEARCH_AT
} from './reducer'

describe('searchReducer', () => {
  let initialState: SearchReducerState

  beforeEach(() => {
    initialState = {
      input: '',
      result: [''],
      isSearchLoading: false,
      dropdownStatus: 'none',
      isFocus: false
    }
  })

  test('handles SEARCH action with non-empty payload', () => {
    const action: SearchReducerAction = {
      type: SEARCH_AT.SEARCH,
      payload: ['result1', 'result2']
    }
    const newState = searchReducer(initialState, action)
    expect(newState.result).toEqual(['result1', 'result2'])
  })

  test('handles SEARCH action with empty payload', () => {
    const action: SearchReducerAction = { type: SEARCH_AT.SEARCH, payload: [] }
    const newState = searchReducer(initialState, action)
    expect(newState.result).toEqual([''])
  })

  test('handles SET_SEARCH action', () => {
    const action: SearchReducerAction = {
      type: SEARCH_AT.SET_SEARCH,
      payload: { input: 'test', result: ['result1', 'result2'] }
    }
    const newState = searchReducer(initialState, action)
    expect(newState.input).toBe('test')
    expect(newState.result).toEqual(['result1', 'result2'])
  })

  test('handles SET_SEARCH_LOADING action', () => {
    const action: SearchReducerAction = {
      type: SEARCH_AT.SET_SEARCH_LOADING,
      payload: true
    }
    const newState = searchReducer(initialState, action)
    expect(newState.isSearchLoading).toBe(true)
  })

  test('handles SET_DROPDOWN_STATUS action', () => {
    const action: SearchReducerAction = {
      type: SEARCH_AT.SET_DROPDOWN_STATUS,
      payload: 'loading'
    }
    const newState = searchReducer(initialState, action)
    expect(newState.dropdownStatus).toBe('loading')
  })

  test('handles SET_FOCUS action', () => {
    const action: SearchReducerAction = {
      type: SEARCH_AT.SET_FOCUS,
      payload: true
    }
    const newState = searchReducer(initialState, action)
    expect(newState.isFocus).toBe(true)
  })
})
