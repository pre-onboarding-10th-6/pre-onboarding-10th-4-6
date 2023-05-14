import { useCallback, useRef } from 'react'

function useDebouncer<T extends any[]>(
  callback: (...args: T) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current)
      setIsLoading(true)
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}

export default useDebouncer
