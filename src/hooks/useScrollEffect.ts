import { useEffect, RefObject } from 'react'

interface UseScrollEffectProps {
  scrollRef: RefObject<HTMLElement>
  handleScroll: () => void
  dependencies: any[]
}

const useScrollEffect = ({
  scrollRef,
  handleScroll,
  dependencies
}: UseScrollEffectProps): void => {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, dependencies)
}

export default useScrollEffect
