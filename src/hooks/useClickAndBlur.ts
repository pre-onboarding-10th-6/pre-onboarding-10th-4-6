import { useState } from 'react'

const useClickAndBlur = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const handleClick = () => {
    setIsClicked(true)
  }

  const handleBlur = () => {
    setIsClicked(false)
  }

  return { isClicked, handleClick, handleBlur }
}

export default useClickAndBlur
