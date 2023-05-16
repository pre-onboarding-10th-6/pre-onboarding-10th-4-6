import { useEffect, useRef } from 'react'

const useIntersectionObserver = (callback: () => void, isLoading: boolean) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isLoading) {
      return
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    })
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current)
    }
    return () => {
      if (targetRef.current && observerRef.current) {
        observerRef.current.unobserve(targetRef.current)
      }
    }
  }, [callback, isLoading])

  return { targetRef }
}

export default useIntersectionObserver
