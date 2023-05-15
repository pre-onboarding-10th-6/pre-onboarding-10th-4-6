import { useEffect, useState, useRef } from 'react'

const useCloseDropdown = <T extends HTMLElement>(
  initialState: boolean
): [boolean, React.RefObject<T>, () => void] => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(initialState)
  const dropdownRef = useRef<T>(null)

  const dropdownHandler = (): void => {
    setIsOpenDropdown(_isOpenDropdown => !_isOpenDropdown)
  }

  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpenDropdown(false)
      }
    }

    if (isOpenDropdown) {
      window.addEventListener('click', onClick)
    }

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [isOpenDropdown])

  return [isOpenDropdown, dropdownRef, dropdownHandler]
}

export default useCloseDropdown
