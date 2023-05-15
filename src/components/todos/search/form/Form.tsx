import React from 'react'

import { useSearchContext, useSearchDispatchContext } from '../context/context'
import { SEARCH_AT } from '../context/reducer'
import * as S from '../style'
import { Props } from '../types'

const Form = ({ children }: Props) => {
  const { state, formRef } = useSearchContext()
  const { dispatch, callCreateTodoAPI } = useSearchDispatchContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = state.input.trim()
    if (!trimmed) {
      return alert('Please write something')
    }

    await callCreateTodoAPI(trimmed)
    dispatch({
      type: SEARCH_AT.SET_SEARCH,
      payload: { input: '', result: state.result }
    })
  }

  return (
    <S.Form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </S.Form>
  )
}

export default Form
