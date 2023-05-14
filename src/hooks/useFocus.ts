import { useCallback, useRef } from 'react'

const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null)
  const setFocus = useCallback(() => {
    ref.current && ref.current.focus()
  }, [])

  return { ref, setFocus }
}

export default useFocus
