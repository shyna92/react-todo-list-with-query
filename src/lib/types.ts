export type User = {
  id: number
  name: string
  email: string
  username: string
  phone: string
  website: string
  company?: { name: string }
}

export type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}
