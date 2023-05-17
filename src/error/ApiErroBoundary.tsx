import React, { ReactNode } from 'react'

interface ApiErrorBoundaryProps {
  children: ReactNode
}

interface ApiErroBoundaryState {
  hasError: boolean
  statusCode?: number
}

class ApiErrorBoundary extends React.Component<
  ApiErrorBoundaryProps,
  ApiErroBoundaryState
> {
  constructor(props: ApiErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ApiErroBoundaryState {
    const statusCode = error instanceof HttpError ? error.statusCode : undefined

    return { hasError: true, statusCode }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo)
  }

  render() {
    const { hasError, statusCode } = this.state

    if (hasError) {
      switch (statusCode) {
        case 401:
          return <h1>인증되지 않은 사용자 입니다.</h1>
        case 404:
          return <h1>페이지를 찾을 수 없습니다. </h1>
        case 500:
          return <h1>서버 오류</h1>

        default:
          return <h1>Error!!!!</h1>
      }
    }
    return this.props.children
  }
}

class HttpError extends Error {
  constructor(public statusCode: number) {
    super()

    this.name = 'HttpError'
  }
}

export { ApiErrorBoundary, HttpError }
