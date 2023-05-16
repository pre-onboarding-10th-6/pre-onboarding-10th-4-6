import { useState } from 'react'

const useTryCatchErrorHandling = <T extends unknown[]>(
  callback: (...rest: T) => Promise<void>
) => {
  const [_, setState] = useState()

  return async (...args: T) => {
    try {
      await callback(...args)
    } catch (e: unknown) {
      setState(() => {
        throw e
      })
    }
  }
}

export default useTryCatchErrorHandling
