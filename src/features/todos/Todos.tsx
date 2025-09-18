import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import type { Todo } from '../../lib/types'

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=50')
  if (!res.ok) throw new Error('Failed to load todos')
  return res.json()
}

export function Todos() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
  const [showCompleted, setShowCompleted] = useState(true)

  const visible = useMemo(() => {
    const list = data ?? []
    return showCompleted ? list : list.filter(t => !t.completed)
  }, [data, showCompleted])

  if (isLoading) return <div className="card">Loading todos…</div>
  if (isError) return <div className="card">Failed to load.</div>

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Todos</h2>
        <label className="row" style={{ gap: 6 }}>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          Show completed
        </label>
      </div>
      <div className="list">
        {visible.map(t => (
          <article key={t.id} className="card" style={{ padding: 12 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span>{t.title}</span>
              <span className="pill">{t.completed ? 'Done' : 'Open'}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
