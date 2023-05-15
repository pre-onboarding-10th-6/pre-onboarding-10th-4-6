import { useState, useEffect, useRef } from 'react'

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[]
) => void

const options: IntersectionObserverInit = {
  threshold: 0, // target이 viewport와 0%만 겹처도 observer를 실행
  root: null, // null = viewport
  rootMargin: '0px'
}

const useInfiniteScroll = (callback: IntersectionObserverCallback) => {
  const targetRef = useRef<HTMLLIElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      if (entry.isIntersecting) {
        callback([entry])
      }
    }, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [callback])

  return { targetRef, isIntersecting }
}

export default useInfiniteScroll
