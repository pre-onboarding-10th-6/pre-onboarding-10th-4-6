import { useEffect, useRef } from 'react'

const useFocus = (dispatch: (bool: boolean) => void) => {
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return
      }
      dispatch(false)
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref])

  return { formRef: ref }
}

export default useFocus
