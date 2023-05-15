import { useCallback, useRef } from 'react'

function useDebouncer<T extends any[]>(
  callback: (...args: T) => Promise<void>,
  dispatch: (bool: boolean) => void,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current)
      dispatch(true)
      timeoutRef.current = setTimeout(() => {
        callback(...args).finally(() => dispatch(false))
      }, delay)
    },
    [callback, delay]
  )
}

export default useDebouncer
