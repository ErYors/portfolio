import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import Button from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error: error instanceof Error ? error : null }
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-page px-6 text-center">
        <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] font-bold text-ink">
          Oups, quelque chose s’est cassé
        </h1>

        <p className="max-w-md font-body text-base text-muted">
          Une erreur inattendue s’est produite. Tu peux réessayer ou recharger
          la page.
        </p>

        {this.state.error?.message && (
          <code className="max-w-md rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-muted">
            {this.state.error.message}
          </code>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" onClick={this.handleReload}>
            Recharger
          </Button>
          <Button variant="primary" onClick={this.handleReset}>
            Réessayer
          </Button>
        </div>
      </main>
    )
  }
}
