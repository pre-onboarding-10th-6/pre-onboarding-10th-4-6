export interface TodoState {
  todos: Todo[]
}

export enum TodoActionTypes {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO'
}

type SetTodoAction = {
  type: TodoActionTypes.SET_TODOS
  payload: TodoState
}

type AddTodoAction = {
  type: TodoActionTypes.ADD_TODO
  payload: Todo
}

type RemoveTodoAction = {
  type: TodoActionTypes.REMOVE_TODO
  payload: {
    id: string
  }
}

export const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: TodoActionTypes.SET_TODOS,
  payload: { todos }
})

export const addTodo = (todo: Todo): AddTodoAction => ({
  type: TodoActionTypes.ADD_TODO,
  payload: todo
})

export const removeTodo = (id: string): RemoveTodoAction => ({
  type: TodoActionTypes.REMOVE_TODO,
  payload: { id }
})

export type TodoAction = SetTodoAction | AddTodoAction | RemoveTodoAction

const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoActionTypes.SET_TODOS:
      return { ...state, todos: action.payload.todos }
    case TodoActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case TodoActionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }

    default:
      return state
  }
}

export default todoReducer
