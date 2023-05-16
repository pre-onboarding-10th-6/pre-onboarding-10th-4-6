import React, { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: JSX.Element
}

interface State {
  shouldHandleError: boolean
}

class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      shouldHandleError: false
    }
  }

  static getDerivedStateFromError(error: Error) {
    // if an error happened, Update state to indicate an error has occurred

    // global 에러 처리. 서버에서 return 받은 에러를 처리...
    // ex1) /error 페이지로 리디렉트

    return { shouldHandleError: true }
  }

  render() {
    // if error happened, return a fallback component
    const { shouldHandleError } = this.state
    const { fallback, children } = this.props

    if (shouldHandleError) {
      return fallback ? fallback : <div>Global Error Boundary</div>
    }

    // 아무런 에러가 없을 땐 정상적으로 하위 UI 컴포넌트를 렌더링
    return children
  }
}

export default GlobalErrorBoundary
