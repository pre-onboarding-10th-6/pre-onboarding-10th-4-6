import { useEffect, useRef, useState } from 'react'

const useClickOutside = () => {
  const ref = useRef<HTMLFormElement>(null)
  const [isFocus, setIsFocus] = useState(false)

  const onFocusHandler = (bool: boolean) => {
    setIsFocus(bool)
  }

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return
      }
      onFocusHandler(false)
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref])

  return { formRef: ref, isFocus, onFocusHandler }
}

export default useClickOutside
