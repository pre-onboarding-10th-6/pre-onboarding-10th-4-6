import React, { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: JSX.Element
}

interface State {
  shouldHandleError: boolean
  shouldRethrowError: boolean
  error: unknown | Error
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      shouldHandleError: false,
      shouldRethrowError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error) {
    // if an error happened, Update state to indicate an error has occurred

    // local에서 처리 불가능한 경우 -> Global로 rethrow
    if (false) {
      return { shouldHandleError: false, shouldRethrowError: true, error }
    }

    return { shouldHandleError: true, shouldRethorwError: false, error }
  }

  render() {
    // if error happened, return a fallback component
    const { shouldHandleError, shouldRethrowError, error } = this.state
    const { fallback, children } = this.props

    if (shouldRethrowError) {
      throw error
    } else if (shouldHandleError) {
      return fallback ? fallback : <div>Error Boundary</div>
    }

    // 아무런 에러가 없을 땐 정상적으로 하위 UI 컴포넌트를 렌더링
    return children
  }
}

export default ErrorBoundary
