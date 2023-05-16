import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // 최초 등록시, 그리고 가시성에 변화가 생길시 콜백 함수가 호출됨
      if (entry.isIntersecting) {
        callback([entry])
      }
    }, options)

    if (targetRef.current) {
      // 관찰을 시작하면 위 if문에 의해 entry가 교차할 때 callback을 호출
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [callback])

  return { targetRef }
}

export default useInfiniteScroll
