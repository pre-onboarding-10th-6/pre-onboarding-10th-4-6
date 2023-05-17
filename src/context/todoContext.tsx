import React, { createContext, useContext, useEffect, useReducer } from 'react'

import useTryCatchErrorHandling from '../error/useTryCatchErrorHandling'
import { TodoService } from '../service/TodoService'

import todoReducer, { TodoState, TodoActionTypes, Todo } from './todoReducer'

const initialState: TodoState = []

const TodoStateContext = createContext<TodoState | null>(null)
const TodoDispatchContext = createContext<{
  add: ({ title }: { title: string }) => Promise<void>
  remove: (id: string) => Promise<void>
} | null>(null)

const useTodoState = () => {
  const context = useContext(TodoStateContext)
  if (!context)
    throw new Error('useTodoState must be used within a TodoProvider')
  return context
}

const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext)
  if (!context)
    throw new Error('useTodoDispatch must be used within a TodoProvider')
  return context
}

interface TodoProviderProps {
  children: React.ReactNode
  todoService: TodoService
}

function TodoProvider({ children, todoService }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const getTodo = useTryCatchErrorHandling(async () => {
    const { data } = await todoService.get()
    dispatch({
      type: TodoActionTypes.SET_TODOS,
      payload: data.map(({ id, title }: Todo) => ({
        id,
        title
      }))
    })
  })

  useEffect(() => {
    getTodo()
  }, [])

  const add = useTryCatchErrorHandling(async (todo: { title: string }) => {
    const { data } = await todoService.create(todo)
    dispatch({
      type: TodoActionTypes.ADD_TODO,
      payload: { id: data.id, title: data.title }
    })
  })

  const remove = useTryCatchErrorHandling(async (id: string) => {
    await todoService.delete(id)
    dispatch({
      type: TodoActionTypes.REMOVE_TODO,
      payload: { id }
    })
  })

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={{ add, remove }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

export { TodoProvider, useTodoState, useTodoDispatch }
