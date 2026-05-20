import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error boundary caught an error.', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--color-bg-page)] text-[var(--color-text)]">
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
            <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 shadow-md">
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="mt-3 text-sm text-[var(--color-text-dim)]">
                The page hit an unexpected error. Reloading usually gets us back on track.
              </p>
              <button
                type="button"
                onClick={this.handleReload}
                className="mt-6 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-accent)] transition-colors hover:bg-[var(--color-accent-dim)]"
              >
                Reload app
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
