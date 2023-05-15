import React from 'react'

import { useSearchContext, useSearchDispatchContext } from '../context'
import * as S from '../style'
import { Props } from '../types'

const Form = ({ children }: Props) => {
  const { searchState, formRef } = useSearchContext()
  const { setSearchState, callCreateTodoAPI } = useSearchDispatchContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = searchState.input.trim()
    if (!trimmed) {
      return alert('Please write something')
    }

    await callCreateTodoAPI(trimmed)
    setSearchState(prev => ({
      input: '',
      result: prev.result
    }))
  }

  return (
    <S.Form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </S.Form>
  )
}

export default Form
