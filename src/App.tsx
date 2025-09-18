import { useState } from 'react'
import { Users } from './features/users/Users'
import { Todos } from './features/todos/Todos'

export function App() {
  const [tab, setTab] = useState<'users' | 'todos'>('users')
  return (
    <div className="container">
      <h1>React Query Sample</h1>
      <div className="tabs">
        <button className={`tab ${tab==='users' ? 'active' : ''}`} onClick={() => setTab('users')}>Users</button>
        <button className={`tab ${tab==='todos' ? 'active' : ''}`} onClick={() => setTab('todos')}>Todos</button>
      </div>
      {tab === 'users' ? <Users /> : <Todos />}
    </div>
  )
}
