import { useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import type { User } from '../../lib/types'
import { SearchInput, useDebounce } from '../../components/SearchInput'

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to load users')
  return res.json()
}

export function Users() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const [q, setQ] = useState('')
  const debounced = useDebounce(q, 300)

  const filtered = useMemo(() => {
    const term = debounced.trim().toLowerCase()
    if (!term) return data ?? []
    return (data ?? []).filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term)
    )
  }, [debounced, data])

  if (isLoading) return <div className="card">Loading users…</div>
  if (isError) return <div className="card">Failed to load.</div>

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Users</h2>
        <span className="muted">{filtered.length} result(s)</span>
      </div>
      <div style={{ margin: '12px 0' }}>
        <SearchInput value={q} onChange={setQ} placeholder="Search by name, email, or username" />
      </div>
      <div className="list">
        {filtered.map(u => (
          <article key={u.id} className="card" style={{ padding: 12 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <strong>{u.name}</strong>
              <span className="pill">{u.company?.name ?? '—'}</span>
            </div>
            <div className="muted">{u.email} • {u.username} • {u.website}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
