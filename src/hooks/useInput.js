import { useState } from 'react'

const useInput = initialValue => {
  const [values, setValues] = useState(initialValue)
  const handleChange = e => {
    setValues(e.target.value)
  }
  return { values, setValues, handleChange }
}

export default useInput
