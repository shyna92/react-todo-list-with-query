import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { App } from '../src/App'

describe('App', () => {
  it('renders without crashing', () => {
    const client = new QueryClient()
    const { getByText } = render(
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    )
    expect(getByText('React Query Sample')).toBeInTheDocument()
  })
})
