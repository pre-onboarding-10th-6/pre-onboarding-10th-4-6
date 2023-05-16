import { useRef } from 'react'

const useFocus = () => {
  const ref = useRef<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  >()
  const setFocus = () => {
    ref.current && ref.current.focus()
  }

  return { ref, setFocus }
}

export default useFocus
